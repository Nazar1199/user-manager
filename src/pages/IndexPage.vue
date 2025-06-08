<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-mb-md">
      <div class="text-h5 col">Пользователи</div>
      <q-btn color="primary" label="Добавить" class="q-ml-md" @click="addUser" />
      <q-btn color="secondary" label="Загрузить пример" class="q-ml-md" @click="loadExample" />
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
