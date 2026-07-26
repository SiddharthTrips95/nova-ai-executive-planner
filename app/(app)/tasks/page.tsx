'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  GripVertical,
  Clock,
  Check,
  Sparkles,
  LayoutGrid,
  List,
  Timer,
} from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { PriorityBadge, EnergyDots } from '@/components/priority-badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { tasks as seedTasks, projects } from '@/lib/seed-data';
import type { Task, TaskKanbanColumn } from '@/lib/types';

const columns: { id: TaskKanbanColumn; label: string; status: Task['status'][] }[] = [
  { id: 'backlog', label: 'Backlog', status: ['todo'] },
  { id: 'today', label: 'Today', status: ['todo'] },
  { id: 'doing', label: 'In progress', status: ['in_progress'] },
  { id: 'done', label: 'Done', status: ['done'] },
];

const projectColor: Record<string, string> = Object.fromEntries(
  projects.map((p) => [p.id, p.color])
);

export default function TasksPage() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [taskList, setTaskList] = useState<Task[]>(seedTasks);

  function toggleTask(id: string) {
    setTaskList((list) =>
      list.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'done' ? 'todo' : 'done' }
          : t
      )
    );
  }

  const completed = taskList.filter((t) => t.status === 'done').length;
  const completionRate = Math.round((completed / taskList.length) * 100);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        subtitle="Nova extracts tasks from conversations, emails, and meetings — then schedules them around your energy."
        action={
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-border/60 bg-card/40 p-0.5">
              <button
                onClick={() => setView('kanban')}
                className={cn('rounded-lg p-1.5 transition-colors', view === 'kanban' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={cn('rounded-lg p-1.5 transition-colors', view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground')}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button size="sm" className="gap-1.5 rounded-xl">
              <Plus className="h-3.5 w-3.5" /> New task
            </Button>
          </div>
        }
      />

      {/* Stats strip */}
      <FadeIn>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Open tasks', value: taskList.filter((t) => t.status !== 'done').length, accent: 'text-primary' },
            { label: 'Completed today', value: completed, accent: 'text-success' },
            { label: 'Completion rate', value: `${completionRate}%`, accent: 'text-foreground' },
            { label: 'Focus time logged', value: '4h 35m', accent: 'text-warning' },
          ].map((stat) => (
            <GlassCard key={stat.label} className="p-4">
              <p className="text-[11px] text-muted-foreground">{stat.label}</p>
              <p className={cn('mt-1 text-2xl font-semibold', stat.accent)}>{stat.value}</p>
            </GlassCard>
          ))}
        </div>
      </FadeIn>

      {view === 'kanban' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col, colIdx) => {
            const colTasks = taskList.filter((t) => col.status.includes(t.status)).slice(col.id === 'today' ? 0 : 2, col.id === 'today' ? 4 : 6);
            return (
              <FadeIn key={col.id} delay={colIdx * 0.05}>
                <GlassCard className="flex h-full min-h-[300px] flex-col p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">{col.label}</h3>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
                      {colTasks.length}
                    </span>
                  </div>
                  <StaggerGroup className="mt-3 flex-1 space-y-2.5">
                    {colTasks.map((task) => (
                      <StaggerItem key={task.id}>
                        <div className="group cursor-grab rounded-xl border border-border/50 bg-card/40 p-3 transition-all hover:border-primary/40 hover:glow-sm active:cursor-grabbing">
                          <div className="flex items-start gap-2">
                            <button
                              onClick={() => toggleTask(task.id)}
                              className={cn(
                                'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                                task.status === 'done'
                                  ? 'border-success bg-success/20'
                                  : 'border-border hover:border-primary'
                              )}
                            >
                              {task.status === 'done' && <Check className="h-2.5 w-2.5 text-success" />}
                            </button>
                            <div className="min-w-0 flex-1">
                              <p className={cn('text-xs font-medium leading-snug', task.status === 'done' && 'text-muted-foreground line-through')}>
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{task.description}</p>
                              )}
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <PriorityBadge priority={task.priority} />
                                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                  <Clock className="h-2.5 w-2.5" />
                                  {task.estimatedMinutes}m
                                </span>
                                <EnergyDots energy={task.energy} />
                              </div>
                              {task.subtasks.length > 0 && (
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>Subtasks</span>
                                    <span>
                                      {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length}
                                    </span>
                                  </div>
                                  <Progress
                                    value={(task.subtasks.filter((s) => s.done).length / task.subtasks.length) * 100}
                                    className="mt-1 h-1"
                                  />
                                </div>
                              )}
                              {task.tags.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {task.tags.map((tag) => (
                                    <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <GripVertical className="h-3.5 w-3.5 text-muted-foreground/30 opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerGroup>
                  <button className="mt-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground">
                    <Plus className="h-3 w-3" /> Add task
                  </button>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      ) : (
        <FadeIn>
          <GlassCard className="overflow-hidden p-0">
            <div className="divide-y divide-border/40">
              {taskList.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3.5 transition-colors hover:bg-card/30">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                      task.status === 'done' ? 'border-success bg-success/20' : 'border-border hover:border-primary'
                    )}
                  >
                    {task.status === 'done' && <Check className="h-3 w-3 text-success" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-sm font-medium', task.status === 'done' && 'text-muted-foreground line-through')}>
                      {task.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {task.estimatedMinutes}m
                      </span>
                      <EnergyDots energy={task.energy} />
                      {task.projectId && (
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ background: projectColor[task.projectId] }} />
                          {projects.find((p) => p.id === task.projectId)?.name}
                        </span>
                      )}
                      {task.tags.map((tag) => (
                        <span key={tag} className="rounded bg-muted px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <PriorityBadge priority={task.priority} />
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                    <Timer className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      )}
    </div>
  );
}
