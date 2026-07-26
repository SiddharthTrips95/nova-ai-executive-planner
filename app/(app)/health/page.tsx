'use client';

import { motion } from 'framer-motion';
import {
  HeartPulse,
  Activity,
  Moon,
  Footprints,
  Flame,
  Dumbbell,
  Apple,
  Droplets,
  Sparkles,
  Plus,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const weekActivity = [
  { day: 'Mon', steps: 8200, sleep: 7.5 },
  { day: 'Tue', steps: 11200, sleep: 6.8 },
  { day: 'Wed', steps: 5400, sleep: 8.1 },
  { day: 'Thu', steps: 9800, sleep: 7.2 },
  { day: 'Fri', steps: 12500, sleep: 6.5 },
  { day: 'Sat', steps: 15800, sleep: 8.4 },
  { day: 'Sun', steps: 4200, sleep: 7.8 },
];

const vitals = [
  { label: 'Resting HR', value: '52 bpm', icon: Activity, color: 'text-destructive' },
  { label: 'Sleep avg', value: '7.5h', icon: Moon, color: 'text-primary' },
  { label: 'Steps today', value: '8,432', icon: Footprints, color: 'text-success' },
  { label: 'Active min', value: '52', icon: Flame, color: 'text-warning' },
];

const goals = [
  { label: 'Weekly steps', value: 67000, target: 70000, unit: 'steps', icon: Footprints },
  { label: 'Sleep consistency', value: 80, target: 100, unit: '%', icon: Moon },
  { label: 'Workouts', value: 3, target: 5, unit: 'this week', icon: Dumbbell },
  { label: 'Water', value: 1.8, target: 2.5, unit: 'L', icon: Droplets },
];

export default function HealthPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Health Planner"
        subtitle="Nova balances your ambition with recovery — energy-aware scheduling keeps you sustainable."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> Log workout
          </Button>
        }
      />

      {/* Vitals */}
      <StaggerGroup className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {vitals.map((v) => {
          const Icon = v.icon;
          return (
            <StaggerItem key={v.label}>
              <GlassCard hover className="p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                  <Icon className={cn('h-4 w-4', v.color)} />
                </div>
                <p className="mt-3 text-2xl font-semibold">{v.value}</p>
                <p className="text-[11px] text-muted-foreground">{v.label}</p>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Activity chart */}
        <FadeIn className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Steps & sleep this week</h3>
            </div>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekActivity}>
                  <defs>
                    <linearGradient id="stepsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: 12, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="steps" stroke="hsl(var(--chart-2))" strokeWidth={2} fill="url(#stepsGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Goals */}
        <FadeIn delay={0.05}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Health goals</h3>
            </div>
            <div className="mt-4 space-y-4">
              {goals.map((g) => {
                const Icon = g.icon;
                return (
                  <div key={g.label}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <p className="flex-1 text-xs font-medium">{g.label}</p>
                      <span className="text-[10px] text-muted-foreground">
                        {g.value}/{g.target} {g.unit}
                      </span>
                    </div>
                    <Progress value={(g.value / g.target) * 100} className="mt-1.5 h-1.5" />
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Nova insight */}
        <FadeIn delay={0.1} className="lg:col-span-3">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Nova's health insight</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your sleep dropped to 6.5h on Friday and your Saturday run pace was 8% slower than usual — a sign of accumulated fatigue. I've moved tomorrow's hard workout to a recovery walk and shifted your Monday deep work to 10am (your energy will rebound by then). I also pre-ordered your usual post-workout meal for delivery at 7:30pm.
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
