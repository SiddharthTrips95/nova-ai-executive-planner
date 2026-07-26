'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pin, Search, FileText, Sparkles } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { notes as seedNotes } from '@/lib/seed-data';
import type { Note } from '@/lib/types';

export default function NotesPage() {
  const [notes] = useState<Note[]>(seedNotes);
  const [selected, setSelected] = useState<Note>(notes[0]);
  const [query, setQuery] = useState('');

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.tags.some((t) => t.includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notes"
        subtitle="Nova connects your notes to tasks, goals, and meetings — and surfaces them when relevant."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New note
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        {/* Note list */}
        <FadeIn>
          <GlassCard className="flex h-[calc(100vh-16rem)] flex-col p-0">
            <div className="border-b border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-3 py-2">
                <Search className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search notes…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto p-2">
              {filtered.map((note) => (
                <button
                  key={note.id}
                  onClick={() => setSelected(note)}
                  className={cn(
                    'w-full rounded-xl p-3 text-left transition-colors',
                    selected.id === note.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-card/40'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {note.pinned && <Pin className="h-3 w-3 text-primary" />}
                    <p className="flex-1 truncate text-sm font-medium">{note.title}</p>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">{note.excerpt}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                      <span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        {/* Note editor */}
        <FadeIn delay={0.1}>
          <GlassCard className="flex h-[calc(100vh-16rem)] flex-col p-0">
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <div>
                <h2 className="text-base font-semibold">{selected.title}</h2>
                <p className="text-[11px] text-muted-foreground">
                  Updated {new Date(selected.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] text-primary">
                  <Sparkles className="h-3 w-3" /> Nova linked 2 tasks
                </span>
              </div>
            </div>
            <div className="scrollbar-thin flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-sm leading-relaxed text-muted-foreground">{selected.body}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Nova's summary: this note connects to your "Ship Nova AI public beta" goal and the "Finalize Q3 product strategy doc" task. You referenced similar themes in your 1:1 with Maya on July 24.
                </p>
              </div>
            </div>
            <div className="border-t border-border/60 p-4">
              <div className="flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border/60 bg-card/40 px-2.5 py-1 text-[10px] text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </div>
  );
}
