'use client';

import { motion } from 'framer-motion';
import { Plus, FolderKanban, Calendar, Users } from 'lucide-react';
import { GlassCard, FadeIn, PageHeader, StaggerGroup, StaggerItem } from '@/components/motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { projects } from '@/lib/seed-data';

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle="Nova tracks every project, decomposes it into tasks, and keeps them moving."
        action={
          <Button size="sm" className="gap-1.5 rounded-xl">
            <Plus className="h-3.5 w-3.5" /> New project
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.id}>
            <GlassCard hover className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${project.color}25`, color: project.color }}
                  >
                    <FolderKanban className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{project.name}</p>
                    <p className="text-[11px] text-muted-foreground">{project.taskCount} tasks</p>
                  </div>
                </div>
                <span className="text-lg font-semibold">{project.progress}%</span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{project.description}</p>

              <div className="mt-4">
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {project.dueAt
                    ? `Due ${new Date(project.dueAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : 'No deadline'}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> 3 members
                </span>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
