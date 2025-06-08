<template>
  <q-virtual-scroll
    :items="users"
    :item-size="110"
    class="q-mb-md"
  >
    <template #default="props">
      <div>
        <user-item
          :user="props.item"
          @update="onUpdate"
          @delete="onDelete"
        />
      </div>
    </template>
  </q-virtual-scroll>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { User } from '../models/User';
import UserItem from './UserItem.vue';

export default defineComponent({
  name: 'UserList',
  components: { UserItem },
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true
    }
  },
  emits: ['update', 'delete'],
  setup(props, { emit }) {
    function onUpdate(updatedUser: User) {
      emit('update', updatedUser);
    }
    function onDelete(userId: number) {
      emit('delete', userId);
    }
    return { onUpdate, onDelete };
  }
});
</script>