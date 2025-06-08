<template>
  <q-form class="col-sm" @submit.prevent>
    <div class="row q-col-gutter-sm content-stretch">
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-input
          v-model="labelsInput"
          :rules="labelsRules"
          label="Метки"
          @blur="updateLabels"
          dense
          outlined
        />
      </div>
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-select
          v-model="localUser.recordType"
          :options="recordTypeOptions"
          label="Тип записи"
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
          label="Логин"
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
          label="Пароль"
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
            Удалить
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
import type { UserLabel } from 'src/models/UserLabel';
import { validateField } from '../utils/validation';

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
      props.user.labels.map((label: UserLabel) => label.text).join('; ')
    );

    const recordTypes = UserRecordType;
    const recordTypeOptions = [
      { label: 'LDAP', value: UserRecordType.LDAP },
      { label: 'Локальная', value: UserRecordType.Local }
    ];

    const labelsRules = [
      (val: string) => validateField(val, { required: false, max: 50 })
    ];
    const loginRules = [
      (val: string) => validateField(val, { required: true, max: 100 })
    ];
    const passwordRules = [
      (val: string) => validateField(val, { required: localUser.recordType === UserRecordType.Local, max: 100 })
    ];

    function isAllFieldsValid(): boolean {
      const labelsValid = labelsRules.every(rule => rule(labelsInput.value) === true);
      const loginValid = loginRules.every(rule => rule(localUser.login) === true);
      const passwordValid =
        localUser.recordType === UserRecordType.Local
          ? passwordRules.every(rule => rule(localUser.password || '') === true)
          : true;
      return labelsValid && loginValid && passwordValid;
    }

    function submitIfValid() {
      if (isAllFieldsValid()) {
        emitUpdate();
      }
    }

    function updateLabels() {
      localUser.labels = labelsInput.value
        .split(';')
        .map(s => s.trim())
        .filter(Boolean)
        .map(text => ({ text }));
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