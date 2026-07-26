'use client';

import { motion } from 'framer-motion';
import { Clock, Sparkles, Plane, Briefcase, HeartPulse, BookOpen, CheckCircle2 } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { cn } from '@/lib/utils';

type TimelineEntry = {
  time: string;
  title: string;
  desc: string;
  type: 'done' | 'now' | 'next' | 'ai';
  icon: typeof Clock;
};

const timeline: TimelineEntry[] = [
  { time: '6:30am', title: 'Morning run', desc: '5km · zone 2 · completed', type: 'done', icon: HeartPulse },
  { time: '8:00am', title: 'Breakfast + journal', desc: '10 min journaling session', type: 'done', icon: CheckCircle2 },
  { time: '9:00am', title: 'Deep Work — Strategy doc', desc: 'Nova blocked your peak energy window', type: 'ai', icon: Sparkles },
  { time: '11:00am', title: 'Engineering standup', desc: 'Zoom · 30 min', type: 'next', icon: Briefcase },
  { time: '12:30pm', title: 'Lunch + walk', desc: 'Nova scheduled a reset break', type: 'ai', icon: HeartPulse },
  { time: '2:00pm', title: 'Investor update draft', desc: 'Moved here for post-walk clarity', type: 'next', icon: Briefcase },
  { time: '3:30pm', title: 'Review 2 pull requests', desc: 'Nova extracted this from your chat', type: 'ai', icon: Sparkles },
  { time: '4:00pm', title: 'Design review', desc: 'Studio B · 1 hour', type: 'next', icon: Briefcase },
  { time: '8:00pm', title: 'Reading — Deep Work ch.4', desc: 'Low-energy wind-down task', type: 'next', icon: BookOpen },
];

const typeStyle = {
  done: 'border-border text-muted-foreground',
  now: 'border-primary text-primary',
  next: 'border-border text-foreground',
  ai: 'border-primary/40 text-primary',
};

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timeline" subtitle="Your day as a single flowing narrative — past, present, and what Nova has prepared next." />

      <FadeIn>
        <GlassCard className="p-6">
          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[27px] top-2 bottom-2 w-px bg-border" />

            <StaggerGroup className="space-y-1">
              {timeline.map((entry, i) => {
                const Icon = entry.icon;
                return (
                  <StaggerItem key={i}>
                    <div className="flex gap-4 py-2">
                      <div
                        className={cn(
                          'relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl border bg-card/60 backdrop-blur-sm',
                          typeStyle[entry.type]
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-1 items-start justify-between pt-1">
                        <div>
                          <p className="text-sm font-medium">{entry.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{entry.desc}</p>
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground">{entry.time}</span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
