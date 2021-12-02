import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  Toolbar,
  Typography,
  Divider,
  ListItemText,
  useMediaQuery,
  Button,
  ListItemButton,
} from "@mui/material";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  Menu,
  ChevronLeft,
  Event,
  Dashboard,
  ListAlt,
  Notifications,
  Logout,
} from "@mui/icons-material";
import { AppBar, Main, DRAWER_WIDTH, DrawerHeader } from "./styles";
import ListItemLink from "@components/ListItemLink";
import { useRouter } from "next/router";
import { Theme } from "@mui/system";
import { removeJwtCookie } from "@app/api";

interface IPageLayoutProps {}

const LINKS = [
  {
    path: "/",
    pathRegexp: new RegExp("^/$"),
    Icon: Dashboard,
    text: "Dashboard",
  },
  {
    path: "/events",
    pathRegexp: new RegExp("^/events.*$"),
    Icon: Event,
    text: "Events",
  },
  {
    path: "/todos",
    pathRegexp: new RegExp("^/todos.*$"),
    Icon: ListAlt,
    text: "Todo Lists",
  },
  {
    path: "/reminders",
    pathRegexp: new RegExp("^/reminders.*$"),
    Icon: Notifications,
    text: "Reminders",
  },
];

const PageLayout: FC<IPageLayoutProps> = ({ children }) => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(matches);

  useEffect(() => {
    setOpen(matches);
  }, [matches]);

  const router = useRouter();

  const closeDrawer = useCallback(() => {
    if (!matches) {
      setOpen(false);
    }
  }, [matches]);

  const logout = useCallback(() => {
    removeJwtCookie();
    router.push("/");
  }, [router]);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={matches ? open : false}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(true)}
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Personager
          </Typography>
          {matches && (
            <Button onClick={logout} color="inherit">
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant={matches ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={closeDrawer}
        onClick={closeDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {LINKS.map((link) => (
            <ListItemLink
              key={link.text}
              href={link.path}
              selected={link.pathRegexp.test(router.asPath)}
            >
              <ListItemIcon>
                <link.Icon />
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemLink>
          ))}
          {!matches && (
            <>
              <Divider />
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <Main open={matches ? open : false} isMobile={!matches}>
        <DrawerHeader />
        <Box>{children}</Box>
      </Main>
    </Box>
  );
};

export default PageLayout;
