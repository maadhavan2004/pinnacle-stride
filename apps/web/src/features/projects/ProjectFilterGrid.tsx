'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@ps/ui';
import { Project } from '@ps/schemas';
import { ArrowRight, ExternalLink, Github, Terminal, Sparkles, Layers, Cpu } from 'lucide-react';

interface Props {
  projects: Project[];
}

const categories: { label: string; value: string }[] = [
  { label: 'All Work', value: 'ALL' },
  { label: 'GenAI & RAG', value: 'GENAI_AGENTIC' },
  { label: 'Full-Stack Platforms', value: 'FULL_STACK_APP' },
  { label: 'Web Applications', value: 'BUSINESS_WEBSITE' },
  { label: 'Infrastructure', value: 'EXPERIMENTAL' },
];

export const ProjectFilterGrid: React.FC<Props> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Filter out any placeholder card named 'internal-knowledge-rag-assistant' if treated as internal benchmark placeholder
  const activeProjects = projects.filter((p) => p.slug !== 'internal-knowledge-rag-assistant');

  const filteredProjects =
    selectedCategory === 'ALL'
      ? activeProjects
      : activeProjects.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'GENAI_AGENTIC':
        return <Sparkles className="w-3.5 h-3.5 text-accent" />;
      case 'FULL_STACK_APP':
        return <Layers className="w-3.5 h-3.5 text-accent" />;
      case 'BUSINESS_WEBSITE':
        return <Terminal className="w-3.5 h-3.5 text-accent" />;
      default:
        return <Cpu className="w-3.5 h-3.5 text-accent" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'GENAI_AGENTIC':
        return 'GenAI & RAG Architecture';
      case 'FULL_STACK_APP':
        return 'Full-Stack Application';
      case 'BUSINESS_WEBSITE':
        return 'Commercial Web Platform';
      case 'EXPERIMENTAL':
        return 'Observability & Infrastructure';
      default:
        return category.replace('_', ' ');
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Category Filter Tabs - Responsive horizontal scrolling on small mobile */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 sm:pb-0 px-2 sm:px-0">
        <div
          className="flex items-center gap-1.5 p-1 rounded-xl border border-border bg-surface/90 backdrop-blur-md shadow-xs text-xs font-mono shrink-0"
          role="tablist"
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'bg-primary text-white shadow-[0_0_12px_rgba(147,51,234,0.35)]'
                    : 'text-text-muted hover:text-text hover:bg-surface-hover'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Projects: Mobile is single-column with clean spacing; Desktop preserves 2/3 cols */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.slug}
            className="flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-surface/85 backdrop-blur-md border border-border hover:border-primary/40 transition-all duration-200 group"
          >
            <div className="space-y-3.5">
              {/* Category Pill with Icon (NO green "Internal Project" badge) */}
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono text-accent bg-primary/10 border border-primary/25">
                  {getCategoryIcon(project.category)}
                  <span>{getCategoryLabel(project.category)}</span>
                </div>
                <span className="text-[10px] font-mono text-text-subtle">
                  Engineering Spec
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors leading-snug">
                {project.title}
              </h3>

              {/* Summary */}
              <p className="text-xs text-text-muted leading-relaxed line-clamp-3">
                {project.summary}
              </p>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle/80 border border-border text-text-subtle"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-border flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-xs font-medium text-text group-hover:text-primary transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </Link>

              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Repository"
                    className="p-1.5 rounded-lg text-text-subtle hover:text-text hover:bg-surface-hover border border-border transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-1.5 rounded-lg text-text-subtle hover:text-text hover:bg-surface-hover border border-border transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
