import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Issue {
  id: string
  key: string
  summary: string
  description?: string
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'
  priority: 'High' | 'Medium' | 'Low'
  assignees: User[]
  type: 'Task' | 'Bug' | 'Story' | 'Epic'
  epicLink?: string // ID of the epic it belongs to
}

export interface Epic {
  id: string
  name: string
  summary: string
  color: string
  startDate?: string
  dueDate?: string
}

export interface User {
  id: string
  name: string
  avatar: string
}

export const useTaskStore = defineStore('task', () => {
  const currentUser = ref<User>({
    id: 'u1',
    name: 'Lasam',
    avatar: 'https://i.pravatar.cc/150?u=lasam',
  })

  const users = ref<User[]>([
    currentUser.value,
    { id: 'u2', name: 'Alana Song', avatar: 'https://i.pravatar.cc/150?u=alana' },
    { id: 'u3', name: 'Mitch', avatar: 'https://i.pravatar.cc/150?u=mitch' },
    { id: 'u4', name: 'Rupert', avatar: 'https://i.pravatar.cc/150?u=rupert' },
  ])

  const epics = ref<Epic[]>([
    {
      id: 'e1',
      name: 'Mobile App Launch',
      summary: 'Improve NPS for mobile app users',
      color: '#6554C0',
      startDate: '2025-11-01',
      dueDate: '2025-11-15',
    },
    {
      id: 'e2',
      name: 'Growth',
      summary: 'Increase mobile app users by 50%',
      color: '#8777D9',
      startDate: '2025-11-20',
      dueDate: '2025-12-30',
    },
    {
      id: 'e3',
      name: 'Analytics',
      summary: 'Improve in-app analytics',
      color: '#8777D9',
      startDate: '2025-11-01',
      dueDate: '2025-12-01',
    },
  ])

  const issues = ref<Issue[]>([
    {
      id: '1',
      key: 'KAN-1',
      summary: 'Research competitors',
      status: 'DONE',
      priority: 'Medium',
      assignees: [users.value[1]!],
      type: 'Story',
      epicLink: 'e1',
    },
    {
      id: '2',
      key: 'KAN-2',
      summary: 'Draft technical specifications',
      status: 'IN_PROGRESS',
      priority: 'High',
      assignees: [users.value[0]!],
      type: 'Task',
      epicLink: 'e1',
    },
    {
      id: '3',
      key: 'KAN-3',
      summary: 'Design system architecture',
      status: 'TODO',
      priority: 'High',
      assignees: [users.value[2]!],
      type: 'Task',
      epicLink: 'e2',
    },
    {
      id: '4',
      key: 'KAN-4',
      summary: 'Setup project repository',
      status: 'DONE',
      priority: 'Low',
      assignees: [users.value[0]!],
      type: 'Task',
    },
    {
      id: '5',
      key: 'KAN-5',
      summary: 'Implement authentication',
      status: 'IN_PROGRESS',
      priority: 'High',
      assignees: [users.value[3]!],
      type: 'Story',
      epicLink: 'e3',
    },
    {
      id: '6',
      key: 'KAN-6',
      summary: 'Fix login bug on Safari',
      status: 'TODO',
      priority: 'Medium',
      assignees: [users.value[1]!],
      type: 'Bug',
    },
  ])

  const getIssuesByStatus = (status: Issue['status']) => {
    return issues.value.filter(i => i.status === status)
  }

  const moveIssue = (issueId: string, newStatus: Issue['status']) => {
    const issue = issues.value.find(i => i.id === issueId)
    if (issue) {
      issue.status = newStatus
    }
  }

  const createIssue = (issue: Omit<Issue, 'id' | 'key'>) => {
    const newId = (issues.value.length + 1).toString()
    const newKey = `KAN-${newId}`
    issues.value.push({ ...issue, id: newId, key: newKey })
  }

  return {
    currentUser,
    users,
    issues,
    epics,
    getIssuesByStatus,
    moveIssue,
    createIssue,
  }
})
