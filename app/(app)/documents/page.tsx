'use client';

import { motion } from 'framer-motion';
import { FileText, Plus, Search, MoreHorizontal, File, FileSpreadsheet, FileImage, Sparkles } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';

const docs = [
  { name: 'Q3 Product Strategy', type: 'doc', size: '2.4 MB', updated: '2h ago', linked: true },
  { name: 'Investor Update — July', type: 'doc', size: '480 KB', updated: '1d ago', linked: true },
  { name: 'Brand Guidelines v2', type: 'image', size: '8.1 MB', updated: '3d ago', linked: false },
  { name: 'Financial Model 2026', type: 'sheet', size: '1.2 MB', updated: '5d ago', linked: true },
  { name: 'Meeting Notes — Leadership', type: 'doc', size: '120 KB', updated: '1w ago', linked: false },
  { name: 'Customer Research Synthesis', type: 'doc', size: '3.8 MB', updated: '2w ago', linked: true },
  { name: 'Org Chart', type: 'image', size: '640 KB', updated: '3w ago', linked: false },
];

const iconMap = {
  doc: FileText,
  sheet: FileSpreadsheet,
  image: FileImage,
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        subtitle="Nova links your documents to the tasks and goals they relate to."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> Upload
          </Button>
        }
      />

      <FadeIn>
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-3 py-2 max-w-md">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search documents by name or content…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </FadeIn>

      <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {docs.map((doc) => {
          const Icon = iconMap[doc.type as keyof typeof iconMap];
          return (
            <StaggerItem key={doc.name}>
              <GlassCard hover className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{doc.name}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{doc.size} · {doc.updated}</p>
                    {doc.linked && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-medium text-primary">
                        <Sparkles className="h-2.5 w-2.5" /> Linked to a goal
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg">
                    <MoreHorizontal className="h-3.5 w-3.5" />
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
