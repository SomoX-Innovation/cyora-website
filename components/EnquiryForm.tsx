'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { fieldErrors, schemaFor, type FormType } from '@/lib/enquiry';
import { site } from '@/lib/site';
import { Alert, Check } from './Icons';
import clsx from './clsx';

export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'segmented';
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  options?: readonly { value: string; label: string }[];
  full?: boolean;
  defaultValue?: string;
};

type Props = {
  formType: FormType;
  fields: FieldDef[];
  submitLabel: string;
  ariaLabel: string;
  successNoun: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function EnquiryForm({ formType, fields, submitLabel, ariaLabel, successNoun }: Props) {
  const initial = () => Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ''])) as Record<string, string>;
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const id = (n: string) => `${formType}-${n}`;

  useEffect(() => {
    if (status === 'success') doneRef.current?.focus();
  }, [status]);

  const update = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => { const n = { ...e }; delete n[name]; return n; });
  };

  const focusFirstError = (errs: Record<string, string>) => {
    const first = [...fields.map((f) => f.name), 'consent'].find((n) => errs[n]);
    if (first) requestAnimationFrame(() => document.getElementById(id(first))?.focus());
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;
    setMessage('');

    const payload = { formType, ...values, consent };
    const check = schemaFor[formType].safeParse(payload);
    if (!check.success) {
      const errs = fieldErrors(check.error);
      setErrors(errs);
      setStatus('error');
      setMessage('Please check the highlighted fields and try again.');
      focusFirstError(errs);
      return;
    }

    const token = formRef.current ? new FormData(formRef.current).get('cf-turnstile-response') : null;
    setErrors({});
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, website: honeypot, startedAt: startedAt.current, turnstileToken: token }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, string>; message?: string };
      if (res.ok && data.ok) {
        setStatus('success');
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      }
      setStatus('error');
      setMessage(data.message || 'Please check the highlighted fields and try again.');
    } catch {
      setStatus('error');
      setMessage(`Sorry — your ${successNoun} could not be sent. Please check your connection and try again.`);
    }
  }

  const reset = () => {
    setValues(initial());
    setConsent(false);
    setErrors({});
    setStatus('idle');
    startedAt.current = Date.now();
  };

  if (status === 'success') {
    const first = (values.name || '').trim().split(' ')[0] || 'there';
    return (
      <div ref={doneRef} tabIndex={-1} role="status" aria-live="polite" className="fade-in flex flex-col items-start gap-6 border border-cinnamon/35 bg-[#FFFDF8] p-8 outline-none md:p-14">
        <Check className="text-cinnamon" />
        <h3 className="font-serif text-[40px] font-normal">Thank you, {first}.</h3>
        <p className="text-base leading-[1.75] text-ink/75">
          Your {successNoun} has been received. We will reply to {values.email} within <span className="tbc">{site.responseTime}</span>.
        </p>
        <button type="button" className="btn btn-line" onClick={reset}>Send another {successNoun}</button>
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <>
      {TURNSTILE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <form ref={formRef} noValidate onSubmit={onSubmit} aria-label={ariaLabel} className="relative grid gap-x-8 gap-y-7 [grid-template-columns:repeat(auto-fit,minmax(min(280px,100%),1fr))]">
        {message && status === 'error' && (
          <div role="alert" className="col-span-full flex items-start gap-4 border border-rust bg-[#F8E9E1] px-5 py-5 text-[15px] leading-relaxed text-[#7A2A12]">
            <Alert className="mt-0.5 flex-none" />
            <span>{message}</span>
          </div>
        )}

        {fields.map((f) => {
          const err = errors[f.name];
          const common = {
            id: id(f.name),
            name: f.name,
            required: f.required,
            'aria-invalid': err ? true : undefined,
            'aria-describedby': err ? `${id(f.name)}-err` : undefined,
            className: 'inp',
          };
          const req = f.required && <span className="text-cinnamon" aria-hidden="true"> *</span>;

          if (f.type === 'segmented') {
            return (
              <fieldset key={f.name} className="col-span-full m-0 border-0 p-0">
                <legend className="field-label mb-2.5">{f.label}</legend>
                <div className="grid border border-ink/20 sm:grid-cols-3">
                  {f.options!.map((o) => {
                    const sel = values[f.name] === o.value;
                    return (
                      <button
                        key={o.value}
                        type="button"
                        aria-pressed={sel}
                        onClick={() => update(f.name, o.value)}
                        className={clsx(
                          'min-h-[56px] border-ink/20 px-3 text-xs uppercase tracking-[0.18em] transition-colors max-sm:border-b sm:border-r sm:last:border-r-0',
                          sel ? 'bg-ink text-ivory' : 'bg-[#FFFDF8] text-ink/70 hover:text-ink',
                        )}
                      >
                        {o.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          }

          return (
            <div key={f.name} className={clsx('flex min-w-0 flex-col gap-2.5', (f.full || f.type === 'textarea') && 'col-span-full')}>
              <label htmlFor={id(f.name)} className="field-label">{f.label}{req}</label>
              {f.type === 'select' ? (
                <select {...common} value={values[f.name]} onChange={(e) => update(f.name, e.target.value)}>
                  <option value="">{f.placeholder ?? 'Select an option'}</option>
                  {f.options!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea {...common} placeholder={f.placeholder} value={values[f.name]} onChange={(e) => update(f.name, e.target.value)} maxLength={4000} />
              ) : (
                <input {...common} type={f.type} autoComplete={f.autoComplete} placeholder={f.placeholder} value={values[f.name]} onChange={(e) => update(f.name, e.target.value)} />
              )}
              {err && <p id={`${id(f.name)}-err`} className="text-[13px] text-rust">{err}</p>}
            </div>
          );
        })}

        {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor={id('website')}>Website</label>
          <input id={id('website')} name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        <div className="col-span-full flex flex-col gap-2.5">
          <label htmlFor={id('consent')} className="flex cursor-pointer items-start gap-3.5 text-sm leading-relaxed text-ink/80">
            <input
              id={id('consent')}
              type="checkbox"
              checked={consent}
              onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors((x) => { const n = { ...x }; delete n.consent; return n; }); }}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? `${id('consent')}-err` : undefined}
              className="mt-0.5 h-5 w-5 flex-none accent-cinnamon"
            />
            <span>
              I agree that CYORA may use these details to respond to my {successNoun}, as described in the{' '}
              <Link href="/privacy" className="text-cinnamon underline-offset-4 hover:underline">Privacy Policy</Link>.<span className="text-cinnamon" aria-hidden="true"> *</span>
            </span>
          </label>
          {errors.consent && <p id={`${id('consent')}-err`} className="text-[13px] text-rust">{errors.consent}</p>}
        </div>

        {TURNSTILE_KEY && <div className="cf-turnstile col-span-full" data-sitekey={TURNSTILE_KEY} data-theme="light" />}

        <div className="col-span-full flex flex-wrap items-center gap-5">
          <button type="submit" className="btn btn-ink" disabled={sending} aria-busy={sending}>
            {sending && <span aria-hidden="true" className="h-4 w-4 animate-[spin_.8s_linear_infinite] rounded-full border border-current border-r-transparent" />}
            {sending ? 'Sending…' : submitLabel}
          </button>
          <span className="text-[13px] text-ink/60"><span className="text-cinnamon">*</span> Required fields</span>
        </div>
      </form>
    </>
  );
}
