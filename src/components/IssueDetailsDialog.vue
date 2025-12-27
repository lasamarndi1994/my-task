<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="1200"
    scrollable :fullscreen="isFullscreen">
    <v-card class="h-100 rounded-lg">
      <v-toolbar color="surface" density="compact" flat class="border-b">
        <v-btn icon="mdi-pencil-outline" variant="text" size="small" class="ml-2"></v-btn>
        <div class="text-caption text-medium-emphasis ml-2">
          Add epic / <v-icon size="small" color="primary">mdi-checkbox-marked-circle</v-icon> {{ issue?.key }}
        </div>
        <v-spacer></v-spacer>
        <v-btn icon variant="text" size="small">
          <v-icon>mdi-lock-outline</v-icon>
        </v-btn>
        <v-btn icon variant="text" size="small">
          <v-icon>mdi-eye-outline</v-icon>
          <span class="text-caption ml-1">1</span>
        </v-btn>
        <v-btn icon variant="text" size="small">
          <v-icon>mdi-share-variant-outline</v-icon>
        </v-btn>
        <v-btn icon variant="text" size="small">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
        <v-btn icon variant="text" size="small" @click="isFullscreen = !isFullscreen">
          <v-icon>{{ isFullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}</v-icon>
        </v-btn>
        <v-btn icon variant="text" size="small" @click="$emit('update:modelValue', false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-container fluid class="fill-height align-start pa-0">
          <v-row no-gutters class="h-100">
            <!-- Main Content -->
            <v-col cols="12" md="8" class="pa-6 border-e overflow-y-auto"
              :style="{ 'max-height': isFullscreen ? '' : '80vh' }">
              <h1 class="text-h4 font-weight-medium mb-4">{{ issue?.summary }}</h1>

              <div class="d-flex gap-2 mb-6">
                <v-btn variant="outlined" size="small" prepend-icon="mdi-paperclip">Attach</v-btn>
                <v-btn variant="outlined" size="small" prepend-icon="mdi-sitemap">Add child
                  issue</v-btn>
                <v-btn variant="outlined" size="small" prepend-icon="mdi-link">Link issue</v-btn>
                <v-btn variant="text" size="small" icon="mdi-dots-horizontal"></v-btn>
              </div>

              <div class="mb-6">
                <h3 class="text-subtitle-1 font-weight-bold mb-2">Description</h3>
                <QuillEditor :content="internalDescription" @update:content="internalDescription = $event"
                  :modules="modules" placeholder="Add a description..." />
                <div class="pa-2 d-flex gap-2">
                  <v-btn color="primary" size="small">Save</v-btn>
                  <v-btn variant="text" size="small">Cancel</v-btn>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center justify-space-between mb-2">
                  <h3 class="text-subtitle-1 font-weight-bold">Attachments</h3>
                  <v-btn icon="mdi-plus" variant="text" size="small"></v-btn>
                </div>
                <div class="d-flex gap-4 flex-wrap">
                  <div class="border rounded pa-2 d-flex align-center gap-2 cursor-pointer bg-grey-lighten-5"
                    style="width: 200px">
                    <v-icon color="red">mdi-file-pdf-box</v-icon>
                    <div class="text-truncate flex-grow-1 text-caption font-weight-bold">
                      requirements_v1.pdf</div>
                  </div>
                  <div
                    class="border rounded pa-2 d-flex align-center flex-column justify-center cursor-pointer border-dashed"
                    style="width: 100px; height: 80px">
                    <v-icon color="medium-emphasis">mdi-cloud-upload</v-icon>
                    <span class="text-caption text-medium-emphasis mt-1">Drop files</span>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center justify-space-between mb-2">
                  <h3 class="text-subtitle-1 font-weight-bold">Linked Issues</h3>
                  <v-btn icon="mdi-plus" variant="text" size="small"></v-btn>
                </div>
                <div class="border rounded px-4 py-2 d-flex align-center bg-grey-lighten-5 mb-2">
                  <v-icon color="blue" size="small" class="mr-2">mdi-check-bold</v-icon>
                  <span class="text-caption font-weight-bold mr-2">KAN-5</span>
                  <span class="text-body-2 text-medium-emphasis text-truncate flex-grow-1">Implement
                    authentication</span>
                  <v-chip size="x-small" color="blue-lighten-4" class="text-blue-darken-3 font-weight-bold">IN
                    PROGRESS</v-chip>
                </div>
              </div>

              <div class="mb-6">
                <div class="d-flex align-center justify-space-between mb-2">
                  <h3 class="text-subtitle-1 font-weight-bold">Subtasks</h3>
                  <div>
                    <v-btn icon="mdi-dots-horizontal" variant="text" size="small"></v-btn>
                    <v-btn icon="mdi-plus" variant="text" size="small"></v-btn>
                  </div>
                </div>
                <v-progress-linear model-value="0" color="primary" height="4" rounded class="mb-4"></v-progress-linear>
                <!-- Add empty state matching screenshot roughly -->
                <div class="border rounded px-4 py-2 d-flex align-center bg-grey-lighten-5">
                  <v-icon color="primary" class="mr-2">mdi-checkbox-blank-outline</v-icon>
                  <span class="text-body-2 text-medium-emphasis">No subtasks yet</span>
                </div>
              </div>

              <div class="mb-6">
                <h3 class="text-subtitle-1 font-weight-bold mb-2">Activity</h3>
                <div class="d-flex align-center gap-2 mb-4">
                  <span class="text-caption font-weight-bold">Show:</span>
                  <v-chip-group selected-class="bg-grey-lighten-3" multiple>
                    <v-chip size="small" variant="flat" value="all">All</v-chip>
                    <v-chip size="small" variant="tonal" value="comments" color="primary">Comments</v-chip>
                    <v-chip size="small" variant="flat" value="history">History</v-chip>
                  </v-chip-group>
                </div>

                <div class="d-flex gap-3">
                  <v-avatar size="32" color="green-darken-1">
                    <span class="text-white text-caption">{{ issue?.assignee?.name?.charAt(0) || 'U'
                    }}</span>
                  </v-avatar>
                  <div class="flex-grow-1">
                    <v-text-field variant="outlined" placeholder="Add a comment..." hide-details
                      density="compact"></v-text-field>
                    <div class="text-caption text-medium-emphasis mt-1">
                      <strong>Pro tip:</strong> press <kbd>M</kbd> to comment
                    </div>
                  </div>
                </div>
              </div>
            </v-col>

            <!-- Sidebar -->
            <v-col cols="12" md="4" class="pa-4 bg-grey-lighten-5 overflow-y-auto"
              :style="{ 'max-height': isFullscreen ? '' : '80vh' }">
              <v-select :model-value="issue?.status" :items="['TODO', 'IN_PROGRESS', 'DONE']" variant="solo-filled"
                density="compact" hide-details class="mb-6 font-weight-bold">
                <template #selection="{ item }">
                  <span class="text-uppercase font-weight-bold">{{ item.title }}</span>
                </template>
              </v-select>

              <div class="border rounded bg-surface pa-0 mb-4">
                <v-expansion-panels flat variant="accordion">
                  <v-expansion-panel title="Details" elevation="0">
                    <template #title>
                      <span class="text-subtitle-2 font-weight-bold">Details</span>
                    </template>
                    <v-expansion-panel-text>
                      <v-list density="compact" class="pa-0">
                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Assignee</div>
                          </template>
                          <div class="d-flex align-center gap-2">
                            <v-avatar size="24">
                              <v-img v-if="issue?.assignee?.avatar" :src="issue.assignee.avatar"></v-img>
                              <v-icon v-else>mdi-account-circle</v-icon>
                            </v-avatar>
                            <span class="text-body-2 hover-underline cursor-pointer text-primary">
                              {{ issue?.assignee?.name || 'Unassigned' }}
                            </span>
                          </div>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Labels</div>
                          </template>
                          <span class="text-body-2">None</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Parent</div>
                          </template>
                          <span class="text-body-2">None</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Priority</div>
                          </template>
                          <div class="d-flex align-center gap-2">
                            <v-icon size="small" :color="getPriorityColor(issue?.priority)">
                              {{ getPriorityIcon(issue?.priority) }}
                            </v-icon>
                            <span class="text-body-2">{{ issue?.priority }}</span>
                          </div>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Story point
                              estimate</div>
                          </template>
                          <span class="text-body-2">None</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Reporter</div>
                          </template>
                          <div class="d-flex align-center gap-2">
                            <v-avatar size="24" color="green-darken-1">
                              <span class="text-white text-caption">LM</span>
                            </v-avatar>
                            <span class="text-body-2 text-primary">Lasam Marndi</span>
                          </div>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Components</div>
                          </template>
                          <span class="text-body-2">None</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Sprint</div>
                          </template>
                          <span class="text-body-2 text-primary hover-underline cursor-pointer">Sprint
                            4</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Fix versions</div>
                          </template>
                          <span class="text-body-2">None</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Original estimate
                            </div>
                          </template>
                          <span class="text-body-2 text-medium-emphasis">Unestimated</span>
                        </v-list-item>

                        <v-list-item class="px-0">
                          <template #prepend>
                            <div style="width: 100px" class="text-caption text-medium-emphasis">Time tracking
                            </div>
                          </template>
                          <v-progress-linear model-value="0" color="grey-lighten-2" height="6"
                            rounded></v-progress-linear>
                        </v-list-item>
                      </v-list>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </div>

              <div class="text-caption text-medium-emphasis mb-2">
                Created 1 minute ago<br>
                Updated 1 minute ago
              </div>

              <div class="d-flex justify-end">
                <v-btn variant="text" size="small" prepend-icon="mdi-cog">Configure</v-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Issue } from '@/stores/taskStore'
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'
import QuillEditor from './QuillEditor.vue'

