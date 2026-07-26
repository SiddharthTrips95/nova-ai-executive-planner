'use client';

import { motion } from 'framer-motion';
import {
  Briefcase,
  FileText,
  FolderKanban,
  TrendingUp,
  Plus,
  Star,
  MapPin,
  Code2,
  Sparkles,
} from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const jobs = [
  { company: 'Stripe', role: 'Senior PM', stage: 'Interview', date: 'Jul 28', color: 'hsl(280 60% 55%)' },
  { company: 'Linear', role: 'Head of Product', stage: 'Offer', date: 'Aug 2', color: 'hsl(199 89% 60%)' },
  { company: 'Vercel', role: 'Director PM', stage: 'Screening', date: 'Aug 5', color: 'hsl(0 0% 60%)' },
];

const leetcode = [
  { name: 'Two Sum', difficulty: 'Easy', solved: true },
  { name: 'Longest Substring Without Repeating', difficulty: 'Medium', solved: true },
  { name: 'Median of Two Sorted Arrays', difficulty: 'Hard', solved: false },
  { name: 'Regular Expression Matching', difficulty: 'Hard', solved: false },
];

const roadmap = [
  { title: 'Systems design fundamentals', progress: 80 },
  { title: 'Distributed systems', progress: 45 },
  { title: 'Product strategy frameworks', progress: 100 },
  { title: 'Negotiation & leadership', progress: 30 },
];

export default function CareerPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Career Planner"
        subtitle="Nova tracks opportunities, preps your interviews, and keeps your skills sharp."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> Add application
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Resume + portfolio */}
        <FadeIn>
          <GlassCard hover className="p-5">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Resume & portfolio</h3>
            </div>
            <div className="mt-4 space-y-2.5">
              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 p-3">
                <span className="text-xs font-medium">Resume — PM Lead</span>
                <Star className="h-3.5 w-3.5 text-warning" />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 p-3">
                <span className="text-xs font-medium">Portfolio — alexkim.dev</span>
                <span className="text-[10px] text-success">Live</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/50 bg-card/30 p-3">
                <span className="text-xs font-medium">LinkedIn profile</span>
                <span className="text-[10px] text-muted-foreground">Updated 3d ago</span>
              </div>
            </div>
            <p className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary/5 p-2 text-[11px] text-primary">
              <Sparkles className="h-3 w-3" /> Nova suggests adding a metrics bullet to your PM Lead resume.
            </p>
          </GlassCard>
        </FadeIn>

        {/* Job tracker */}
        <FadeIn delay={0.05} className="lg:col-span-2">
          <GlassCard hover className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">Job tracker</h3>
              </div>
              <span className="text-xs text-muted-foreground">3 active</span>
            </div>
            <StaggerGroup className="mt-4 space-y-2.5">
              {jobs.map((job) => (
                <StaggerItem key={job.company}>
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-card/30 p-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${job.color}20` }}>
                      <Briefcase className="h-4 w-4" style={{ color: job.color }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{job.role} · {job.company}</p>
                      <p className="text-[11px] text-muted-foreground">Next: {job.date}</p>
                    </div>
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-1 text-[10px] font-medium',
                        job.stage === 'Offer' && 'border-success/30 bg-success/10 text-success',
                        job.stage === 'Interview' && 'border-primary/30 bg-primary/10 text-primary',
                        job.stage === 'Screening' && 'border-border bg-muted text-muted-foreground'
                      )}
                    >
                      {job.stage}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </GlassCard>
        </FadeIn>

        {/* LeetCode */}
        <FadeIn delay={0.1}>
          <GlassCard hover className="p-5">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">LeetCode tracker</h3>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-semibold">142</span>
              <span className="text-xs text-muted-foreground">solved · 87 easy · 41 medium · 14 hard</span>
            </div>
            <div className="mt-4 space-y-2">
              {leetcode.map((p) => (
                <div key={p.name} className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      'h-2 w-2 rounded-full',
                      p.difficulty === 'Easy' ? 'bg-success' : p.difficulty === 'Medium' ? 'bg-warning' : 'bg-destructive'
                    )}
                  />
                  <span className={cn('flex-1 text-xs', p.solved ? 'text-muted-foreground line-through' : 'font-medium')}>
                    {p.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{p.difficulty}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Learning roadmap */}
        <FadeIn delay={0.15} className="lg:col-span-2">
          <GlassCard hover className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Learning roadmap</h3>
            </div>
            <div className="mt-4 space-y-4">
              {roadmap.map((r) => (
                <div key={r.title}>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">{r.title}</p>
                    <span className="text-[10px] text-muted-foreground">{r.progress}%</span>
                  </div>
                  <Progress value={r.progress} className="mt-1.5 h-1.5" />
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
