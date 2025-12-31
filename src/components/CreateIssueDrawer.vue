<template>
    <v-navigation-drawer :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"
        location="right" width="600" temporary>
        <div class="d-flex flex-column h-100">
            <!-- Header -->
            <div class="d-flex align-center justify-space-between pa-4 border-b">
                <h2 class="text-h6 font-weight-bold">Create Item</h2>
                <v-btn icon="mdi-close" variant="text" size="small" @click="$emit('update:modelValue', false)"></v-btn>
            </div>

            <!-- Content -->
            <div class="flex-grow-1 overflow-y-auto pa-6">
                <v-form>
                    <!-- Item Name -->
                    <v-text-field label="Item Name" variant="underlined" color="primary" class="mb-4 text-h6"
                        placeholder="Enter item name"></v-text-field>

                    <!-- Description -->
                    <v-textarea label="Description" variant="underlined" color="primary" rows="3" class="mb-4"
                        placeholder="Add description"></v-textarea>

                    <!-- Add to Sprint -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Add to</v-col>
                        <v-col cols="9">
                            <v-select model-value="Sprint 46" :items="['Sprint 46', 'Sprint 47', 'Backlog']"
                                variant="plain" density="compact" hide-details class="font-weight-medium"></v-select>
                        </v-col>
                    </v-row>

                    <!-- Attachments -->
                    <div class="mb-6">
                        <div class="text-caption text-medium-emphasis mb-2">Attachments</div>
                        <div class="border-dashed rounded pa-4 text-center bg-grey-lighten-5">
                            <span class="text-body-2">
                                Drop or <span class="text-primary cursor-pointer">Select</span> files
                            </span>
                            <div class="text-caption text-medium-emphasis mt-1">Note: Add up to 10 files</div>
                        </div>
                    </div>

                    <!-- Tags -->
                    <v-row no-gutters class="mb-6 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Tags</v-col>
                        <v-col cols="9">
                            <v-combobox placeholder="Select tags" variant="plain" density="compact" hide-details chips
                                multiple></v-combobox>
                        </v-col>
                    </v-row>

                    <v-divider class="mb-6"></v-divider>
                    <div class="text-subtitle-1 font-weight-medium text-primary mb-4">Default Section</div>

                    <!-- User Group -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">
                            User Group <v-icon size="x-small" color="grey">mdi-information-outline</v-icon>
                        </v-col>
                        <v-col cols="9">
                            <v-select placeholder="Select User Group" :items="['Developers', 'Designers', 'QA']"
                                variant="plain" density="compact" hide-details></v-select>
                        </v-col>
                    </v-row>

                    <!-- Assign Users -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Assign Users</v-col>
                        <v-col cols="9">
                            <v-autocomplete placeholder="Select user" :items="store.users" item-title="name"
                                item-value="id" multiple chips variant="plain" density="compact" hide-details>
                                <template #chip="{ props, item }">
                                    <v-chip v-bind="props" :prepend-avatar="item.raw.avatar" size="small" class="mr-1">
                                        {{ item.raw.name }}
                                    </v-chip>
                                </template>
                            </v-autocomplete>
                        </v-col>
                    </v-row>

                    <!-- Status -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Status</v-col>
                        <v-col cols="9" class="d-flex align-center justify-space-between">
                            <div class="d-flex align-center text-medium-emphasis">
                                <v-icon size="small" class="mr-2">mdi-checkbox-blank-circle-outline</v-icon>
                                <span class="font-weight-medium">To do</span>
                            </div>
                            <v-chip size="x-small" variant="outlined" color="orange" class="px-2">DEFAULT</v-chip>
                        </v-col>
                    </v-row>

                    <!-- Priority -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Priority</v-col>
                        <v-col cols="9" class="d-flex align-center justify-space-between">
                            <v-select placeholder="Select priority" :items="['High', 'Medium', 'Low', 'None']"
                                model-value="None" variant="plain" density="compact" hide-details>
                                <template #prepend-inner>
                                    <v-icon size="small" color="grey" class="mr-2">mdi-checkbox-blank-circle</v-icon>
                                </template>
                            </v-select>
                            <v-chip size="x-small" variant="outlined" color="orange" class="px-2">DEFAULT</v-chip>
                        </v-col>
                    </v-row>

                    <!-- Start Date -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Start Date</v-col>
                        <v-col cols="9">
                            <v-text-field placeholder="dd/MMM/yyyy hh:mm tt" variant="plain" density="compact"
                                hide-details append-inner-icon="mdi-calendar"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- End Date -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">End Date</v-col>
                        <v-col cols="9">
                            <v-text-field placeholder="dd/MMM/yyyy hh:mm tt" variant="plain" density="compact"
                                hide-details append-inner-icon="mdi-calendar"></v-text-field>
                        </v-col>
                    </v-row>

                    <!-- Duration -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">
                            Duration <v-icon size="x-small" color="grey">mdi-information-outline</v-icon>
                        </v-col>
                        <v-col cols="9">
                            <div class="text-body-2 text-medium-emphasis">--</div>
                        </v-col>
                    </v-row>

                    <!-- Work Hours -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">
                            Work Hours <v-icon size="x-small" color="grey">mdi-information-outline</v-icon>
                        </v-col>
                        <v-col cols="9" class="d-flex justify-space-between align-center">
                            <div class="text-body-2 text-medium-emphasis">--</div>
                            <span class="text-caption text-teal cursor-pointer hover-underline">Set work hours</span>
                        </v-col>
                    </v-row>

                    <!-- Estimation Points -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Estimation Points</v-col>
                        <v-col cols="9">
                            <v-select placeholder="Unestimated" :items="['1', '2', '3', '5', '8', '13']" variant="plain"
                                density="compact" hide-details></v-select>
                        </v-col>
                    </v-row>

                    <!-- Release -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Release</v-col>
                        <v-col cols="9">
                            <v-select placeholder="Select release" :items="['Release 1.0', 'Release 2.0']"
                                variant="plain" density="compact" hide-details></v-select>
                        </v-col>
                    </v-row>

                    <!-- Epic -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Epic</v-col>
                        <v-col cols="9">
                            <v-select placeholder="Select epic" :items="['Website Redesign', 'Mobile App']"
                                variant="plain" density="compact" hide-details></v-select>
                        </v-col>
                    </v-row>

                    <!-- Item Type -->
                    <v-row no-gutters class="mb-4 align-center">
                        <v-col cols="3" class="text-body-2 text-medium-emphasis">Item Type</v-col>
                        <v-col cols="9" class="d-flex align-center justify-space-between">
                            <div class="d-flex align-center">
                                <v-icon size="small" color="green" class="mr-2">mdi-bookmark</v-icon>
                                <span class="font-weight-medium">Story</span>
                            </div>
                            <v-chip size="x-small" variant="outlined" color="orange" class="px-2">DEFAULT</v-chip>
                        </v-col>
                    </v-row>

                </v-form>
            </div>

            <!-- Footer -->
            <div class="pa-4 border-t d-flex align-center justify-space-between bg-grey-lighten-5">
                <v-btn variant="outlined" color="grey-darken-1" append-icon="mdi-chevron-down" class="text-none">
                    Add to Other apps
                </v-btn>
                <div class="d-flex gap-2">
                    <v-btn color="primary" class="text-none px-6" elevation="0">Create</v-btn>
                    <v-btn variant="outlined" color="grey-darken-1" class="text-none">Add More</v-btn>
                    <v-btn variant="text" color="grey-darken-1" class="text-none"
                        @click="$emit('update:modelValue', false)">Cancel</v-btn>
                </div>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore'

defineProps<{
    modelValue: boolean
}>()

defineEmits(['update:modelValue'])

const store = useTaskStore()
</script>

<style scoped>
.gap-2 {
    gap: 8px;
}

.cursor-pointer {
    cursor: pointer;
}
</style>
