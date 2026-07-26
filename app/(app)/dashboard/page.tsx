'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Brain,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  Check,
  Clock,
  Calendar as CalendarIcon,
  Footprints,
  BookOpen,
  PenLine,
  Flame,
  Circle,
  CheckCircle2,
} from 'lucide-react';
import { GlassCard, FadeIn, StaggerGroup, StaggerItem, PageHeader } from '@/components/motion';
import { PriorityBadge, EnergyDots } from '@/components/priority-badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  tasks,
  goals,
  habits,
  todayEvents,
  recommendations,
  energyCurve,
} from '@/lib/seed-data';
import { cn } from '@/lib/utils';

const habitIconMap: Record<string, typeof Brain> = {
  Brain,
  Footprints,
  BookOpen,
  Smartphone: Brain,
  PenLine,
};

const eventTypeColor: Record<string, string> = {
  deep_work: 'bg-primary/20 border-primary/40',
  meeting: 'bg-chart-4/20 border-chart-4/40',
  personal: 'bg-success/20 border-success/40',
  travel: 'bg-warning/20 border-warning/40',
  break: 'bg-muted border-border',
};

export default function DashboardPage() {
  const todaysTasks = tasks.filter((t) => t.status !== 'done').slice(0, 4);
  const energyNow = energyCurve.find((e) => e.hour === new Date().getHours()) ?? energyCurve[8];
  const completedToday = tasks.filter((t) => t.status === 'done').length;
  const totalToday = tasks.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Today"
        subtitle="Nova has prepared your day. 3 deep work blocks protected, 2 meetings, 1 wind-down."
        action={
          <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Re-plan my day
          </Button>
        }
      />

      {/* Top row: Energy + Today's focus */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FadeIn delay={0.05}>
          <GlassCard hover className="h-full p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Energy Score</p>
                  <p className="text-lg font-semibold">{energyNow.value}%</p>
                </div>
              </div>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success">
                Peak window: 9–11am
              </span>
            </div>

            <div className="mt-4 flex h-16 items-end gap-1">
              {energyCurve.map((p) => (
                <div
                  key={p.hour}
                  className={cn(
                    'flex-1 rounded-t transition-all',
                    p.hour === new Date().getHours()
                      ? 'bg-gradient-to-t from-primary to-primary/60'
                      : 'bg-muted-foreground/20'
                  )}
                  style={{ height: `${p.value}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">6am → 9pm energy curve</p>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.1} className="lg:col-span-2">
          <GlassCard hover className="h-full p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Today's Focus</h3>
              </div>
              <span className="text-xs text-muted-foreground">
                {completedToday}/{totalToday} done
              </span>
            </div>

            <StaggerGroup className="mt-4 space-y-2">
              {todaysTasks.map((task) => (
                <StaggerItem key={task.id}>
                  <div className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-3 transition-colors hover:border-primary/30">
                    <button
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                        task.status === 'done'
                          ? 'border-success bg-success/20'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {task.status === 'done' && <Check className="h-3 w-3 text-success" />}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{task.title}</p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.estimatedMinutes}m
                        </span>
                        <EnergyDots energy={task.energy} />
                        {task.dueAt && (
                          <span className="text-warning">
                            due {new Date(task.dueAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                          </span>
                        )}
                      </div>
                    </div>
                    <PriorityBadge priority={task.priority} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </GlassCard>
        </FadeIn>
      </div>

      {/* AI Recommendations */}
      <FadeIn delay={0.15}>
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 glow-sm">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Nova's recommendations</h3>
                <p className="text-xs text-muted-foreground">Based on your energy, goals, and patterns this week</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-1 text-xs">
              Apply all <ArrowRight className="h-3 w-3" />
            </Button>
          </div>

          <StaggerGroup className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {recommendations.map((rec) => (
              <StaggerItem key={rec.id}>
                <div className="flex gap-3 rounded-xl border border-border/50 bg-card/30 p-3.5">
                  <div
                    className={cn(
                      'mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                      rec.impact === 'high'
                        ? 'bg-primary/15 text-primary'
                        : rec.impact === 'medium'
                        ? 'bg-warning/15 text-warning'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{rec.rationale}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </GlassCard>
      </FadeIn>

      {/* Bottom row: Schedule + Goals + Habits */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FadeIn delay={0.2}>
          <GlassCard hover className="h-full p-5">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Today's schedule</h3>
            </div>
            <div className="mt-4 space-y-2.5">
              {todayEvents.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className="w-12 shrink-0 text-right text-[11px] text-muted-foreground">
                    {new Date(event.start).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                  </div>
                  <div
                    className={cn(
                      'flex-1 rounded-lg border-l-2 px-3 py-1.5',
                      eventTypeColor[event.type]
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-medium">{event.title}</p>
                      {event.aiSuggested && (
                        <span className="flex items-center gap-1 text-[9px] text-primary">
                          <Sparkles className="h-2.5 w-2.5" /> Nova
                        </span>
                      )}
                    </div>
                    {event.location && (
                      <p className="text-[10px] text-muted-foreground">{event.location}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.25}>
          <GlassCard hover className="h-full p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Goals progress</h3>
              </div>
            </div>
            <div className="mt-4 space-y-4">
              {goals.slice(0, 4).map((goal) => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">{goal.title}</p>
                    <span
                      className={cn(
                        'text-[10px] font-medium',
                        goal.status === 'on_track'
                          ? 'text-success'
                          : goal.status === 'at_risk'
                          ? 'text-warning'
                          : 'text-destructive'
                      )}
                    >
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress
                    value={goal.progress}
                    className="mt-1.5 h-1.5"
                  />
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Target {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.3}>
          <GlassCard hover className="h-full p-5">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Habits</h3>
            </div>
            <div className="mt-4 space-y-3">
              {habits.map((habit) => {
                const Icon = habitIconMap[habit.icon] ?? Circle;
                return (
                  <div key={habit.id} className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg',
                        habit.completedToday ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium">{habit.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {habit.streak} day streak · {Math.round(habit.weeklyRate * 100)}% this week
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      {habit.history.map((h, i) => (
                        <span
                          key={i}
                          className={cn(
                            'h-4 w-1 rounded-full',
                            h ? 'bg-success' : 'bg-muted-foreground/20'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
