<template>
  <v-navigation-drawer v-model="uiStore.drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined"
    class="border-e" :temporary="$vuetify.display.mobile ? true : undefined">
    <div class="px-4 py-6 d-flex align-center">
      <div class="d-flex align-center gap-2">
        <v-avatar color="primary" rounded="lg" size="32" class="mr-3">
          <v-icon icon="mdi-rocket-launch" color="white" size="20"></v-icon>
        </v-avatar>
        <div>
          <div class="text-subtitle-2 font-weight-bold">Mobile app GTM</div>
          <div class="text-caption text-medium-emphasis">Software project</div>
        </div>
      </div>
    </div>

    <v-list density="compact" nav class="px-2">
      <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.to" color="primary" min-height="40"
        class="mb-1 rounded">
        <template v-slot:prepend>
          <v-icon :icon="item.icon" size="20" class="mr-2 text-medium-emphasis"></v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-medium">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-4"></v-divider>

      <v-list-item value="add-item" min-height="40" class="mb-1 rounded" color="primary">
        <template v-slot:prepend>
          <v-icon icon="mdi-plus" size="20" class="mr-2"></v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-medium">
          Add item
        </v-list-item-title>
      </v-list-item>
      <v-list-item value="settings" min-height="40" class="mb-1 rounded" color="primary">
        <template v-slot:prepend>
          <v-icon icon="mdi-cog-outline" size="20" class="mr-2"></v-icon>
        </template>
        <v-list-item-title class="text-body-2 font-weight-medium">
          Settings
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/uiStore'

const uiStore = useUiStore()

const items = ref([
  { title: 'Roadmap', icon: 'mdi-timeline-text-outline', to: '/roadmap' },
  { title: 'Backlog', icon: 'mdi-format-list-bulleted-square', to: '/backlog' },
  { title: 'Board', icon: 'mdi-view-week-outline', to: '/board' },
  { title: 'Reports', icon: 'mdi-chart-line', to: '/reports' }, // Placeholder
  { title: 'Issues', icon: 'mdi-checkbox-multiple-marked-outline', to: '/list' },
])
</script>

<style scoped>
.v-list-item--active {
  background-color: rgb(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
