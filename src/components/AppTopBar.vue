<template>
  <v-app-bar height="50" flat class="border-b px-4">
    <div class="d-flex align-center w-100">
      <v-app-bar-nav-icon variant="text" @click.stop="uiStore.toggleDrawer"></v-app-bar-nav-icon>
      <div class="text-subtitle-1 font-weight-bold mr-4">{{ title }}</div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-text-field density="compact" variant="outlined" placeholder="Search" prepend-inner-icon="mdi-magnify"
          hide-details single-line class="mr-3 search-transition" :width="searchWidth" bg-color="surface"
          color="primary" @focus="searchFocused = true" @blur="searchFocused = false" autocomplete="off"></v-text-field>

        <v-menu width="400" max-height="600" :close-on-content-click="false" offset="10" location="bottom center">
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" class="mr-1 text-medium-emphasis" v-bind="props">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </template>
          <v-card rounded="lg" elevation="3">
            <div class="d-flex align-center justify-space-between px-4 py-3">
              <span class="text-h6 font-weight-bold">Notifications</span>
              <div class="d-flex align-center">
                <span class="text-caption mr-2">Only show unread</span>
                <v-switch density="compact" outlined="pri" hide-details color="primary"></v-switch>
                <v-btn icon density="compact" variant="text" class="ml-2">
                  <v-icon size="small">mdi-open-in-new</v-icon>
                </v-btn>
                <v-btn icon density="compact" variant="text">
                  <v-icon size="small">mdi-dots-vertical</v-icon>
                </v-btn>
              </div>
            </div>

            <v-tabs density="compact" color="primary" grow>
              <v-tab value="direct" class="text-none flex-grow-0 px-4" style="min-width: auto;">Direct</v-tab>
              <v-tab value="watching" class="text-none flex-grow-0 px-4" style="min-width: auto;">Watching</v-tab>
            </v-tabs>
            <v-divider></v-divider>

            <div class="d-flex flex-column align-center justify-center pa-8 text-center" style="min-height: 300px;">
              <v-icon size="80" color="primary" class="mb-4">mdi-flag-variant</v-icon>
              <div class="text-body-2 text-medium-emphasis">
                You've <strong>read</strong> all your notifications<br>from the last 30 days.
              </div>
            </div>
          </v-card>
        </v-menu>
        <v-menu width="400" max-height="500" :close-on-content-click="false" offset="10" location="bottom center">
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" class="mr-1 text-medium-emphasis" v-bind="props">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-card rounded="lg" elevation="3">
            <div class="d-flex align-center justify-space-between px-4 py-3 bg-grey-lighten-4 border-b">
              <div class="text-subtitle-1 font-weight-bold text-center w-100">Help</div>
              <v-btn icon density="compact" variant="text" size="small" style="position: absolute; right: 8px;">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>

            <v-list density="compact" class="py-2 overflow-y-auto">
              <v-list-item link prepend-icon="mdi-lightbulb-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Find out what's changed in Jira</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-file-document-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Read about the new navigation</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-file-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Browse complete documentation</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-school-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Build skills with Atlassian Learning</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-forum-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Ask our Community forums</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-alert-circle-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Contact support</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-message-text-outline">
                <v-list-item-title class="text-caption">Give feedback about Jira</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-keyboard-outline">
                <v-list-item-title class="text-caption">Keyboard shortcuts</v-list-item-title>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-send-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption">Get Jira Mobile</v-list-item-title>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <div class="bg-grey-lighten-5 pa-4 text-center">
              <div class="d-flex justify-center gap-4 flex-wrap text-caption text-medium-emphasis mb-2">
                <a href="#" class="text-decoration-none text-medium-emphasis">About Jira</a>
                <a href="#" class="text-decoration-none text-medium-emphasis">Terms of use</a>
                <a href="#" class="text-decoration-none text-medium-emphasis">Privacy policy</a>
              </div>
              <div class="text-caption text-medium-emphasis">Notice at collection</div>
            </div>
          </v-card>
        </v-menu>
        <v-menu max-width="600" height="400" :close-on-content-click="false" offset="10" scroll-strategy="none"
          location="bottom center">
          <template v-slot:activator="{ props }">
            <v-btn icon size="small" class="mr-3 text-medium-emphasis" v-bind="props">
              <v-icon>mdi-cog-outline</v-icon>
            </v-btn>
          </template>
          <v-card rounded="lg" elevation="3">
            <!-- Header -->
            <div class="d-flex align-center justify-space-between px-4 py-3 border-b">
              <span class="text-subtitle-2 font-weight-bold">Personal My tasks settings</span>
              <v-sheet border rounded class="px-2 py-1 text-caption text-medium-emphasis d-flex align-center gap-2">
                Search <span class="bg-grey-lighten-3 px-1 rounded ml-1 text-xs">Ctrl + K</span>
              </v-sheet>
            </div>

            <v-list lines="two" density="compact" class="py-0">
              <!-- Personal Sections -->
              <v-list-item link prepend-icon="mdi-account-outline">
                <v-list-item-title class="text-caption font-weight-bold">General settings</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage language, time zone, and other personal
                  preferences</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-bell-outline">
                <v-list-item-title class="text-caption font-weight-bold">Notification settings</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage email and in-app notifications from
                  MyTask</v-list-item-subtitle>
              </v-list-item>

              <!-- MyTask Admin Settings -->
              <v-list-subheader
                class="text-caption font-weight-bold text-uppercase mt-2 px-4 text-medium-emphasis">MyTask
                admin settings</v-list-subheader>
              <v-list-item link prepend-icon="mdi-monitor">
                <v-list-item-title class="text-caption font-weight-bold">System</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage general configuration, security, automation, user
                  interface, and more</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-view-grid-outline">
                <v-list-item-title class="text-caption font-weight-bold">MyTask apps</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage access, settings, and integrations across
                  MyTask</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-rocket-launch-outline">
                <v-list-item-title class="text-caption font-weight-bold">Spaces</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage space settings, categories, and
                  more</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-checkbox-marked-outline">
                <v-list-item-title class="text-caption font-weight-bold">Work items</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Configure work types, workflows, screens, fields, and
                  more</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-puzzle-outline">
                <v-list-item-title class="text-caption font-weight-bold">Marketplace apps</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Add and manage MyTask Marketplace apps and
                  integrations</v-list-item-subtitle>
              </v-list-item>
              <v-list-item link prepend-icon="mdi-cog-sync-outline">
                <v-list-item-title class="text-caption font-weight-bold">Operations</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage alerts and incidents, setup on-call schedules, and
                  more</v-list-item-subtitle>
              </v-list-item>

              <!-- Atlassian Admin Settings -->
              <v-list-subheader
                class="text-caption font-weight-bold text-uppercase mt-2 px-4 text-medium-emphasis">Atlassian
                admin
                settings</v-list-subheader>
              <v-list-item prepend-icon="mdi-account-group-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption font-weight-bold">User management</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Manage users, groups, and access
                  requests</v-list-item-subtitle>
              </v-list-item>
              <v-list-item prepend-icon="mdi-credit-card-outline" append-icon="mdi-open-in-new">
                <v-list-item-title class="text-caption font-weight-bold">Billing</v-list-item-title>
                <v-list-item-subtitle class="text-caption">Update your billing details, manage subscriptions, and
                  more</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>

        <v-menu min-width="280" location="bottom center">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="ml-2" size="small">
              <v-avatar size="32" color="primary">
                <v-img :src="store.currentUser.avatar"></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card class="pa-2 mt-2" rounded="lg" elevation="3">
            <!-- User Info Section -->
            <div class="d-flex align-center pa-3 mb-1">
              <v-avatar size="48" color="#0052CC" class="mr-3">
                <span class="text-h6 text-white font-weight-regular">LM</span>
              </v-avatar>
              <div>
                <div class="text-body-1 font-weight-bold">Lasa Marndi</div>
                <div class="text-caption text-medium-emphasis">lasamarndi1994@gmail.com</div>
              </div>
            </div>

            <!-- Menu Items -->
            <v-list density="compact" nav class="pa-0">
              <v-list-item prepend-icon="mdi-account-outline" title="Profile" value="profile"
                rounded="md"></v-list-item>
              <v-list-item prepend-icon="mdi-cog-outline" title="Account settings" value="settings"
                rounded="md"></v-list-item>
              <v-menu location="start" offset="10" :close-on-content-click="true">
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props" prepend-icon="mdi-theme-light-dark" title="Theme" value="theme"
                    append-icon="mdi-chevron-right" rounded="md"></v-list-item>
                </template>
                <v-card min-width="280" class="pa-2" elevation="3" rounded="lg">
                  <v-list density="compact" nav class="pa-0">
                    <!-- Light -->
                    <v-list-item class="mb-2" rounded="md" @click="selectTheme('light')" :active="userTheme === 'light'"
                      active-color="primary" variant="plain">
                      <template v-slot:prepend>
                        <div class="d-flex align-center mr-2">
                          <v-icon :color="userTheme === 'light' ? 'primary' : 'medium-emphasis'">
                            {{ userTheme === 'light' ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
                          </v-icon>
                        </div>
                        <v-sheet width="60" height="40" border class="mr-3 d-flex flex-column overflow-hidden rounded">
                          <v-sheet height="8" color="grey-lighten-3" class="w-100 mb-1 d-flex align-center px-1">
                            <div style="width: 4px; height: 4px; background: #0052CC; border-radius: 50%;"></div>
                          </v-sheet>
                          <div class="d-flex flex-grow-1">
                            <v-sheet width="15" color="grey-lighten-4" class="h-100"></v-sheet>
                            <div class="flex-grow-1 bg-white pa-1">
                              <div style="height: 2px; width: 60%; background: #E0E0E0; margin-bottom: 2px;"></div>
                              <div style="height: 2px; width: 80%; background: #E0E0E0; margin-bottom: 2px;"></div>
                            </div>
                          </div>
                        </v-sheet>
                      </template>
                      <v-list-item-title>Light</v-list-item-title>
                    </v-list-item>

                    <!-- Dark -->
                    <v-list-item class="mb-2" rounded="md" @click="selectTheme('dark')" :active="userTheme === 'dark'"
                      active-color="primary" variant="plain">
                      <template v-slot:prepend>
                        <div class="d-flex align-center mr-2">
                          <v-icon :color="userTheme === 'dark' ? 'primary' : 'medium-emphasis'">
                            {{ userTheme === 'dark' ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
                          </v-icon>
                        </div>
                        <v-sheet width="60" height="40" color="grey-darken-4" border
                          class="mr-3 d-flex flex-column overflow-hidden rounded">
                          <v-sheet height="8" color="grey-darken-3" class="w-100 mb-1 d-flex align-center px-1">
                            <div style="width: 4px; height: 4px; background: #0052CC; border-radius: 50%;"></div>
                          </v-sheet>
                          <div class="d-flex flex-grow-1">
                            <v-sheet width="15" color="grey-darken-3" class="h-100"></v-sheet>
                            <div class="flex-grow-1 bg-grey-darken-4 pa-1">
                              <div style="height: 2px; width: 60%; background: #424242; margin-bottom: 2px;"></div>
                              <div style="height: 2px; width: 80%; background: #424242; margin-bottom: 2px;"></div>
                            </div>
                          </div>
                        </v-sheet>
                      </template>
                      <v-list-item-title>Dark</v-list-item-title>
                    </v-list-item>

                    <!-- Auto -->
                    <v-list-item rounded="md" @click="selectTheme('system')" :active="userTheme === 'system'"
                      active-color="primary" variant="plain">
                      <template v-slot:prepend>
                        <div class="d-flex align-center mr-2">
                          <v-icon :color="userTheme === 'system' ? 'primary' : 'medium-emphasis'">
                            {{ userTheme === 'system' ? 'mdi-radiobox-marked' : 'mdi-radiobox-blank' }}
                          </v-icon>
                        </div>
                        <v-sheet width="60" height="40" class="mr-3 d-flex overflow-hidden rounded"
                          style="position: relative;">
                          <!-- Split view for system -->
                          <v-sheet width="50%" height="100%" color="grey-darken-4" class="d-flex flex-column">
                            <v-sheet height="8" color="grey-darken-3"></v-sheet>
                            <div class="d-flex flex-grow-1">
                              <v-sheet width="8" color="grey-darken-3" class="h-100"></v-sheet>
                            </div>
                          </v-sheet>
                          <v-sheet width="50%" height="100%" color="white"
                            class="d-flex flex-column border-t border-b border-r">
                            <v-sheet height="8" color="grey-lighten-3"></v-sheet>
                            <div class="d-flex flex-grow-1">
                              <v-sheet width="8" color="grey-lighten-4" class="h-100"></v-sheet>
                            </div>
                          </v-sheet>
                        </v-sheet>
                      </template>
                      <v-list-item-title>Match browser</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-menu>
            </v-list>

            <v-divider class="my-2"></v-divider>

            <v-list density="compact" nav class="pa-0">
              <v-list-item prepend-icon="mdi-account-group-outline" title="Switch account" value="switch"
                rounded="md"></v-list-item>
              <v-list-item prepend-icon="mdi-logout-variant" title="Log out" value="logout" rounded="md"></v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import { useTaskStore } from '@/stores/taskStore'
import { useUiStore } from '@/stores/uiStore'

const route = useRoute()
const store = useTaskStore()
const uiStore = useUiStore()
const theme = useTheme()

const searchFocused = ref(false)
const searchWidth = computed(() => searchFocused.value ? 280 : 180)

const title = computed(() => {
  if (route.path.includes('roadmap')) return 'Roadmap'
  if (route.path.includes('backlog')) return 'Backlog'
  if (route.path.includes('board')) return 'Board'
  if (route.path.includes('list')) return 'Issues'
  return 'Project'
})

// Theme Logic
const userTheme = ref(localStorage.getItem('user-theme') || 'system')
const systemTheme = ref(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

const updateTheme = () => {
  if (userTheme.value === 'system') {
    theme.global.name.value = systemTheme.value === 'dark' ? 'dark' : 'myTaskTheme'
  } else {
    theme.global.name.value = userTheme.value === 'dark' ? 'dark' : 'myTaskTheme'
  }
  localStorage.setItem('user-theme', userTheme.value)
}

// Watch system changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  systemTheme.value = event.matches ? 'dark' : 'light'
  if (userTheme.value === 'system') {
    updateTheme()
  }
})

onMounted(() => {
  updateTheme()
})

const selectTheme = (mode: string) => {
  userTheme.value = mode
  updateTheme()
}
</script>

<style scoped>
.search-transition {
  transition: all 0.3s ease;
}
</style>
