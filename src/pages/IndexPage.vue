<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h5">Учетные записи</div>
      <q-btn 
        color="primary" 
        icon="add"
        class="q-ml-md" 
        @click="addUser" 
        >
          <q-tooltip 
            class="bg-black text-body2" 
            :offset="[10, 10]"
          >
            Добавить новую запись
          </q-tooltip>
        </q-btn>
      <q-btn 
        color="secondary" 
        icon="storage"
        class="q-ml-md" 
        @click="loadExample" 
        >
          <q-tooltip 
            class="bg-black text-body2" 
            :offset="[10, 10]"
          >
            Загрузить подготовленные данные
          </q-tooltip>
        </q-btn>
    </div>

    <div>
      <q-banner 
        class="bg-grey-3 q-mb-md"
        dense
        rounded
        >
        <template v-slot:avatar>
          <q-icon 
            name="help_outline" 
            color="primary" 
            />
        </template>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </q-banner>
    </div>
    <user-list
      :users="users"
      @update="onUserUpdate"
      @delete="onUserDelete"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import UserList from 'components/UserList.vue';
import { useUserStore } from 'src/stores/user-store';
import type { User } from 'src/models/User';
import { UserRecordType } from 'src/models/UserRecordType';

const userStore = useUserStore();
const users = ref<User[]>(userStore.users);

userStore.$subscribe(() => {
  users.value = [...userStore.users];
});

function onUserUpdate(updatedUser: User) {
  userStore.updateUser(updatedUser);
}

function onUserDelete(id: number) {
  userStore.removeUser(id);
}

function addUser() {
  const maxId = users.value.length ? Math.max(...users.value.map(u => u.id)) : 0;
  userStore.addUser({
    id: maxId + 1,
    labels: [],
    login: '',
    password: '',
    recordType: UserRecordType.Local
  });
}

function loadExample() {
  userStore.setExampleUsers();
}
</script>
