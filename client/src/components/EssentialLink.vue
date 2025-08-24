<template>
  <q-item clickable v-ripple tag="a" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section side v-if="info">
      <q-badge color="secondary" :label="info" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  link?: string;
  icon?: string;
  info?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: '',
  info: '',
});
</script>
