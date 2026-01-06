<template>
  <v-container fluid class="pa-0 h-100 d-flex flex-column whitespace-nowrap overflow-hidden">
    <!-- Project Header -->
    <div class="px-6 pt-4 border-b">
      <div class="d-flex align-center mb-0">
        <span class="text-caption text-medium-emphasis">Spaces</span>
      </div>
      <div class="d-flex align-center justify-space-between mb-0">
        <div class="d-flex align-center">
          <v-sheet width="24" height="24" color="orange-darken-2" rounded
            class="d-flex align-center justify-center mr-3">
            <v-icon size="16" color="white">mdi-vector-square</v-icon>
          </v-sheet>
          <h1 class="text-h6 font-weight-bold mr-2">Cryptocurrency Payment Gateway</h1>
          <v-btn icon="mdi-open-in-new" variant="text" size="x-small" density="comfortable"
            class="text-medium-emphasis"></v-btn>
          <v-btn icon="mdi-dots-horizontal" variant="text" size="x-small" density="comfortable"
            class="text-medium-emphasis"></v-btn>
        </div>
        <div class="d-flex align-center gap-2">
          <v-btn icon="mdi-share-variant-outline" variant="text" size="small" class="text-medium-emphasis"></v-btn>
          <v-btn icon="mdi-lightning-bolt-outline" variant="text" size="small" class="text-medium-emphasis"></v-btn>
          <v-btn icon="mdi-fullscreen" variant="text" size="small" class="text-medium-emphasis"></v-btn>
        </div>
      </div>

      <v-tabs density="compact" color="primary" class="mb-n1" model-value="board">
        <v-tab class="text-none font-weight-medium px-4" value="summary"
          prepend-icon="mdi-view-dashboard-outline">Summary</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="list"
          prepend-icon="mdi-format-list-bulleted">List</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="board"
          prepend-icon="mdi-view-column-outline">Board</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="code" prepend-icon="mdi-code-braces">Code</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="forms" prepend-icon="mdi-form-select">Forms</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="timeline"
          prepend-icon="mdi-chart-timeline-variant">Timeline</v-tab>
        <v-tab class="text-none font-weight-medium px-4" value="pages"
          prepend-icon="mdi-book-open-outline">Pages</v-tab>
        <v-btn icon="mdi-plus" variant="text" size="small" class="ml-1"></v-btn>
      </v-tabs>
    </div>

    <!-- Board Controls -->
    <div class="px-6 py-4 d-flex align-center justify-space-between flex-wrap gap-4">
      <div class="d-flex align-center gap-3">
        <v-text-field density="compact" single-line variant="outlined" placeholder="Search board"
          prepend-inner-icon="mdi-magnify" clearable hide-details width="200" color="primary"
          class="bg-surface custom-board-input"></v-text-field>

        <div class="d-flex align-center">
          <v-avatar v-for="(user, i) in store.users.slice(0, 4)" :key="user.id" size="32" :class="{ 'ml-n2': i > 0 }"
            style="border: 2px solid rgb(var(--v-theme-surface))" class="cursor-pointer">
            <v-img :src="user.avatar" cover></v-img>
            <v-tooltip activator="parent" location="top">{{ user.name }}</v-tooltip>
          </v-avatar>
        </div>

        <v-btn variant="outlined" prepend-icon="mdi-filter-variant" class="text-none px-4"
          color="medium-emphasis">Filter</v-btn>
      </div>

      <div class="d-flex align-center gap-2">
        <v-btn variant="plain" class="text-none px-2" density="comfortable" color="medium-emphasis">
          Group by <v-icon end icon="mdi-chevron-down"></v-icon>
        </v-btn>
        <v-btn icon="mdi-eye-outline" variant="text" size="small" class="text-medium-emphasis"></v-btn>
        <v-btn icon="mdi-sort-variant" variant="text" size="small" class="text-medium-emphasis"></v-btn>
        <v-btn icon="mdi-dots-horizontal" variant="text" size="small" class="text-medium-emphasis"></v-btn>
      </div>
    </div>

    <!-- Kanban Columns -->
    <div class="flex-grow-1 px-6 pb-6 overflow-hidden">
      <div class="d-flex gap-4 h-100 overflow-x-auto pb-4">
        <!-- To Do Column -->
        <v-sheet class="board-column rounded-lg pa-3 d-flex flex-column" color="surface-variant" border>
          <div
            class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
            <span>To Do</span>
            <v-chip size="x-small" variant="flat" color="surface-variant">{{ todoIssues.length }}</v-chip>
          </div>
          <draggable v-model="todoIssues" group="issues" item-key="id"
            class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
            <template #item="{ element }">
              <IssueCard :issue="element" @click="openIssueDetails(element)" />
            </template>

          </draggable>
        </v-sheet>

        <!-- In Progress Column -->
        <v-sheet class="board-column rounded-lg pa-3 d-flex flex-column" color="surface-variant" border>
          <div
            class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
            <span>In Progress</span>
            <v-chip size="x-small" variant="flat" color="surface-variant">{{ inProgressIssues.length }}</v-chip>
          </div>
          <draggable v-model="inProgressIssues" group="issues" item-key="id"
            class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
            <template #item="{ element }">
              <IssueCard :issue="element" @click="openIssueDetails(element)" />
            </template>
            <!-- <template #footer>
              <v-btn variant="text" block class="text-start justify-start text-caption mt-1" prepend-icon="mdi-plus"
                color="medium-emphasis">Create issue</v-btn>
            </template> -->
          </draggable>
        </v-sheet>

        <!-- Done Column -->
        <v-sheet class="board-column rounded-lg pa-3 d-flex flex-column" color="surface-variant" border>
          <div
            class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
            <span>Done</span>
            <v-chip size="x-small" variant="flat" color="success" class="text-white">{{
              doneIssues.length }}</v-chip>
          </div>
          <draggable v-model="doneIssues" group="issues" item-key="id"
            class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
            <template #item="{ element }">
              <IssueCard :issue="element" @click="openIssueDetails(element)" />
            </template>
          </draggable>
        </v-sheet>
      </div>
    </div>

    <IssueDetailsDialog v-model="isDetailsOpen" :issue="selectedIssue" />
    <CreateIssueDrawer v-model="isCreateDrawerOpen" />
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import IssueCard from '@/components/IssueCard.vue'
import draggable from 'vuedraggable'
import CreateIssueDrawer from '@/components/CreateIssueDrawer.vue'
import IssueDetailsDialog from '@/components/IssueDetailsDialog.vue'
import type { Issue } from '@/stores/taskStore' // Import type if needed, or infer

const store = useTaskStore()
const isDetailsOpen = ref(false)
const isCreateDrawerOpen = ref(false)
const selectedIssue = ref<Issue | null>(null)

const openIssueDetails = (issue: Issue) => {
  selectedIssue.value = issue
  isDetailsOpen.value = true
}

const createListComputed = (status: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
  return computed({
    get: () => store.getIssuesByStatus(status),
    set: (newIssues: Issue[]) => {
      newIssues.forEach(issue => {
        if (issue.status !== status) {
          store.moveIssue(issue.id, status)
        }
      })
    }
  })
}

const todoIssues = createListComputed('TODO')
const inProgressIssues = createListComputed('IN_PROGRESS')
const doneIssues = createListComputed('DONE')
</script>

<style scoped>
.board-column {
  min-width: 280px;
  width: 280px;
  max-width: 280px;
}

.gap-2 {
  gap: 8px;
}

.gap-4 {
  gap: 16px;
}

.custom-board-input :deep(.v-field__input) {
  min-height: 36px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
