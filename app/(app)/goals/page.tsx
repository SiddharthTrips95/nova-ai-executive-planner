'use client';

import { motion } from 'framer-motion';
import { Target, Plus, Check, Circle, AlertTriangle, TrendingUp } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { goals } from '@/lib/seed-data';

const statusConfig = {
  on_track: { label: 'On track', className: 'text-success bg-success/10 border-success/30', icon: TrendingUp },
  at_risk: { label: 'At risk', className: 'text-warning bg-warning/10 border-warning/30', icon: AlertTriangle },
  behind: { label: 'Behind', className: 'text-destructive bg-destructive/10 border-destructive/30', icon: AlertTriangle },
};

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Goals"
        subtitle="Nova breaks ambitious goals into milestones and schedules the work to get there."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New goal
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {goals.map((goal) => {
          const Status = statusConfig[goal.status];
          const StatusIcon = Status.icon;
          const completedMilestones = goal.milestones.filter((m) => m.done).length;
          return (
            <StaggerItem key={goal.id}>
              <GlassCard hover className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{goal.title}</p>
                      <p className="text-xs text-muted-foreground">{goal.category}</p>
                    </div>
                  </div>
                  <span className={cn('flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium', Status.className)}>
                    <StatusIcon className="h-3 w-3" />
                    {Status.label}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{completedMilestones}/{goal.milestones.length} milestones</span>
                    <span className="font-semibold">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="mt-1.5 h-2" />
                  <p className="mt-1.5 text-[10px] text-muted-foreground">
                    Target {new Date(goal.targetDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {goal.milestones.map((m) => (
                    <div key={m.id} className="flex items-center gap-2.5">
                      {m.done ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success/20">
                          <Check className="h-2.5 w-2.5 text-success" />
                        </div>
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/40" />
                      )}
                      <span className={cn('text-xs', m.done ? 'text-muted-foreground line-through' : 'font-medium')}>
                        {m.title}
                      </span>
                      <span className="ml-auto text-[10px] text-muted-foreground">
                        {new Date(m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </div>
  );
}
