<template>
  <q-form class="col-sm" @submit.prevent>
    <div class="row q-col-gutter-sm content-stretch">
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-input
          v-model="labelsInput"
          :rules="labelsRules"
          :label="$t('label')"
          @blur="updateLabels"
          dense
          outlined
        />
      </div>
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-select
          v-model="localUser.recordType"
          :options="recordTypeOptions"
          :label="$t('recordType')"
          emit-value
          map-options
          @update:model-value="onRecordTypeChange"
          @blur="submitIfValid"
          dense
          outlined 
        />
      </div>
      <div 
        class="col-xs-12 col-sm-6"
        :class="user.recordType === recordTypes.LDAP ? 'col-lg-4' : 'col-lg-2'"
      >
        <q-input
          v-model="localUser.login"
          :rules="loginRules"
          :label="$t('login')"
          @blur="submitIfValid"
          dense
          outlined 
        />
      </div>
      <div 
        v-if="user.recordType !== recordTypes.LDAP"
        class="col-lg-2 col-xs-12 col-sm-6"
      >
        <q-input
          v-model="localUser.password"
          :label="$t('password')"
          :type="isPwd ? 'password' : 'text'"
          :rules="passwordRules"
          @blur="submitIfValid"
          dense
          outlined 
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-btn
          color="negative"
          icon="delete"
          @click="emitDelete"
          round
          flat
          dense
        >
          <q-tooltip 
            class="bg-black text-body2" 
            :offset="[10, 10]"
          >
            {{ $t('deleteTooltip') }}
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { UserRecordType } from '../models/UserRecordType';
import type { User } from '../models/User';
import { userValidationRules } from '../utils/validation';
import { UserService } from '../services/user-service';

export default defineComponent({
  name: 'UserItem',
  props: {
    user: {
      type: Object as () => User,
      required: true
    }
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    const isPwd = ref(true);
    const localUser = reactive<User>({ ...props.user });

    const labelsInput = ref(
      UserService.labelsToString(props.user.labels)
    );

    const recordTypes = UserRecordType;
    const recordTypeOptions = [
      { label: 'LDAP', value: UserRecordType.LDAP },
      { label: 'Локальная', value: UserRecordType.Local }
    ];

    const labelsRules = userValidationRules.labels;
    const loginRules = userValidationRules.login;
    const passwordRules = userValidationRules.password(localUser.recordType === UserRecordType.Local);

    function isAllFieldsValid(): boolean {
      return UserService.validateUser({
        ...localUser,
        labels: UserService.parseLabels(labelsInput.value)
      }).length === 0;
    }

    function submitIfValid() {
      if (isAllFieldsValid()) {
        emitUpdate();
      }
    }

    function updateLabels() {
      localUser.labels = UserService.parseLabels(labelsInput.value);
      submitIfValid();
    }

    function emitUpdate() {
      emit('update', { ...localUser });
    }

    function emitDelete() {
      emit('delete', localUser.id);
    }

    function onRecordTypeChange(val: UserRecordType) {
      localUser.recordType = val;
      if (val === UserRecordType.LDAP) {
        delete localUser.password;
      } else {
        localUser.password = ''
      }
      emitUpdate()
    }

    return {
      localUser,
      labelsInput,
      recordTypes,
      recordTypeOptions,
      isPwd,
      labelsRules,
      loginRules,
      passwordRules,
      updateLabels,
      emitUpdate,
      emitDelete,
      onRecordTypeChange,
      submitIfValid,
    };
  }
});
</script>