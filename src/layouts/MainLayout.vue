<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('title') }}
        </q-toolbar-title>

        <div class="q-mr-md">{{ $t('by') }}</div>
        <q-select
          v-model="currentLocale"
          :options="langOptions"
          dense
          borderless
          emit-value
          map-options
          style="min-width: 120px"
          class="q-ml-md"
        >
          <template #prepend>
            <q-icon name="language" />
          </template>
        </q-select>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          {{ $t('menu') }}
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const { locale } = useI18n();
const currentLocale = ref(locale.value);

const langOptions = [
  { label: 'Русский', value: 'ru-RU' },
  { label: 'English', value: 'en-US' }
];

watch(currentLocale, val => {
  locale.value = val;
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'home',
    caption: 'home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'telegram',
    caption: 'telegram',
    icon: 'public',
    link: 'https://t.me/FranXX_02'
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
