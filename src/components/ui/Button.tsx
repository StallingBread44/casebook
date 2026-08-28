import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "quiet";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-[8px] " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "disabled:opacity-45 disabled:pointer-events-none select-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-white border border-accent hover:bg-accent-ink hover:border-accent-ink shadow-[0_1px_2px_rgba(14,110,99,0.24)] hover:shadow-[0_6px_18px_-8px_rgba(14,110,99,0.6)] active:translate-y-px",
  secondary:
    "bg-surface text-ink border border-rule hover:border-ink/35 hover:bg-paper-deep/60 active:translate-y-px",
  ghost: "text-ink border border-transparent hover:bg-ink/[0.045]",
  quiet: "text-accent border border-transparent hover:text-accent-ink underline decoration-accent/30 underline-offset-[5px] hover:decoration-accent",
};

const SIZES: Record<Size, string> = {
  sm: "text-[13px] h-9 px-3.5",
  md: "text-[14px] h-11 px-5",
  lg: "text-[15px] h-[52px] px-7",
};

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconLeft?: IconName;
  className?: string;
  disabled?: boolean;
  full?: boolean;
  ariaLabel?: string;
}

export function Button({
  children, to, href, onClick, type = "button",
  variant = "primary", size = "md", icon, iconLeft,
  className, disabled, full, ariaLabel,
}: ButtonProps) {
  const classes = cn(BASE, VARIANTS[variant], variant === "quiet" ? "h-auto px-0" : SIZES[size], full && "w-full", className);
  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={size === "lg" ? 18 : 16} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={size === "lg" ? 18 : 16}
          className={cn(
            "transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            (icon === "arrow-right" || icon === "chevron-right") && "group-hover/btn:translate-x-1",
            icon === "arrow-up-right" && "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5",
          )}
        />
      )}
    </>
  );

  if (to)
    return (
      <Link to={to} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
