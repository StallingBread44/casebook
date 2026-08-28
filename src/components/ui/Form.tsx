import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const CONTROL =
  "w-full rounded-[8px] border border-rule bg-surface px-3.5 text-[14.5px] text-ink placeholder:text-faint " +
  "transition-[border-color,box-shadow] duration-200 hover:border-ink/25 " +
  "focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/15";

export function Label({
  children, htmlFor, hint, required,
}: { children: ReactNode; htmlFor?: string; hint?: string; required?: boolean }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <label htmlFor={htmlFor} className="font-sans text-[13px] font-semibold tracking-tight text-ink">
        {children}
        {required && <span className="ml-1 text-flag" aria-hidden="true">*</span>}
      </label>
      {hint && <span className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-faint">{hint}</span>}
    </div>
  );
}

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(CONTROL, "h-11", className)} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(CONTROL, "py-2.5 leading-relaxed", className)} />;
}

export function Select({
  className, children, ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select {...props} className={cn(CONTROL, "h-11 appearance-none pr-9", className)}>
        {children}
      </select>
      <Icon
        name="chevron-down"
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-faint"
      />
    </div>
  );
}

export function SearchInput({
  value, onChange, placeholder, id, className,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Icon name="search" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
      <input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(CONTROL, "h-[52px] pl-11 pr-11 text-[15px]")}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-[5px] p-1.5 text-faint transition-colors hover:bg-paper-deep hover:text-ink"
        >
          <Icon name="close" size={14} />
        </button>
      )}
    </div>
  );
}

export function Checkbox({
  checked, onChange, label, id, description, disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: ReactNode;
  id: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="relative mt-[3px] flex h-[18px] w-[18px] shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border border-rule bg-surface transition-colors duration-150 checked:border-accent checked:bg-accent hover:border-ink/30 checked:hover:border-accent disabled:opacity-50"
        />
        <Icon
          name="check"
          size={12}
          strokeWidth={2.6}
          className="pointer-events-none absolute left-[3px] top-[3px] text-white opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
        />
      </span>
      <label htmlFor={id} className={cn("cursor-pointer text-[14px] leading-snug", disabled && "opacity-60")}>
        <span className="text-ink-soft">{label}</span>
        {description && <span className="mt-0.5 block text-[13px] text-muted">{description}</span>}
      </label>
    </div>
  );
}

/** Filter chip used across the library and opportunities pages. */
export function FilterChip({
  active, onClick, children, count,
}: { active: boolean; onClick: () => void; children: ReactNode; count?: number }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[6px] border px-2.5 py-1.5 text-[13px] transition-colors duration-200",
        active
          ? "border-accent/40 bg-accent-soft text-accent-ink"
          : "border-rule bg-surface text-muted hover:border-ink/25 hover:text-ink",
      )}
    >
      {children}
      {typeof count === "number" && (
        <span className={cn("font-mono text-[10.5px] u-num", active ? "text-accent" : "text-faint")}>{count}</span>
      )}
    </button>
  );
}
