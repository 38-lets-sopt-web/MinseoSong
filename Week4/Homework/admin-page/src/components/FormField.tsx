import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <label className="field">
      <span>{label}</span>
      {children}
      {error ? <strong className="field-error">{error}</strong> : null}
    </label>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({ label, error, ...props }: InputFieldProps) {
  return (
    <Field label={label} error={error}>
      <input {...props} />
    </Field>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: ReactNode;
}

export function SelectField({ label, error, children, ...props }: SelectFieldProps) {
  return (
    <Field label={label} error={error}>
      <select {...props}>{children}</select>
    </Field>
  );
}
