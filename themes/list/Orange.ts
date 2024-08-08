import { createTheme } from "../types";

const tokens = {
  orange: {
    c50: "#FFE5B4",
    c100: "#FFD699",
    c200: "#FFC266",
    c300: "#FFAD33",
    c400: "#FF9900",
    c500: "#CC7A00",
    c600: "#995C00",
    c700: "#663D00",
    c800: "#332000",
    c900: "#1A1100",
  },
  shade: {
    c25: "#9c9c9c",
    c50: "#7c7c7c",
    c100: "#666666",
    c200: "#4f4f4f",
    c300: "#404040",
    c400: "#343434",
    c500: "#282828",
    c600: "#202020",
    c700: "#1a1a1a",
    c800: "#151515",
    c900: "#0e0e0e",
  },
  ash: {
    c50: "#8d8d8d",
    c100: "#6b6b6b",
    c200: "#545454",
    c300: "#3c3c3c",
    c400: "#313131",
    c500: "#2c2c2c",
    c600: "#252525",
    c700: "#1e1e1e",
    c800: "#181818",
    c900: "#111111",
  },
};

export default createTheme({
  name: "orange",
  extend: {
    colors: {
      themePreview: {
        primary: tokens.orange.c200,
        secondary: tokens.shade.c50,
      },
      pill: {
        background: tokens.shade.c300,
        backgroundHover: tokens.shade.c200,
        highlight: tokens.orange.c200,
        activeBackground: tokens.shade.c300,
      },
      global: {
        accentA: tokens.orange.c200,
        accentB: tokens.orange.c300,
      },
      lightBar: {
        light: tokens.orange.c400,
      },
      buttons: {
        toggle: tokens.orange.c300,
        toggleDisabled: tokens.ash.c500,
        secondary: tokens.ash.c700,
        secondaryHover: tokens.ash.c700,
        purple: tokens.orange.c500,
        purpleHover: tokens.orange.c400,
        cancel: tokens.ash.c500,
        cancelHover: tokens.ash.c300,
      },
      background: {
        main: tokens.shade.c900,
        secondary: tokens.shade.c600,
        secondaryHover: tokens.shade.c400,
        accentA: tokens.orange.c500,
        accentB: tokens.orange.c500,
      },
      modal: {
        background: tokens.shade.c800,
      },
      type: {
        logo: tokens.orange.c100,
        text: tokens.shade.c50,
        dimmed: tokens.shade.c50,
        divider: tokens.ash.c500,
        secondary: tokens.ash.c100,
        link: tokens.orange.c100,
        linkHover: tokens.orange.c50,
      },
      search: {
        background: tokens.shade.c500,
        hoverBackground: tokens.shade.c600,
        focused: tokens.shade.c400,
        placeholder: tokens.shade.c100,
        icon: tokens.shade.c100,
      },
      mediaCard: {
        hoverBackground: tokens.shade.c600,
        hoverAccent: tokens.shade.c25,
        hoverShadow: tokens.shade.c900,
        shadow: tokens.shade.c700,
        barColor: tokens.ash.c200,
        barFillColor: tokens.orange.c100,
        badge: tokens.shade.c700,
        badgeText: tokens.ash.c100,
      },
      largeCard: {
        background: tokens.shade.c600,
        icon: tokens.orange.c400,
      },
      dropdown: {
        background: tokens.shade.c600,
        altBackground: tokens.shade.c700,
        hoverBackground: tokens.shade.c500,
        text: tokens.shade.c50,
        secondary: tokens.shade.c100,
        border: tokens.shade.c400,
        contentBackground: tokens.shade.c500,
      },
      authentication: {
        border: tokens.shade.c300,
        inputBg: tokens.shade.c600,
        inputBgHover: tokens.shade.c500,
        wordBackground: tokens.shade.c500,
        copyText: tokens.shade.c100,
        copyTextHover: tokens.ash.c50,
      },
      settings: {
        sidebar: {
          activeLink: tokens.shade.c600,
          badge: tokens.shade.c900,
          type: {
            secondary: tokens.shade.c200,
            inactive: tokens.shade.c50,
            icon: tokens.shade.c50,
            iconActivated: tokens.orange.c200,
            activated: tokens.orange.c50,
          },
        },
        card: {
          border: tokens.shade.c400,
          background: tokens.shade.c400,
          altBackground: tokens.shade.c400,
        },
        saveBar: {
          background: tokens.shade.c800,
        },
      },
      utils: {
        divider: tokens.ash.c300,
      },
      errors: {
        card: tokens.shade.c800,
        border: tokens.ash.c500,
        type: {
          secondary: tokens.ash.c100,
        },
      },
      about: {
        circle: tokens.ash.c500,
        circleText: tokens.ash.c50,
      },
      editBadge: {
        bg: tokens.ash.c500,
        bgHover: tokens.ash.c400,
        text: tokens.ash.c50,
      },
      progress: {
        background: tokens.ash.c50,
        preloaded: tokens.ash.c50,
        filled: tokens.orange.c200,
      },
      video: {
        buttonBackground: tokens.ash.c200,
        autoPlay: {
          background: tokens.ash.c700,
          hover: tokens.ash.c500,
        },
        scraping: {
          card: tokens.shade.c700,
          loading: tokens.orange.c200,
          noresult: tokens.ash.c100,
        },
        audio: {
          set: tokens.orange.c200,
        },
        context: {
          background: tokens.ash.c900,
          light: tokens.shade.c50,
          border: tokens.ash.c600,
          hoverColor: tokens.ash.c600,
          buttonFocus: tokens.ash.c500,
          flagBg: tokens.ash.c500,
          inputBg: tokens.ash.c600,
          buttonOverInputHover: tokens.ash.c500,
          inputPlaceholder: tokens.ash.c200,
          cardBorder: tokens.ash.c700,
          slider: tokens.ash.c50,
          sliderFilled: tokens.orange.c200,
          buttons: {
            list: tokens.ash.c700,
            active: tokens.ash.c900,
          },
          closeHover: tokens.ash.c800,
          type: {
            secondary: tokens.ash.c200,
            accent: tokens.orange.c200,
          },
        },
      },
    },
  },
});