const props = defineProps<{
  modelValue: boolean
  issue: Issue | null
}>()

const isFullscreen = ref(false)
const internalDescription = ref(props.issue?.description || '')
const taskStore = useTaskStore()

const modules = {
  mention: {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ["@"],
    source: function (searchTerm: string, renderList: Function) {
      const values = taskStore.users.map(u => ({ id: u.id, value: u.name }))
      if (searchTerm.length === 0) {
        renderList(values, searchTerm)
      } else {
        const matches = []
        for (let i = 0; i < values.length; i++) {
          if (~values[i]!.value.toLowerCase().indexOf(searchTerm.toLowerCase())) {
            matches.push(values[i]!)
          }
        }
        renderList(matches, searchTerm)
      }
    },
  }
}

const emit = defineEmits(['update:modelValue'])

const getPriorityColor = (priority: string | undefined) => {
  if (!priority) return 'grey'
  switch (priority.toLowerCase()) {
    case 'high': return 'red'
    case 'medium': return 'orange'
    case 'low': return 'blue'
    default: return 'grey'
  }
}

const getPriorityIcon = (priority: string | undefined) => {
  if (!priority) return 'mdi-minus'
  switch (priority.toLowerCase()) {
    case 'high': return 'mdi-arrow-up'
    case 'medium': return 'mdi-equal'
    case 'low': return 'mdi-arrow-down'
    default: return 'mdi-minus'
  }
}
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.hover-underline:hover {
  text-decoration: underline;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
