<template>
  <q-layout view="hHh LpR lFf">
    <q-header revealed elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Project Villagers </q-toolbar-title>

        <q-btn flat dense no-caps>
          <q-avatar color="secondary" text-color="white">JD</q-avatar>
          <span class="text-body1 q-mx-xs">John Doe</span>
          <q-icon name="arrow_drop_down" />

          <q-menu transition-show="jump-down" transition-hide="jump-up">
            <q-list style="min-width: 200px">
              <q-item clickable v-ripple>
                <q-item-section avatar><q-icon name="person" /></q-item-section>
                <q-item-section>Profile</q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar><q-icon name="settings" /></q-item-section>
                <q-item-section>Settings</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-ripple>
                <q-item-section avatar><q-icon name="logout" /></q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay behavior="desktop" bordered>
      <q-list>
        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';

const linksList: EssentialLinkProps[] = [
  {
    title: 'Penduduk',
    icon: 'groups_2',
    info: '123',
    link: '/',
  },
  {
    title: 'Kartu Keluarga',
    icon: 'family_restroom',
    link: '/kartu-keluarga',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
