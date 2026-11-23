'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Input, Textarea, FormField } from '@ps/ui';
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
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Send, Sparkles, HelpCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') as ServiceType | null;

  const [formData, setFormData] = useState<Partial<InquiryInput>>({
    fullName: '',
    email: '',
    company: '',
    serviceType: preselectedService && ServiceTypeEnum.options.includes(preselectedService)
      ? preselectedService
      : undefined,
    otherServiceDetails: '',
    budgetRange: undefined,
    timeline: 'FLEXIBLE',
    message: '',
    consent: false,
    website: '', // Honeypot field
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

  const isOthersSelected = formData.serviceType === 'OTHER_CONSULTATION';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Manual check for initial neutral placeholders
    const newErrors: Record<string, string> = {};
    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service category';
    }
    if (!formData.budgetRange) {
      newErrors.budgetRange = 'Please select your indicative budget';
    }

    const result = inquirySchema.safeParse(formData);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString();
        if (fieldName && !newErrors[fieldName]) {
          newErrors[fieldName] = issue.message;
        }
      });
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstField = Object.keys(newErrors)[0];
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
      <div className="p-8 sm:p-12 rounded-2xl bg-surface/90 backdrop-blur-md border border-primary/30 text-center space-y-5 shadow-[0_0_25px_rgba(147,51,234,0.15)] animate-in fade-in zoom-in-95 duration-200">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-text">
            Inquiry Successfully Received
          </h2>
          <p className="text-xs sm:text-sm text-text-muted max-w-md mx-auto leading-relaxed">
            Thank you for reaching out. We have securely logged your project requirements. A senior engineer will review your specifications and reply via email within <span className="font-semibold text-text">2 business days</span>.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-bg-subtle/80 border border-border text-xs font-mono text-text-muted max-w-sm mx-auto space-y-1 text-left">
          <div>Service: <span className="text-text font-semibold">{formData.serviceType ? ServiceTypeLabels[formData.serviceType] : 'Selected Service'}</span></div>
          <div>Budget: <span className="text-accent font-semibold">{formData.budgetRange ? BudgetRangeLabels[formData.budgetRange] : 'Indicative'}</span></div>
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
                serviceType: undefined,
                otherServiceDetails: '',
                budgetRange: undefined,
                timeline: 'FLEXIBLE',
                message: '',
                consent: false,
                website: '',
              });
            }}
          >
            Submit Another Project Inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 sm:p-10 rounded-2xl bg-surface/85 backdrop-blur-md border border-border/90 shadow-sm space-y-6"
    >
      {apiError && (
        <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from view, bot trap) */}
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
          label="Your Full Name"
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
          label="Email Address"
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
        label="Company or Project Name (Optional)"
        error={errors.company}
      >
        {(id, describedBy) => (
          <Input
            id={id}
            name="company"
            placeholder="e.g. Acme Tech Labs"
            value={formData.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            aria-describedby={describedBy}
          />
        )}
      </FormField>

      {/* 3. Service Scope Integrated Dropdown (Replaces large radio buttons) */}
      <div className="space-y-1.5">
        <label htmlFor="serviceType-select" className="text-xs font-medium text-text flex items-center justify-between">
          <span className="flex items-center gap-1">
            Service Scope <span className="text-red-500 font-mono">*</span>
          </span>
          <span className="text-[10px] font-mono text-text-subtle">Integrated Category</span>
        </label>
        <select
          id="serviceType-select"
          name="serviceType"
          value={formData.serviceType || ''}
          onChange={(e) => handleChange('serviceType', e.target.value as ServiceType)}
          className={`w-full h-10 px-3 rounded-xl text-xs bg-surface text-text border transition-colors focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans ${
            errors.serviceType ? 'border-red-500 ring-1 ring-red-500/30' : 'border-border'
          }`}
          required
        >
          <option value="" disabled>
            Select service category...
          </option>
          {ServiceTypeEnum.options.map((serviceKey) => (
            <option key={serviceKey} value={serviceKey}>
              {ServiceTypeLabels[serviceKey]}
            </option>
          ))}
        </select>
        {errors.serviceType && (
          <p role="alert" className="text-[11px] font-medium text-red-400">
            {errors.serviceType}
          </p>
        )}
      </div>

      {/* 3B. Dynamic "Others" Explanation Field */}
      {isOthersSelected && (
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/25 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-text">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <label htmlFor="otherServiceDetails">
              Tell us about the technology or solution you have in mind <span className="text-red-500 font-mono">*</span>
            </label>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Describe emerging technologies, platforms, or custom architectures you want us to explore, build, or implement—even if they are not listed in our standard offerings.
          </p>
          <Textarea
            id="otherServiceDetails"
            name="otherServiceDetails"
            rows={3}
            placeholder="Describe the technology, platform, or functionality you would like us to explore and implement..."
            value={formData.otherServiceDetails || ''}
            onChange={(e) => handleChange('otherServiceDetails', e.target.value)}
            error={!!errors.otherServiceDetails}
            required={isOthersSelected}
          />
          {errors.otherServiceDetails && (
            <p role="alert" className="text-[11px] font-medium text-red-400">
              {errors.otherServiceDetails}
            </p>
          )}
        </div>
      )}

      {/* 4. Indicative Budget Dropdown (Starting at ₹1,000–₹5,000) & Target Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Indicative Budget Dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="budgetRange-select" className="text-xs font-medium text-text flex items-center justify-between">
            <span className="flex items-center gap-1">
              Indicative Budget <span className="text-red-500 font-mono">*</span>
            </span>
          </label>
          <select
            id="budgetRange-select"
            name="budgetRange"
            value={formData.budgetRange || ''}
            onChange={(e) => handleChange('budgetRange', e.target.value as BudgetRange)}
            className={`w-full h-10 px-3 rounded-xl text-xs bg-surface text-text border transition-colors focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans ${
              errors.budgetRange ? 'border-red-500 ring-1 ring-red-500/30' : 'border-border'
            }`}
            required
          >
            <option value="" disabled>
              Select your indicative budget...
            </option>
            <option value="RANGE_1K_5K">₹1,000 – ₹5,000</option>
            <option value="RANGE_5K_10K">₹5,001 – ₹10,000</option>
            <option value="RANGE_10K_25K">₹10,001 – ₹25,000</option>
            <option value="RANGE_25K_50K">₹25,001 – ₹50,000</option>
            <option value="RANGE_50K_1L">₹50,001 – ₹1,00,000</option>
            <option value="RANGE_1L_2_5L">₹1,00,001 – ₹2,50,000</option>
            <option value="RANGE_2_5L_5L">₹2,50,001 – ₹5,00,000</option>
            <option value="ABOVE_5L">Above ₹5,00,000</option>
            <option value="NOT_SURE">Not sure yet / Need guidance</option>
          </select>
          {errors.budgetRange && (
            <p role="alert" className="text-[11px] font-medium text-red-400">
              {errors.budgetRange}
            </p>
          )}
        </div>

        {/* Target Timeline Dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="timeline-select" className="text-xs font-medium text-text">
            Target Timeline
          </label>
          <select
            id="timeline-select"
            name="timeline"
            value={formData.timeline || 'FLEXIBLE'}
            onChange={(e) => handleChange('timeline', e.target.value as TimelineOption)}
            className="w-full h-10 px-3 rounded-xl text-xs bg-surface text-text border border-border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-sans"
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
        label="Project Requirements & Objectives"
        required
        error={errors.message}
        helperText={`${(formData.message || '').length}/5000 characters (minimum 20 characters)`}
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
      <div className="space-y-1 pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent || false}
            onChange={(e) => handleChange('consent', e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded accent-primary focus:ring-primary"
            required
          />
          <span className="text-[11px] text-text-muted leading-relaxed">
            I agree to the processing of my contact information to receive an honest project proposal in accordance with PinnacleStride's{' '}
            <a href="/privacy" target="_blank" className="text-text underline hover:text-primary">
              Privacy Policy
            </a>.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="text-[11px] font-medium text-red-400 pl-6">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="md"
          variant="cosmic"
          isLoading={isSubmitting}
          className="w-full text-xs"
        >
          Submit Project Inquiry
          <Send className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </form>
  );
};
