<template>
  <v-container fluid class="h-100 pa-6">
    <h1 class="text-h5 font-weight-bold mb-6">Backlog</h1>

    <!-- Sprint Section -->
    <v-card class="mb-6 rounded-lg" border flat>
      <v-card-title class="d-flex align-center py-3 bg-grey-lighten-4">
        <span class="text-subtitle-2 font-weight-bold">Sprint 1</span>
        <span class="text-caption text-medium-emphasis ml-4">Nov 13 - Nov 27</span>
        <span class="text-caption text-medium-emphasis ml-2">(3 issues)</span>
        <v-spacer></v-spacer>
        <v-btn size="small" variant="flat" color="grey-lighten-2" class="mr-2">Complete sprint</v-btn>
        <v-btn icon size="small" variant="text"><v-icon>mdi-dots-horizontal</v-icon></v-btn>
      </v-card-title>

      <v-list class="py-0">
        <v-list-item v-for="issue in sprintIssues" :key="issue.id" class="border-b" min-height="48">
          <template v-slot:prepend>
            <v-icon :icon="getIcon(issue.type)" :color="getColor(issue.type)" size="18" class="mr-3"></v-icon>
            <span class="text-caption font-weight-bold text-medium-emphasis mr-3" style="min-width: 60px;">{{ issue.key
            }}</span>
          </template>

          <v-list-item-title class="text-body-2">{{ issue.summary }}</v-list-item-title>

          <template v-slot:append>
            <div class="d-flex align-center">
              <v-chip size="x-small" :color="getStatusColor(issue.status)" class="mr-4 font-weight-bold text-uppercase"
                variant="flat">
                {{ issue.status.replace('_', ' ') }}
              </v-chip>
              <div class="d-flex mr-4">
                <v-avatar v-for="(assignee, i) in issue.assignees" :key="assignee.id" size="24"
                  :class="{ 'ml-n2': i > 0 }" style="border: 2px solid white">
                  <v-img :src="assignee.avatar"></v-img>
                </v-avatar>
              </div>
              <v-chip size="small" color="grey-lighten-3" variant="flat">3</v-chip>
            </div>
          </template>
        </v-list-item>
      </v-list>

      <div class="pa-2">
        <v-btn variant="text" prepend-icon="mdi-plus" block
          class="justify-start text-caption text-medium-emphasis">Create
          issue</v-btn>
      </div>
    </v-card>

    <!-- Backlog Section -->
    <v-card class="rounded-lg" border flat>
      <v-card-title class="d-flex align-center py-3 bg-grey-lighten-4">
        <span class="text-subtitle-2 font-weight-bold">Backlog</span>
        <span class="text-caption text-medium-emphasis ml-4">(3 issues)</span>
        <v-spacer></v-spacer>
        <v-btn size="small" variant="flat" color="primary" class="mr-2">Create sprint</v-btn>
      </v-card-title>

      <v-list class="py-0">
        <v-list-item v-for="issue in backlogIssues" :key="issue.id" class="border-b" min-height="48">
          <template v-slot:prepend>
            <v-icon :icon="getIcon(issue.type)" :color="getColor(issue.type)" size="18" class="mr-3"></v-icon>
            <span class="text-caption font-weight-bold text-medium-emphasis mr-3" style="min-width: 60px;">{{ issue.key
            }}</span>
          </template>

          <v-list-item-title class="text-body-2">{{ issue.summary }}</v-list-item-title>

          <template v-slot:append>
            <div class="d-flex align-center">
              <v-chip size="x-small" :color="getStatusColor(issue.status)" class="mr-4 font-weight-bold text-uppercase"
                variant="flat">
                {{ issue.status.replace('_', ' ') }}
              </v-chip>
              <div class="d-flex mr-4">
                <v-avatar v-for="(assignee, i) in issue.assignees" :key="assignee.id" size="24"
                  :class="{ 'ml-n2': i > 0 }" style="border: 2px solid white">
                  <v-img :src="assignee.avatar"></v-img>
                </v-avatar>
              </div>
              <v-chip size="small" color="grey-lighten-3" variant="flat">2</v-chip>
            </div>
          </template>
        </v-list-item>
      </v-list>
      <div class="pa-2">
        <v-btn variant="text" prepend-icon="mdi-plus" block
          class="justify-start text-caption text-medium-emphasis">Create
          issue</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const store = useTaskStore()

// Mock splitting issues
const sprintIssues = computed(() => store.issues.slice(0, 3))
const backlogIssues = computed(() => store.issues.slice(3))

const getIcon = (type: string) => {
  switch (type) {
    case 'Bug': return 'mdi-alert-circle'
    case 'Story': return 'mdi-bookmark'
    default: return 'mdi-check-bold'
  }
}

const getColor = (type: string) => {
  switch (type) {
    case 'Bug': return 'red'
    case 'Story': return 'green'
    default: return 'blue'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'TODO': return 'grey-lighten-2'
    case 'IN_PROGRESS': return 'blue-lighten-4'
    case 'DONE': return 'green-lighten-4'
    default: return 'grey'
  }
}
</script>
