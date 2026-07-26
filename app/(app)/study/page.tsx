'use client';

import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Layers, Repeat, Zap, Plus, Sparkles, Clock } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const subjects = [
  { name: 'Machine Learning', progress: 68, color: 'hsl(199 89% 60%)', nextTopic: 'Transformers' },
  { name: 'Systems Design', progress: 82, color: 'hsl(152 62% 48%)', nextTopic: 'Sharding' },
  { name: 'Distributed Systems', progress: 45, color: 'hsl(280 70% 65%)', nextTopic: 'Consensus' },
  { name: 'Algorithms', progress: 90, color: 'hsl(38 92% 55%)', nextTopic: 'Graphs' },
];

const exams = [
  { name: 'ML Final', date: 'Aug 12', days: 17, color: 'text-destructive' },
  { name: 'Systems Midterm', date: 'Aug 20', days: 25, color: 'text-warning' },
  { name: 'Algorithms Quiz', date: 'Jul 30', days: 4, color: 'text-destructive' },
];

const flashcards = [
  { front: 'What is the time complexity of quicksort?', back: 'O(n log n) average, O(n²) worst', known: true },
  { front: 'Define eventual consistency', back: 'Replicas converge given no new updates', known: true },
  { front: 'What is a CAP theorem tradeoff?', back: 'Choose 2 of 3: consistency, availability, partition tolerance', known: false },
];

const revision = [
  { topic: 'Sorting algorithms', interval: '3 days', due: true },
  { topic: 'TCP vs UDP', interval: '1 week', due: true },
  { topic: 'Bayes theorem', interval: '2 weeks', due: false },
  { topic: 'MapReduce', interval: '1 month', due: false },
];

export default function StudyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Study Planner"
        subtitle="Nova builds adaptive roadmaps, schedules revision, and tracks what you actually know."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> Add subject
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Subjects */}
        <FadeIn className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Subjects & roadmaps</h3>
            </div>
            <StaggerGroup className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {subjects.map((s) => (
                <StaggerItem key={s.name}>
                  <div className="rounded-xl border border-border/50 bg-card/30 p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${s.color}20` }}>
                        <Layers className="h-4 w-4" style={{ color: s.color }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-[10px] text-muted-foreground">Next: {s.nextTopic}</p>
                      </div>
                      <span className="text-sm font-semibold">{s.progress}%</span>
                    </div>
                    <Progress value={s.progress} className="mt-3 h-1.5" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </GlassCard>
        </FadeIn>

        {/* Exam countdown */}
        <FadeIn delay={0.05}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Exam countdown</h3>
            </div>
            <div className="mt-4 space-y-3">
              {exams.map((e) => (
                <div key={e.name} className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 p-3">
                  <div>
                    <p className="text-xs font-medium">{e.name}</p>
                    <p className="text-[10px] text-muted-foreground">{e.date}</p>
                  </div>
                  <span className={cn('text-lg font-semibold', e.color)}>{e.days}d</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Revision planner */}
        <FadeIn delay={0.1}>
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <Repeat className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Spaced revision</h3>
            </div>
            <div className="mt-4 space-y-2">
              {revision.map((r) => (
                <div key={r.topic} className="flex items-center gap-3 rounded-lg border border-border/50 bg-card/30 p-2.5">
                  <span className={cn('h-2 w-2 rounded-full', r.due ? 'bg-primary' : 'bg-muted-foreground/40')} />
                  <span className="flex-1 text-xs font-medium">{r.topic}</span>
                  <span className="text-[10px] text-muted-foreground">{r.interval}</span>
                  {r.due && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[9px] font-medium text-primary">Due</span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Flashcards */}
        <FadeIn delay={0.15} className="lg:col-span-2">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Flashcards</h3>
              </div>
              <span className="text-xs text-muted-foreground">248 cards · 82% known</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {flashcards.map((c, i) => (
                <div key={i} className="rounded-xl border border-border/50 bg-card/30 p-4">
                  <p className="text-xs font-medium">{c.front}</p>
                  <p className="mt-2 text-[11px] text-muted-foreground">{c.back}</p>
                  <span
                    className={cn(
                      'mt-3 inline-block rounded-full px-2 py-0.5 text-[9px] font-medium',
                      c.known ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    )}
                  >
                    {c.known ? 'Known' : 'Learning'}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary/5 p-2 text-[11px] text-primary">
              <Sparkles className="h-3 w-3" /> Nova scheduled 12 cards for review tonight based on your forgetting curve.
            </p>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
