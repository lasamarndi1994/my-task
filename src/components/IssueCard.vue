<template>
    <v-card class="issue-card cursor-pointer" elevation="1">
        <v-card-text class="pa-3">
            <div class="text-body-2 mb-3 text-high-emphasis font-weight-medium">
                {{ issue.summary }}
            </div>
            <div class="d-flex align-center justify-space-between mt-2">
                <div class="d-flex align-center gap-2">
                    <!-- Type Icon -->
                    <v-icon v-if="issue.type === 'Bug'" color="red" size="16" icon="mdi-alert-circle"></v-icon>
                    <v-icon v-else-if="issue.type === 'Story'" color="green" size="16" icon="mdi-bookmark"></v-icon>
                    <v-icon v-else color="blue" size="16" icon="mdi-check-bold"></v-icon>

                    <span class="text-caption text-medium-emphasis font-weight-medium">{{ issue.key }}</span>
                </div>

                <div class="d-flex align-center gap-2">
                    <!-- Priority Icon -->
                    <v-icon v-if="issue.priority === 'High'" color="red" size="16"
                        icon="mdi-chevron-double-up"></v-icon>
                    <v-icon v-else-if="issue.priority === 'Medium'" color="orange" size="16"
                        icon="mdi-chevron-up"></v-icon>
                    <v-icon v-else color="blue" size="16" icon="mdi-chevron-down"></v-icon>

                    <v-avatar size="24">
                        <v-img :src="issue.assignee.avatar" :alt="issue.assignee.name"></v-img>
                    </v-avatar>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import type { Issue } from '@/stores/taskStore'

defineProps<{
    issue: Issue
}>()
</script>

<style scoped>
.issue-card:hover {
    background-color: #fafafa;
}

.gap-2 {
    gap: 8px;
}
</style>
