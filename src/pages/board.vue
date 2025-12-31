<template>
  <v-container fluid class="h-100 pa-6 overflow-hidden">
    <div class="d-flex align-center mb-0">
      <!-- <h1 class="text-h5 font-weight-bold">Kanban Board</h1> -->
      <v-spacer></v-spacer>
      <div class="d-flex align-center gap-2">
        <div class="d-flex align-center">
          <v-avatar v-for="(user, i) in store.users.slice(0, 4)" :key="user.id" size="32" class="border-white"
            :class="{ 'ml-n2': i > 0 }" style="border: 2px solid white;">
            <v-img :src="user.avatar" :alt="user.name" cover></v-img>
            <v-tooltip activator="parent" location="top">{{ user.name
            }}</v-tooltip>
          </v-avatar>
        </div>
        <v-btn color="primary" variant="flat" class="ml-4" prepend-icon="mdi-plus" @click="isCreateDrawerOpen = true">
          Create Issue
        </v-btn>
      </div>
    </div>

    <div class="d-flex gap-4 h-100 overflow-x-auto pb-4">
      <!-- To Do Column -->
      <div class="board-column bg-surface-variant rounded-lg pa-3 d-flex flex-column">
        <div
          class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
          <span>To Do</span>
          <v-chip size="x-small" variant="flat" color="grey-lighten-2">{{ todoIssues.length }}</v-chip>
        </div>
        <draggable v-model="todoIssues" group="issues" item-key="id"
          class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
          <template #item="{ element }">
            <IssueCard :issue="element" @click="openIssueDetails(element)" />
          </template>
          <template #footer>
            <v-btn variant="text" block class="text-start justify-start text-caption mt-1" prepend-icon="mdi-plus"
              color="medium-emphasis">Create issue</v-btn>
          </template>
        </draggable>
      </div>

      <!-- In Progress Column -->
      <div class="board-column bg-surface-variant rounded-lg pa-3 d-flex flex-column">
        <div
          class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
          <span>In Progress</span>
          <v-chip size="x-small" variant="flat" color="grey-lighten-2">{{ inProgressIssues.length }}</v-chip>
        </div>
        <draggable v-model="inProgressIssues" group="issues" item-key="id"
          class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
          <template #item="{ element }">
            <IssueCard :issue="element" @click="openIssueDetails(element)" />
          </template>
          <template #footer>
            <v-btn variant="text" block class="text-start justify-start text-caption mt-1" prepend-icon="mdi-plus"
              color="medium-emphasis">Create issue</v-btn>
          </template>
        </draggable>
      </div>

      <!-- Done Column -->
      <div class="board-column bg-surface-variant rounded-lg pa-3 d-flex flex-column">
        <div
          class="text-subtitle-2 text-uppercase text-medium-emphasis mb-3 px-1 font-weight-bold d-flex justify-space-between align-center">
          <span>Done</span>
          <v-chip size="x-small" variant="flat" color="green-lighten-4" class="text-green-darken-3">{{
            doneIssues.length }}</v-chip>
        </div>
        <draggable v-model="doneIssues" group="issues" item-key="id"
          class="d-flex flex-column gap-2 overflow-y-auto px-1 flex-grow-1" style="min-height: 100px;">
          <template #item="{ element }">
            <IssueCard :issue="element" @click="openIssueDetails(element)" />
          </template>
          <template #footer>
            <v-btn variant="text" block class="text-start justify-start text-caption mt-1" prepend-icon="mdi-plus"
              color="medium-emphasis">Create issue</v-btn>
          </template>
        </draggable>
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
</style>
