'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Badge } from '@ps/ui';
import { Project, ProjectCategory } from '@ps/schemas';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

interface Props {
  projects: Project[];
}

const categories: { label: string; value: string }[] = [
  { label: 'All Projects', value: 'ALL' },
  { label: 'GenAI & Agentic AI', value: 'GENAI_AGENTIC' },
  { label: 'Full-Stack Apps', value: 'FULL_STACK_APP' },
  { label: 'Business Websites', value: 'BUSINESS_WEBSITE' },
  { label: 'Experimental & Prototypes', value: 'EXPERIMENTAL' },
];

export const ProjectFilterGrid: React.FC<Props> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects =
    selectedCategory === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2" role="tablist">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[40px] ${
                isActive
                  ? 'bg-[#1D4ED8] dark:bg-[#3B82F6] text-white shadow-sm'
                  : 'bg-white dark:bg-[#131F42] border border-[#D8E0EE] dark:border-[#22305A] text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#0A1128] dark:hover:text-[#F4F7FB]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.slug} className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <Badge
                  variant={
                    project.projectType === 'INTERNAL_PORTFOLIO'
                      ? 'portfolio'
                      : project.projectType === 'INDEPENDENT_PRODUCT'
                      ? 'product'
                      : 'client'
                  }
                >
                  {project.projectType === 'INTERNAL_PORTFOLIO'
                    ? 'Internal Project'
                    : project.projectType === 'INDEPENDENT_PRODUCT'
                    ? 'Product'
                    : 'Client Work'}
                </Badge>
                <span className="text-[11px] font-mono text-[#4A5878] dark:text-[#A9B6D3]">
                  {project.category.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#0A1128] dark:text-[#F4F7FB] mb-3">
                {project.title}
              </h3>

              <p className="text-sm text-[#4A5878] dark:text-[#A9B6D3] leading-relaxed mb-6">
                {project.summary}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-[#D8E0EE] dark:border-[#22305A] text-[#4A5878] dark:text-[#A9B6D3]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8E0EE] dark:border-[#22305A] flex items-center justify-between">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-sm font-semibold text-[#1D4ED8] dark:text-[#3B82F6] hover:underline"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Repository"
                    className="p-1.5 rounded text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#0A1128] dark:hover:text-[#F4F7FB]"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-1.5 rounded text-[#4A5878] dark:text-[#A9B6D3] hover:text-[#0A1128] dark:hover:text-[#F4F7FB]"
                  >
                    <ExternalLink className="w-4 h-4" />
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
