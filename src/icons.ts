// Hisho's icon set for Home Assistant: `hisho:kanji` is the 秘 of the Hisho phone app's icon (Noto Sans CJK JP
// Bold, the same glyph), as a 24x24 path so it takes the sidebar's colour and active state like any mdi icon.
// Use it anywhere HA takes an icon: the Hisho dashboard's sidebar entry, a card, an entity.
const KANJI =
  "M12.11 3.1C13.79 4.04 15.71 5.53 16.58 6.6L18.46 4.66C17.5 3.56 15.48 2.2 13.86 1.33ZM19.33 2.43C18.55 6.24 17.32 9.74 15.46 12.74V6.17H12.78V16.32C11.43 17.81 9.85 19.12 8.04 20.22C8.68 20.63 9.59 21.61 9.98 22.16C11.01 21.5 11.95 20.79 12.82 20.03C13.03 21.89 13.81 22.48 15.78 22.48C16.26 22.48 17.87 22.48 18.37 22.48C20.46 22.48 21.12 21.32 21.4 17.81C20.66 17.6 19.59 17.14 18.99 16.69C18.9 19.39 18.76 19.99 18.12 19.99C17.77 19.99 16.51 19.99 16.24 19.99C15.57 19.99 15.46 19.85 15.46 18.84V17.37C17.02 15.52 18.28 13.43 19.31 11.14C19.93 12.97 20.41 15.04 20.5 16.48L23 15.79C22.82 13.91 22.06 11.14 21.05 9.01L20.07 9.28C20.8 7.34 21.4 5.25 21.9 3.03ZM8.1 1.47C6.41 2.23 3.66 2.89 1.21 3.26C1.5 3.83 1.85 4.75 1.96 5.34C2.83 5.23 3.73 5.09 4.64 4.93V7.61H1.39V10.13H4.14C3.38 12.36 2.19 14.81 1 16.32C1.41 17.01 2.05 18.18 2.28 18.96C3.13 17.79 3.96 16.09 4.64 14.3V22.67H7.26V13.39C7.69 14.1 8.08 14.83 8.29 15.33L9.64 13.66C9.39 14.62 9.09 15.49 8.68 16.21L10.81 17.19C11.89 15.36 12.25 12.38 12.46 9.7L10.26 9.26C10.17 10.59 10.01 11.92 9.75 13.16C9.23 12.52 7.78 10.98 7.26 10.52V10.13H9.66V7.61H7.26V4.38C8.22 4.13 9.14 3.85 9.96 3.53Z";

const ICONS: Record<string, string> = { kanji: KANJI };

export function registerIcons(w: any = window) {
  w.customIcons = w.customIcons || {};
  w.customIcons.hisho = {
    getIcon: async (name: string) => ({ path: ICONS[name] ?? KANJI, viewBox: "0 0 24 24" }),
    getIconList: async () => Object.keys(ICONS).map((name) => ({ name })),
  };
}
