'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Topbar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  const greeting = (() => {
    const h = now.getHours();
    if (h < 5) return 'Burning the midnight oil';
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 glass px-6">
      <div className="flex flex-col">
        <span className="text-[11px] text-muted-foreground">{greeting}, Alex</span>
        <span className="text-sm font-medium">
          {now.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-3 py-1.5 md:flex">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search anything…"
            className="w-44 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘K</kbd>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2.5 py-1"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success" />
          <span className="text-[11px] font-medium text-success">Nova active</span>
        </motion.div>

        <Button variant="ghost" size="icon" className="relative rounded-xl">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <Button
          size="sm"
          className="gap-1.5 rounded-xl bg-gradient-to-r from-primary to-primary/70 text-primary-foreground glow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask Nova
        </Button>
      </div>
    </header>
  );
}
