<template>
  <q-form class="col-sm" @submit.prevent>
    <div class="row q-col-gutter-sm content-stretch">
      <div class="col-lg-2 col-xs-12 col-sm-6">
        <q-input
          v-model="labelsInput"
          label="Метки"
          @blur="updateLabels"
          @change="updateLabels"
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
          label="Логин"
          @input="emitUpdate"
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
          @input="emitUpdate"
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
        />
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { UserRecordType } from '../models/UserRecordType';
import type { User } from '../models/User';

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
    const localUser = ref<User>({ ...props.user });

    const labelsInput = ref(props.user.labels.join('; '));

    const recordTypes = UserRecordType;
    const recordTypeOptions = [
      { label: 'LDAP', value: UserRecordType.LDAP },
      { label: 'Локальная', value: UserRecordType.Local }
    ];

    function updateLabels() {
      localUser.value.labels = labelsInput.value
        .split(';')
        .map(s => s.trim())
        .filter(Boolean);
      emitUpdate();
    }

    watch(
      () => props.user,
      (newUser) => {
        localUser.value = { ...newUser };
        labelsInput.value = newUser.labels.join('; ');
      },
      { deep: true }
    );

    function onRecordTypeChange(val: UserRecordType) {
      localUser.value.recordType = val;
      if (val === UserRecordType.LDAP) {
        delete localUser.value.password;
      }
      emitUpdate();
    }

    function emitUpdate() {
      emit('update', { ...localUser.value });
    }

    function emitDelete() {
      emit('delete', localUser.value.id);
    }

    return {
      localUser,
      labelsInput,
      recordTypes,
      recordTypeOptions,
      isPwd,
      updateLabels,
      emitUpdate,
      emitDelete,
      onRecordTypeChange
    };
  }
});
</script>