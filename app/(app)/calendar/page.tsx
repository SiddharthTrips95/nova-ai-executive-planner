'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Cloud,
  CloudRain,
  Sun,
} from 'lucide-react';
import { GlassCard, FadeIn, PageHeader } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { todayEvents } from '@/lib/seed-data';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7am - 8pm

type WeekEvent = { title: string; day: number; start: number; duration: number; type: string; ai?: boolean };

const weekEvents: Record<string, WeekEvent> = {
  e1: { title: 'Deep Work — Strategy', day: 0, start: 9, duration: 2, type: 'deep_work', ai: true },
  e2: { title: 'Standup', day: 0, start: 11, duration: 0.5, type: 'meeting' },
  e3: { title: 'Design review', day: 0, start: 15.5, duration: 1, type: 'meeting' },
  e4: { title: '1:1 with Maya', day: 1, start: 10, duration: 0.5, type: 'meeting' },
  e5: { title: 'Investor call', day: 1, start: 14, duration: 1, type: 'meeting' },
  e6: { title: 'Deep Work — PRs', day: 2, start: 9, duration: 1.5, type: 'deep_work', ai: true },
  e7: { title: 'Long run', day: 2, start: 7, duration: 1, type: 'personal' },
  e8: { title: 'Roadmap workshop', day: 3, start: 13, duration: 2, type: 'meeting' },
  e9: { title: 'Deep Work — slides', day: 4, start: 9, duration: 2, type: 'deep_work', ai: true },
  e10: { title: 'Marathon training', day: 5, start: 8, duration: 1.5, type: 'personal' },
  e11: { title: 'Reading', day: 6, start: 10, duration: 1, type: 'personal' },
};

const eventColors: Record<string, string> = {
  deep_work: 'bg-primary/25 border-primary/50 text-primary-foreground',
  meeting: 'bg-chart-4/25 border-chart-4/50 text-foreground',
  personal: 'bg-success/25 border-success/50 text-foreground',
  break: 'bg-muted border-border text-foreground',
};

const weather = [
  { day: 'Mon', icon: Sun, temp: 24 },
  { day: 'Tue', icon: Cloud, temp: 21 },
  { day: 'Wed', icon: CloudRain, temp: 18 },
  { day: 'Thu', icon: Cloud, temp: 20 },
  { day: 'Fri', icon: Sun, temp: 26 },
  { day: 'Sat', icon: Sun, temp: 27 },
  { day: 'Sun', icon: Cloud, temp: 22 },
];

export default function CalendarPage() {
  const [view, setView] = useState<'week' | 'day' | 'month'>('week');
  const events = Object.values(weekEvents);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        subtitle="Nova optimizes your schedule around energy, priorities, and deadlines."
        action={
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-border/60 bg-card/40 p-0.5">
              {(['day', 'week', 'month'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                    view === v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button size="sm" className="gap-1.5 rounded-xl">
              <Plus className="h-3.5 w-3.5" /> Event
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* AI suggestions sidebar */}
        <FadeIn className="lg:col-span-1">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold">Nova suggestions</h3>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { title: 'Batch your meetings', desc: 'Move 3 scattered calls to Thursday afternoon to protect deep work.' },
                { title: 'Add travel time', desc: '15-min buffer before the 3:30 design review across campus.' },
                { title: 'Energy mismatch', desc: 'Reading is low-energy but scheduled at your 10am peak. Shift to 8pm.' },
              ].map((s) => (
                <div key={s.title} className="rounded-xl border border-border/50 bg-card/30 p-3">
                  <p className="text-xs font-medium">{s.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{s.desc}</p>
                  <button className="mt-2 text-[10px] font-medium text-primary hover:underline">
                    Apply →
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Calendar grid */}
        <FadeIn delay={0.1} className="lg:col-span-3">
          <GlassCard className="overflow-hidden p-0">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-semibold">July 20 – 26, 2026</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="text-xs">Today</Button>
            </div>

            {/* Weather strip */}
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-2">
              {weather.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.day} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    <span>{w.day}</span>
                    <span className="font-medium text-foreground">{w.temp}°</span>
                  </div>
                );
              })}
            </div>

            {/* Week grid */}
            <div className="grid grid-cols-[40px_repeat(7,1fr)]">
              {/* Day headers */}
              <div className="border-b border-border/60" />
              {weekDays.map((d, i) => (
                <div
                  key={d}
                  className={cn(
                    'border-b border-l border-border/60 px-2 py-2 text-center',
                    i === 0 && 'bg-primary/5'
                  )}
                >
                  <p className="text-[10px] uppercase text-muted-foreground">{d}</p>
                  <p className={cn('text-sm font-semibold', i === 0 && 'text-primary')}>{20 + i}</p>
                </div>
              ))}

              {/* Hour rows */}
              {hours.map((hour) => (
                <div key={hour} className="contents">
                  <div className="border-b border-border/60 px-1 py-1 text-right text-[10px] text-muted-foreground">
                    {hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'p' : 'a'}
                  </div>
                  {weekDays.map((_, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="relative border-b border-l border-border/60"
                      style={{ height: 48 }}
                    >
                      {events
                        .filter((e) => e.day === dayIdx && Math.floor(e.start) === hour)
                        .map((e, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * i }}
                            className={cn(
                              'absolute inset-x-1 rounded-lg border px-2 py-1 text-[10px] font-medium backdrop-blur-sm',
                              eventColors[e.type]
                            )}
                            style={{
                              top: `${(e.start % 1) * 48}px`,
                              height: `${e.duration * 48 - 4}px`,
                            }}
                          >
                            <div className="flex items-center gap-1">
                              {e.ai && <Sparkles className="h-2.5 w-2.5 shrink-0 text-primary" />}
                              <span className="truncate">{e.title}</span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
