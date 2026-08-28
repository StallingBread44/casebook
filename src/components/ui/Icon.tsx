import type { SVGProps } from "react";

export type IconName =
  | "search" | "chevron-down" | "chevron-right" | "chevron-left" | "arrow-right" | "arrow-up-right"
  | "check" | "close" | "menu" | "download" | "share" | "bookmark" | "quote" | "clock" | "calendar"
  | "filter" | "user" | "users" | "upload" | "file" | "link" | "sliders" | "alert" | "seal" | "spark"
  | "list" | "eye" | "pen" | "shield" | "mail" | "external";

const PATHS: Record<IconName, string> = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4.1-4.1",
  "chevron-down": "M6 9.5 12 15.5 18 9.5",
  "chevron-right": "M9.5 6 15.5 12 9.5 18",
  "chevron-left": "M14.5 6 8.5 12 14.5 18",
  "arrow-right": "M4 12h15M13 6l6 6-6 6",
  "arrow-up-right": "M7 17 17 7M8.5 7H17v8.5",
  check: "M4.5 12.5 9.5 17.5 19.5 6.5",
  close: "M6 6l12 12M18 6 6 18",
  menu: "M3.5 7h17M3.5 12h17M3.5 17h17",
  download: "M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4.5 19.5h15",
  share: "M12 3.5v11M8 7.5 12 3.5l4 4M5 13v6.5h14V13",
  bookmark: "M6.5 3.75h11v16.5L12 15.9l-5.5 4.35V3.75Z",
  quote: "M9.5 6.5C7 7.5 5.5 9.5 5.5 12.5v5h5v-5h-3c0-2 .8-3.3 2.6-4.2ZM18.5 6.5c-2.5 1-4 3-4 6v5h5v-5h-3c0-2 .8-3.3 2.6-4.2Z",
  clock: "M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16ZM12 7.5V12l3 2",
  calendar: "M4.5 6.5h15v13h-15v-13ZM8 3.5V8M16 3.5V8M4.5 11h15",
  filter: "M3.5 5.5h17L14 13v6l-4-2v-4L3.5 5.5Z",
  user: "M12 4a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 4ZM4.5 20.5c0-3.6 3.4-6 7.5-6s7.5 2.4 7.5 6",
  users: "M9 4.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5ZM2.5 20c0-3.2 2.9-5.3 6.5-5.3s6.5 2.1 6.5 5.3M16 5.4a3.1 3.1 0 0 1 0 6M18 14.9c2.1.6 3.5 2.2 3.5 4.4",
  upload: "M12 20V8.5M7.5 13 12 8.5l4.5 4.5M4.5 4.5h15",
  file: "M6.5 3.5h7l4.5 4.5v12.5h-11.5V3.5ZM13.5 3.5V8H18",
  link: "M10 13.5a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7L11.5 6.3M14 10.5a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7l1.3-1.3",
  sliders: "M4 7.5h9M17 7.5h3M4 16.5h3M11 16.5h9M15 4.5v6M9 13.5v6",
  alert: "M12 4 21 19.5H3L12 4ZM12 10v4.2M12 16.6v.6",
  seal: "M12 3.2l2.3 1.7 2.8-.3 1 2.7 2.4 1.6-1 2.7 1 2.7-2.4 1.6-1 2.7-2.8-.3L12 20.8l-2.3-1.7-2.8.3-1-2.7-2.4-1.6 1-2.7-1-2.7 2.4-1.6 1-2.7 2.8.3L12 3.2ZM8.8 12.1l2.2 2.2 4.2-4.4",
  spark: "M12 3.5 13.9 9l5.6 1.9-5.6 2L12 18.5 10.1 12.9 4.5 10.9 10.1 9 12 3.5Z",
  list: "M4 6.5h1M8 6.5h12M4 12h1M8 12h12M4 17.5h1M8 17.5h12",
  eye: "M2.8 12S6.5 6 12 6s9.2 6 9.2 6-3.7 6-9.2 6-9.2-6-9.2-6ZM12 9.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z",
  pen: "M4 20l.9-3.9L15.6 5.4a2 2 0 0 1 2.9 0l.6.6a2 2 0 0 1 0 2.9L8.4 19.4 4 20ZM14 7l3 3",
  shield: "M12 3.5 19.5 6v6c0 4.2-3 7.2-7.5 8.5C7.5 19.2 4.5 16.2 4.5 12V6L12 3.5ZM9 12l2.2 2.2L15.5 10",
  mail: "M3.5 5.5h17v13h-17v-13ZM3.5 6.5 12 13l8.5-6.5",
  external: "M14 4.5h5.5V10M19.5 4.5 11 13M18 14v5.5H4.5V6H10",
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 18, strokeWidth = 1.5, ...rest }: IconProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
