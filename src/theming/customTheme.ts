import { createTheme } from "@mui/material/styles";

const { palette } = createTheme();

declare module '@mui/material/styles' {
  interface Palette {
    ternary: Palette['primary'];
  }

  interface PaletteOptions {
    ternary?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ternary: true;
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    ternary: true;
  }
}

export const CustomTheme = {
  dark: {
    mode: "dark",
    palette: {
      primary: palette.augmentColor({
        color: {
          main: "#131b23",
          contrastText: "#F9F9F9",
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: "#1a232d",
          contrastText: "#F9F9F9",
        },
      }),

      ternary: palette.augmentColor({
        color: {
          main: "#0F151B",
          contrastText: "#ffffff",
        },
      }),

      text: {
        primary: "#F9F9F9",
        secondary: "#F9F9F9",
      },
      background: {
        default: "#131B23",
        paper: "#19222c",
      },

      error: palette.augmentColor({
        color: {
          main: "#F52424",
          contrastText: "#191919",
        },
      }),
      success: palette.augmentColor({
        color: {
          main: "#7ECC29",
          contrastText: "#191919",
        },
      }),
      disabled: palette.augmentColor({
        color: {
          main: "#D8D8D8",
          contrastText: "#191919",
        },
      }), 
      info: palette.augmentColor({
        color: {
          main: "#0062a2",
          contrastText: "#ffffff",
        },
      }),
      warning: palette.augmentColor({
        color: {
          main: "#F57474",
          contrastText: "#191919",
        },
      }),

      divider: "#909284",
      upvote: palette.augmentColor({
        color: {
          main: "#acd452",
          contrastText: "#253600",
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: "#ffb4a9",
          contrastText: "#680003",
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: "#374e00",
          contrastText: "#c8f16c",
        },
      }),
      containerSecondary: palette.augmentColor({
        color: {
          main: "#3d4a36",
          contrastText: "#d8e8cb",
        },
      }),
    },
  },
  light: {
    mode: "light",
    palette: {
      primary: palette.augmentColor({
        color: {
          main: "#4a6800",
          contrastText: "#ffffff",
        },
      }),
      secondary: palette.augmentColor({
        color: {
          main: "#5a6147",
          contrastText: "#ffffff",
        },
      }),

      ternary: palette.augmentColor({
        color: {
          main: "#ffffff",
          contrastText: "#F52424",
        },
      }),

      text: {
        primary: "#1b1c17",
        secondary: "#1b1c17",
      },
      background: {
        default: "#fefdf4",
        paper: "#fefcf4",
      },
      error: palette.augmentColor({
        color: {
          main: "#ba1b1b",
          contrastText: "#ffffff",
        },
      }),
      success: palette.augmentColor({
        color: {
          main: "#006e10",
          contrastText: "#ffffff",
        },
      }),
      disabled: palette.augmentColor({
        color: {
          main: "#ffffff",
          contrastText: "#F52424",
        },
      }),
      info: palette.augmentColor({
        color: {
          main: "#0062a2",
          contrastText: "#ffffff",
        },
      }),
      warning: palette.augmentColor({
        color: {
          main: "#606200",
          contrastText: "#ffffff",
        },
      }),
      divider: "#75786a",
      upvote: palette.augmentColor({
        color: {
          main: "#4a6800",
          contrastText: "#ffffff",
        },
      }),
      downvote: palette.augmentColor({
        color: {
          main: "#ba1b1b",
          contrastText: "#ffffff",
        },
      }),
      containerPrimary: palette.augmentColor({
        color: {
          main: "#c8f16c",
          contrastText: "#131f00",
        },
      }),
      containerSecondary: palette.augmentColor({
        color: {
          main: "#d8e8cb",
          contrastText: "#131f0e",
        },
      }),
    },
  },
};
