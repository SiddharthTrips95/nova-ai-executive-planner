'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Plus, Check, Brain, Footprints, BookOpen, Smartphone, PenLine } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { habits as seedHabits } from '@/lib/seed-data';
import type { Habit } from '@/lib/types';

const iconMap: Record<string, typeof Brain> = { Brain, Footprints, BookOpen, Smartphone, PenLine };

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(seedHabits);

  function toggleToday(id: string) {
    setHabits((list) =>
      list.map((h) =>
        h.id === id
          ? {
              ...h,
              completedToday: !h.completedToday,
              streak: !h.completedToday ? h.streak + 1 : Math.max(0, h.streak - 1),
              history: [...h.history.slice(1), !h.completedToday],
            }
          : h
      )
    );
  }

  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedToday = habits.filter((h) => h.completedToday).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Habits"
        subtitle="Nova learns your patterns and nudges you before a streak breaks."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New habit
          </Button>
        }
      />

      <FadeIn>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <GlassCard className="p-4">
            <p className="text-[11px] text-muted-foreground">Total streak days</p>
            <p className="mt-1 flex items-baseline gap-1 text-2xl font-semibold">
              {totalStreak}
              <Flame className="h-4 w-4 text-warning" />
            </p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-[11px] text-muted-foreground">Done today</p>
            <p className="mt-1 text-2xl font-semibold text-success">{completedToday}/{habits.length}</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-[11px] text-muted-foreground">Best streak</p>
            <p className="mt-1 text-2xl font-semibold">{Math.max(...habits.map((h) => h.bestStreak))} days</p>
          </GlassCard>
          <GlassCard className="p-4">
            <p className="text-[11px] text-muted-foreground">Weekly average</p>
            <p className="mt-1 text-2xl font-semibold">
              {Math.round((habits.reduce((s, h) => s + h.weeklyRate, 0) / habits.length) * 100)}%
            </p>
          </GlassCard>
        </div>
      </FadeIn>

      <StaggerGroup className="space-y-3">
        {habits.map((habit) => {
          const Icon = iconMap[habit.icon] ?? Brain;
          return (
            <StaggerItem key={habit.id}>
              <GlassCard hover className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-xl',
                      habit.completedToday ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{habit.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {habit.streak} day streak · best {habit.bestStreak} · {Math.round(habit.weeklyRate * 100)}% this week
                    </p>
                  </div>
                  <div className="hidden items-center gap-1.5 md:flex">
                    {days.map((d, i) => (
                      <div key={d} className="flex flex-col items-center gap-1">
                        <span className="text-[9px] text-muted-foreground">{d}</span>
                        <button
                          onClick={() => toggleToday(habit.id)}
                          className={cn(
                            'h-7 w-7 rounded-lg border transition-all',
                            habit.history[i]
                              ? 'border-success/40 bg-success/15'
                              : 'border-border hover:border-primary/40'
                          )}
                        >
                          {habit.history[i] && <Check className="mx-auto h-3.5 w-3.5 text-success" />}
                        </button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => toggleToday(habit.id)}
                    size="sm"
                    variant={habit.completedToday ? 'default' : 'outline'}
                    className={cn(
                      'gap-1.5 rounded-xl',
                      habit.completedToday && 'bg-success/20 text-success hover:bg-success/30'
                    )}
                  >
                    {habit.completedToday ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Done
                      </>
                    ) : (
                      <>
                        <Flame className="h-3.5 w-3.5" /> Mark
                      </>
                    )}
                  </Button>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
