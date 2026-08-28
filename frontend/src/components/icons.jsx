// Lightweight hand-built icon set — avoids pulling in an icon library dependency.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 20, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>
      {children}
    </svg>
  );
}

export const IconHome = (p) => (
  <Svg {...p}><path d="M3 11.5 12 4l9 7.5" /><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" /></Svg>
);

export const IconUsers = (p) => (
  <Svg {...p}><circle cx="9" cy="8" r="3.2" /><path d="M2.8 19c.6-3 3-5 6.2-5s5.6 2 6.2 5" /><path d="M15.8 5.3a3.2 3.2 0 0 1 0 6.2" /><path d="M17 14.2c2.6.4 4.4 2.2 4.9 4.8" /></Svg>
);

export const IconAdmission = (p) => (
  <Svg {...p}><path d="M4 21V6a2 2 0 0 1 2-2h6l6 5v12" /><path d="M4 21h16" /><path d="M12 11v6" /><path d="M9 14h6" /></Svg>
);

export const IconBed = (p) => (
  <Svg {...p}><path d="M3 18v-7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M13 13v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v7" /><path d="M3 15h18v3" /><path d="M3 18v2M21 18v2" /></Svg>
);

export const IconPill = (p) => (
  <Svg {...p}><rect x="3.5" y="9.5" width="17" height="7" rx="3.5" transform="rotate(-40 12 13)" /><path d="M9.2 10.4 14 15.2" /></Svg>
);

export const IconDoorOut = (p) => (
  <Svg {...p}><path d="M13 4H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6" /><path d="M13 3.2v17.6" /><path d="M16 12h5.5M18.5 9.5 21 12l-2.5 2.5" /></Svg>
);

export const IconSettings = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="3" /><path d="M19.4 13a7.7 7.7 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.8-1l-.3-2.5h-4l-.3 2.5a7.6 7.6 0 0 0-1.8 1l-2.3-.9-2 3.4L6.6 11a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9c.5.4 1.2.8 1.8 1l.3 2.5h4l.3-2.5c.6-.2 1.3-.6 1.8-1l2.3.9 2-3.4-2-1.5Z" /></Svg>
);

export const IconMenu = (p) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);

export const IconBell = (p) => (
  <Svg {...p}><path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" /><path d="M10 19a2 2 0 0 0 4 0" /></Svg>
);

export const IconSearch = (p) => (
  <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></Svg>
);

export const IconChevronLeft = (p) => (
  <Svg {...p}><path d="M15 6l-6 6 6 6" /></Svg>
);

export const IconChevronDown = (p) => (
  <Svg {...p}><path d="M6 9l6 6 6-6" /></Svg>
);

export const IconEye = (p) => (
  <Svg {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></Svg>
);

export const IconEyeOff = (p) => (
  <Svg {...p}><path d="M3 3l18 18" /><path d="M10.6 5.7A10.4 10.4 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a15.6 15.6 0 0 1-3.2 4M6.5 6.9C4 8.7 2.5 12 2.5 12s3.5 6.5 9.5 6.5c1.3 0 2.5-.3 3.6-.8" /><path d="M9.9 10.1a2.8 2.8 0 0 0 3.9 3.9" /></Svg>
);

export const IconPlus = (p) => (
  <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>
);

export const IconTrash = (p) => (
  <Svg {...p}><path d="M4 7h16" /><path d="M9 7V4.8c0-.4.4-.8.9-.8h4.2c.5 0 .9.4.9.8V7" /><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /><path d="M10 11v6M14 11v6" /></Svg>
);

export const IconCheck = (p) => (
  <Svg {...p}><path d="M5 13l4.5 4.5L19 8" /></Svg>
);

export const IconAlertTriangle = (p) => (
  <Svg {...p}><path d="M12 4 2.5 20h19L12 4Z" /><path d="M12 10.5v4M12 17.2v.1" /></Svg>
);

export const IconX = (p) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);

export const IconEdit = (p) => (
  <Svg {...p}><path d="M4 16.5V20h3.5L18 9.5l-3.5-3.5L4 16.5Z" /><path d="M13 5l3.5 3.5" /></Svg>
);

export const IconLogOut = (p) => (
  <Svg {...p}><path d="M9 20H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4" /><path d="M16 16l4-4-4-4" /><path d="M20 12H9" /></Svg>
);

export const IconActivity = (p) => (
  <Svg {...p}><path d="M3 12h4l2-7 4 14 2-7h6" /></Svg>
);

export const IconClipboard = (p) => (
  <Svg {...p}><rect x="5.5" y="4.5" width="13" height="16" rx="2" /><path d="M9 4.5V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.5" /><path d="M9 11h6M9 15h6" /></Svg>
);

export const IconInfo = (p) => (
  <Svg {...p}><circle cx="12" cy="12" r="9.2" /><path d="M12 11v5.5M12 8v.1" /></Svg>
);

export const IconChevronRight = (p) => (
  <Svg {...p}><path d="M9 6l6 6-6 6" /></Svg>
);

export const IconFilter = (p) => (
  <Svg {...p}><path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z" /></Svg>
);

export const IconPhone = (p) => (
  <Svg {...p}><path d="M6 3.5 9 4l1 4-2 1.5a12 12 0 0 0 6.5 6.5L16 13.5l4 1 .5 3c0 1.1-.9 2-2 2C10.5 19.5 4.5 13.5 4.5 5.5a2 2 0 0 1 1.5-2Z" /></Svg>
);

export const IconMapPin = (p) => (
  <Svg {...p}><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></Svg>
);

export const IconEmpty = (p) => (
  <Svg {...p}><rect x="4" y="7" width="16" height="13" rx="2" /><path d="M4 11h16" /><path d="M9 4.5h6" /></Svg>
);
