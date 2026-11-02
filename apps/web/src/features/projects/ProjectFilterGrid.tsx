'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@ps/ui';
import { Project } from '@ps/schemas';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

interface Props {
  projects: Project[];
}

const categories: { label: string; value: string }[] = [
  { label: 'All Projects', value: 'ALL' },
  { label: 'GenAI & Agentic AI', value: 'GENAI_AGENTIC' },
  { label: 'Full-Stack Apps', value: 'FULL_STACK_APP' },
  { label: 'Business Websites', value: 'BUSINESS_WEBSITE' },
  { label: 'Experimental', value: 'EXPERIMENTAL' },
];

export const ProjectFilterGrid: React.FC<Props> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-lg border border-border bg-surface w-fit mx-auto text-xs font-mono" role="tablist">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                isActive
                  ? 'bg-text text-bg font-medium shadow-xs'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <Badge
                  variant={
                    project.projectType === 'INTERNAL_PORTFOLIO'
                      ? 'portfolio'
                      : project.projectType === 'INDEPENDENT_PRODUCT'
                      ? 'product'
                      : 'client'
                  }
                  size="sm"
                >
                  {project.projectType === 'INTERNAL_PORTFOLIO'
                    ? 'Internal Project'
                    : project.projectType === 'INDEPENDENT_PRODUCT'
                    ? 'Product'
                    : 'Client Work'}
                </Badge>
                <span className="text-[10px] font-mono text-text-subtle">
                  {project.category.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-text mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-text-muted leading-relaxed mb-4">
                {project.summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1 mb-5">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-subtle border border-border text-text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-xs font-medium text-text hover:text-primary transition-colors"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>

              <div className="flex items-center gap-1.5">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Repository"
                    className="p-1.5 rounded text-text-subtle hover:text-text transition-colors"
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
                    className="p-1.5 rounded text-text-subtle hover:text-text transition-colors"
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
