import { createTheme } from "../types";

const tokens = {
  gold: {
    c50: "#fff8e1",
    c100: "#ffecb3",
    c200: "#ffe082",
    c300: "#ffd54f",
    c400: "#ffca28",
    c500: "#ffc107",
    c600: "#ffb300",
    c700: "#ffa000",
    c800: "#ff8f00",
    c900: "#ff6f00"
  },
  shade: {
    c25: "#fffbeb",
    c50: "#fff3c4",
    c100: "#ffe69a",
    c200: "#ffdb70",
    c300: "#ffd140",
    c400: "#ffca28",
    c500: "#ffb300",
    c600: "#ffa000",
    c700: "#ff8f00",
    c800: "#ff6f00",
    c900: "#e65100"
  },
  ash: {
    c50: "#f5f5f5",
    c100: "#eeeeee",
    c200: "#e0e0e0",
    c300: "#bdbdbd",
    c400: "#9e9e9e",
    c500: "#757575",
    c600: "#616161",
    c700: "#424242",
    c800: "#303030",
    c900: "#212121"
  },
  blue: {
    c50: "#e3f2fd",
    c100: "#bbdefb",
    c200: "#90caf9",
    c300: "#64b5f6",
    c400: "#42a5f5",
    c500: "#2196f3",
    c600: "#1e88e5",
    c700: "#1976d2",
    c800: "#1565c0",
    c900: "#0d47a1"
  }
};

export default createTheme({
  name: "golden",
  extend: {
    colors: {
      themePreview: {
        primary: tokens.gold.c200,
        secondary: tokens.shade.c50
      },

      pill: {
        background: tokens.shade.c300,
        backgroundHover: tokens.shade.c200,
        highlight: tokens.gold.c200,

        activeBackground: tokens.shade.c300,
      },

      global: {
        accentA: tokens.gold.c200,
        accentB: tokens.gold.c300
      },

      lightBar: {
        light: tokens.gold.c400
      },

      buttons: {
        toggle: tokens.gold.c300,
        toggleDisabled: tokens.ash.c500,

        secondary: tokens.ash.c700,
        secondaryHover: tokens.ash.c700,
        gold: tokens.gold.c500,
        goldHover: tokens.gold.c400,
        cancel: tokens.ash.c500,
        cancelHover: tokens.ash.c300
      },

      background: {
        main: tokens.shade.c900,
        secondary: tokens.shade.c600,
        secondaryHover: tokens.shade.c400,
        accentA: tokens.gold.c500,
        accentB: tokens.gold.c500
      },

      modal: {
        background: tokens.shade.c800,
      },

      type: {
        logo: tokens.gold.c100,
        text: tokens.shade.c50,
        dimmed: tokens.shade.c50,
        divider: tokens.ash.c500,
        secondary: tokens.ash.c100,
        link: tokens.gold.c100,
        linkHover: tokens.gold.c50
      },

      search: {
        background: tokens.shade.c500,
        hoverBackground: tokens.shade.c600,
        focused: tokens.shade.c400,
        placeholder: tokens.shade.c100,
        icon: tokens.shade.c100
      },

      mediaCard: {
        hoverBackground: tokens.shade.c600,
        hoverAccent: tokens.shade.c25,
        hoverShadow: tokens.shade.c900,
        shadow: tokens.shade.c700,
        barColor: tokens.ash.c200,
        barFillColor: tokens.gold.c100,
        badge: tokens.shade.c700,
        badgeText: tokens.ash.c100
      },

      largeCard: {
        background: tokens.shade.c600,
        icon: tokens.gold.c400
      },

      dropdown: {
        background: tokens.shade.c600,
        altBackground: tokens.shade.c700,
        hoverBackground: tokens.shade.c500,
        text: tokens.shade.c50,
        secondary: tokens.shade.c100,
        border: tokens.shade.c400,
        contentBackground: tokens.shade.c500
      },

      authentication: {
        border: tokens.shade.c300,
        inputBg: tokens.shade.c600,
        inputBgHover: tokens.shade.c500,
        wordBackground: tokens.shade.c500,
        copyText: tokens.shade.c100,
        copyTextHover: tokens.ash.c50
      },

      settings: {
        sidebar: {
          activeLink: tokens.shade.c600,
          badge: tokens.shade.c900,

          type: {
            secondary: tokens.shade.c200,
            inactive: tokens.shade.c50,
            icon: tokens.shade.c50,
            iconActivated: tokens.gold.c200,
            activated: tokens.gold.c50
          }
        },

        card: {
          border: tokens.shade.c400,
          background: tokens.shade.c400,
          altBackground: tokens.shade.c400
        },

        saveBar: {
          background: tokens.shade.c800
        }
      },

      utils: {
        divider: tokens.ash.c300
      },

      errors: {
        card: tokens.shade.c800,
        border: tokens.ash.c500,

        type: {
          secondary: tokens.ash.c100
        }
      },

      about: {
        circle: tokens.ash.c500,
        circleText: tokens.ash.c50
      },

      editBadge: {
        bg: tokens.ash.c500,
        bgHover: tokens.ash.c400,
        text: tokens.ash.c50
      },

      progress: {
        background: tokens.ash.c50,
        preloaded: tokens.ash.c50,
        filled: tokens.gold.c200
      },

      video: {
        buttonBackground: tokens.ash.c200,

        autoPlay: {
          background: tokens.ash.c700,
          hover: tokens.ash.c500
        },

        scraping: {
          card: tokens.shade.c700,
          loading: tokens.gold.c200,
          noresult: tokens.ash.c100
        },

        audio: {
          set: tokens.gold.c200
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
          sliderFilled: tokens.gold.c200,

          buttons: {
            list: tokens.ash.c700,
            active: tokens.ash.c900
          },

          closeHover: tokens.ash.c800,

          type: {
            secondary: tokens.ash.c200,
            accent: tokens.gold.c200
          }
        }
      }
    }
  }
});
