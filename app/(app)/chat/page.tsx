'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  Check,
  Plus,
  Calendar,
  Bell,
  Target,
  Brain,
  Volume2,
} from 'lucide-react';
import { GlassCard, FadeIn } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';
import { chatMessages as seed } from '@/lib/seed-data';

const actionIcon = {
  create_task: Plus,
  schedule: Calendar,
  reminder: Bell,
  goal_update: Target,
};

const suggestions = [
  'Plan my week around the product launch',
  'What should I focus on this morning?',
  'Reschedule my afternoon for a deep work block',
  'Summarize my unread emails',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(seed);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: `u${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply: ChatMessage = {
        id: `a${Date.now()}`,
        role: 'assistant',
        content:
          "I've looked at your calendar, energy curve, and open tasks. Here's what I recommend: protect 9–11am for the strategy doc (your peak window), move the investor email to 2pm after your walk, and review the two open PRs at 3:30pm before the design review. Want me to apply these changes?",
        createdAt: new Date().toISOString(),
        actions: [
          { type: 'schedule', label: 'Block 9–11am for strategy doc', applied: false },
          { type: 'create_task', label: 'Review 2 PRs at 3:30pm', applied: false },
          { type: 'reminder', label: 'Remind me to draft investor email at 2pm', applied: false },
        ],
      };
      setMessages((m) => [...m, reply]);
      setTyping(false);
    }, 1400);
  }

  function applyAction(msgId: string, idx: number) {
    setMessages((m) =>
      m.map((msg) =>
        msg.id === msgId && msg.actions
          ? {
              ...msg,
              actions: msg.actions.map((a, i) => (i === idx ? { ...a, applied: true } : a)),
            }
          : msg
      )
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4">
      <FadeIn className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Nova</h1>
          <p className="text-sm text-muted-foreground">Your AI Chief of Staff — ask anything, delegate everything.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl">
            <Volume2 className="h-3.5 w-3.5" /> Voice
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New chat
          </Button>
        </div>
      </FadeIn>

      <GlassCard className="flex flex-1 flex-col overflow-hidden p-0">
        {/* Messages */}
        <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
            >
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl',
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-primary to-primary/60 glow-sm'
                    : 'bg-card border border-border'
                )}
              >
                {msg.role === 'assistant' ? (
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <span className="text-xs font-semibold">AK</span>
                )}
              </div>
              <div className={cn('max-w-[75%] space-y-3', msg.role === 'user' && 'items-end')}>
                <div
                  className={cn(
                    'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'glass-subtle rounded-tl-sm'
                      : 'bg-primary text-primary-foreground rounded-tr-sm'
                  )}
                >
                  {msg.content}
                </div>

                {msg.actions && msg.actions.length > 0 && (
                  <div className="space-y-2">
                    {msg.actions.map((action, i) => {
                      const Icon = actionIcon[action.type];
                      return (
                        <button
                          key={i}
                          onClick={() => applyAction(msg.id, i)}
                          disabled={action.applied}
                          className={cn(
                            'flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-xs transition-all',
                            action.applied
                              ? 'border-success/30 bg-success/10 text-success'
                              : 'border-border/60 bg-card/40 hover:border-primary/40 hover:bg-primary/5'
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          <span className="flex-1 text-left font-medium">{action.label}</span>
                          {action.applied ? (
                            <Check className="h-3.5 w-3.5" />
                          ) : (
                            <span className="text-[10px] text-muted-foreground">Apply</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 glow-sm">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="glass-subtle flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestions */}
        {messages.length <= 3 && (
          <div className="border-t border-border/60 px-6 py-3">
            <p className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Try asking</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border/60 bg-card/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/60 p-4">
          <div className="flex items-end gap-2 rounded-2xl border border-border/60 bg-card/40 p-2 focus-within:border-primary/40">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl">
              <Paperclip className="h-4 w-4" />
            </Button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask Nova to plan, schedule, summarize, or decide…"
              rows={1}
              className="max-h-32 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0 rounded-xl">
              <Mic className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => send(input)}
              disabled={!input.trim()}
              size="icon"
              className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-primary to-primary/70"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Nova can schedule, create tasks, set reminders, and adjust your plan. Press Enter to send.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
