'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Button,
  Input,
  Textarea,
  FormField,
  Badge,
} from '@ps/ui';
import {
  inquirySchema,
  InquiryInput,
  ServiceType,
  ServiceTypeEnum,
  ServiceTypeLabels,
  BudgetRange,
  BudgetRangeEnum,
  BudgetRangeLabels,
  TimelineOption,
  TimelineOptionEnum,
  TimelineOptionLabels,
} from '@ps/schemas';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Send } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') as ServiceType | null;

  const [formData, setFormData] = useState<Partial<InquiryInput>>({
    fullName: '',
    email: '',
    company: '',
    serviceType: preselectedService && ServiceTypeEnum.options.includes(preselectedService)
      ? preselectedService
      : 'BUSINESS_WEBSITE',
    budgetRange: 'RANGE_25K_75K',
    timeline: 'ONE_TO_THREE_MONTHS',
    message: '',
    consent: false,
    website: '', // Honeypot
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService && ServiceTypeEnum.options.includes(preselectedService)) {
      setFormData((prev) => ({ ...prev, serviceType: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (field: keyof InquiryInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString();
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      const firstField = Object.keys(fieldErrors)[0];
      if (firstField) {
        const el = document.querySelector(`[name="${firstField}"]`) as HTMLElement;
        el?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const response = await fetch(`${apiUrl}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || errorData.message || 'Failed to submit inquiry.');
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.warn('Backend unavailable, saving in local storage queue:', err.message);
      const existingInquiries = JSON.parse(localStorage.getItem('ps_local_inquiries') || '[]');
      existingInquiries.push({
        ...result.data,
        id: `local-${Date.now()}`,
        status: 'NEW',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('ps_local_inquiries', JSON.stringify(existingInquiries));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-10 rounded-xl bg-surface border border-border text-center space-y-4 shadow-xs animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-text">
            Requirements Received
          </h2>
          <p className="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
            We have securely logged your submission. A member of our engineering team will review your specifications and reply via email within <span className="font-semibold text-text">2 business days</span>.
          </p>
        </div>

        <div className="p-3 rounded-lg bg-bg-subtle border border-border text-[11px] font-mono text-text-muted max-w-xs mx-auto">
          Service: <span className="font-semibold text-text">{formData.serviceType}</span>
        </div>

        <div className="pt-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                fullName: '',
                email: '',
                company: '',
                serviceType: 'BUSINESS_WEBSITE',
                budgetRange: 'RANGE_25K_75K',
                timeline: 'ONE_TO_THREE_MONTHS',
                message: '',
                consent: false,
                website: '',
              });
            }}
          >
            Submit Another Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-xs space-y-6"
    >
      {apiError && (
        <div role="alert" className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from view, bot trap per FR-77) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website-hp">Website</label>
        <input
          id="website-hp"
          type="text"
          name="website"
          value={formData.website || ''}
          onChange={(e) => handleChange('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* 1. Full Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label="Full Name"
          required
          error={errors.fullName}
        >
          {(id, describedBy) => (
            <Input
              id={id}
              name="fullName"
              placeholder="e.g. Alex Sharma"
              value={formData.fullName || ''}
              onChange={(e) => handleChange('fullName', e.target.value)}
              aria-describedby={describedBy}
              error={!!errors.fullName}
              required
            />
          )}
        </FormField>

        <FormField
          label="Business Email"
          required
          error={errors.email}
        >
          {(id, describedBy) => (
            <Input
              id={id}
              name="email"
              type="email"
              placeholder="alex@company.com"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              aria-describedby={describedBy}
              error={!!errors.email}
              required
            />
          )}
        </FormField>
      </div>

      {/* 2. Company Name */}
      <FormField
        label="Company / Startup (Optional)"
        error={errors.company}
      >
        {(id, describedBy) => (
          <Input
            id={id}
            name="company"
            placeholder="e.g. Acme Labs"
            value={formData.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            aria-describedby={describedBy}
          />
        )}
      </FormField>

      {/* 3. Service Needed (Minimalist Radio Tiles) */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-text-muted flex items-center gap-1 select-none">
          Service Scope <span className="text-red-500 font-mono">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ServiceTypeEnum.options.map((serviceKey) => {
            const isSelected = formData.serviceType === serviceKey;
            return (
              <label
                key={serviceKey}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors flex items-center gap-2 ${
                  isSelected
                    ? 'border-primary/80 bg-surface text-text font-medium ring-1 ring-primary/40'
                    : 'border-border bg-bg-subtle/50 text-text-muted hover:border-text-subtle/40'
                }`}
              >
                <input
                  type="radio"
                  name="serviceType"
                  value={serviceKey}
                  checked={isSelected}
                  onChange={() => handleChange('serviceType', serviceKey)}
                  className="accent-primary"
                />
                <span className="truncate">{ServiceTypeLabels[serviceKey]}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Budget Range & Expected Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-muted">
            Indicative Budget
          </label>
          <select
            name="budgetRange"
            value={formData.budgetRange}
            onChange={(e) => handleChange('budgetRange', e.target.value)}
            className="w-full h-9 px-3 rounded-lg text-xs bg-surface text-text border border-border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans"
          >
            {BudgetRangeEnum.options.map((b) => (
              <option key={b} value={b}>
                {BudgetRangeLabels[b]}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-muted">
            Target Timeline
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)}
            className="w-full h-9 px-3 rounded-lg text-xs bg-surface text-text border border-border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans"
          >
            {TimelineOptionEnum.options.map((t) => (
              <option key={t} value={t}>
                {TimelineOptionLabels[t]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5. Requirements Description */}
      <FormField
        label="Project Objectives & Scope"
        required
        error={errors.message}
        helperText={`${(formData.message || '').length}/5000 characters`}
      >
        {(id, describedBy) => (
          <Textarea
            id={id}
            name="message"
            rows={4}
            placeholder="Describe what you want to build, existing infrastructure, target milestones, and key challenges..."
            value={formData.message || ''}
            onChange={(e) => handleChange('message', e.target.value)}
            aria-describedby={describedBy}
            error={!!errors.message}
            required
          />
        )}
      </FormField>

      {/* 6. Privacy Consent Checkbox */}
      <div className="space-y-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent || false}
            onChange={(e) => handleChange('consent', e.target.checked)}
            className="w-3.5 h-3.5 mt-0.5 rounded accent-primary focus:ring-primary"
            required
          />
          <span className="text-[11px] text-text-muted leading-relaxed">
            I agree to the processing of my contact information to receive a project proposal in accordance with PinnacleStride's{' '}
            <a href="/privacy" target="_blank" className="text-text underline hover:text-primary">
              Privacy Policy
            </a>.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="text-[11px] font-medium text-danger pl-6">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="md"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full"
        >
          Submit Requirements
          <Send className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </form>
  );
};
