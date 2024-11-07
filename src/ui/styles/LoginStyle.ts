import type {} from "@mui/lab/themeAugmentation";
import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const LoginTheme = createTheme({ components: {
    MuiTextField: {
        styleOverrides: {
            root: {
              width: 200
            },
          },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                backgroundColor: blue[500],
                color: "white",
                width: 100
            }
        }
    }
}})