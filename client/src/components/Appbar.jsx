import * as React from "react";
import "antd/dist/reset.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Slide,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import { ColorModeContext } from "../ToggleColorMode";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({});

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Appbar = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <HideOnScroll>
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar>
          <Box
            borderRadius={2}
            sx={{
              marginTop: 2,
              padding: "0.4rem 1vw",
              width: "100%",
              alignItems: "center",
              background: (theme) => `${theme.palette.background.paper}`,
              border: (theme) => `2px solid ${theme.palette.divider}`,
            }}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography
                variant="h5"
                component={"h1"}
                fontWeight={500}
                ml={1}
                color={"text.primary"}
              >
                Inventory
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "text.primary",
                  borderRadius: 1,
                }}
              >
                <Tooltip title="Toggle Theme">
                  <IconButton
                    onClick={colorMode.toggleColorMode}
                    color="inherit"
                  >
                    {theme.palette.mode === "dark" ? (
                      <Brightness7Icon />
                    ) : (
                      <Brightness4Icon />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Appbar;
