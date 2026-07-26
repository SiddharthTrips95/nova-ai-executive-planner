export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Energy = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskKanbanColumn = 'backlog' | 'today' | 'doing' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  energy: Energy;
  estimatedMinutes: number;
  actualMinutes?: number;
  dueAt?: string;
  scheduledAt?: string;
  tags: string[];
  projectId?: string;
  subtasks: Subtask[];
  dependencies: string[];
  createdAt: string;
};

export type Subtask = {
  id: string;
  title: string;
  done: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  color: string;
  progress: number;
  taskCount: number;
  dueAt?: string;
};

export type Goal = {
  id: string;
  title: string;
  category: string;
  progress: number;
  targetDate: string;
  milestones: Milestone[];
  status: 'on_track' | 'at_risk' | 'behind';
};

export type Milestone = {
  id: string;
  title: string;
  done: boolean;
  date: string;
};

export type Habit = {
  id: string;
  name: string;
  icon: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  weeklyRate: number;
  history: boolean[];
};

export type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'deep_work' | 'meeting' | 'personal' | 'travel' | 'break';
  location?: string;
  aiSuggested?: boolean;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  actions?: AIAction[];
};

export type AIAction = {
  type: 'create_task' | 'schedule' | 'reminder' | 'goal_update';
  label: string;
  applied: boolean;
};

export type Note = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  updatedAt: string;
  pinned: boolean;
};

export type AIRecommendation = {
  id: string;
  title: string;
  rationale: string;
  type: 'schedule' | 'focus' | 'break' | 'goal' | 'habit';
  impact: 'low' | 'medium' | 'high';
};

export type EnergyPoint = {
  hour: number;
  value: number;
};

export type AnalyticsPoint = {
  label: string;
  focus: number;
  completion: number;
};
