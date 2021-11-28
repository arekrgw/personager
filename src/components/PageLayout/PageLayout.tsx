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
} from "@mui/material";
import React, { FC, useState } from "react";
import {
  Menu,
  ChevronLeft,
  Event,
  Dashboard,
  ListAlt,
  Notifications,
} from "@mui/icons-material";
import { AppBar, Main, DRAWER_WIDTH, DrawerHeader } from "./styles";
import ListItemLink from "@components/ListItemLink";
import { useRouter } from "next/router";

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
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
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
        variant="persistent"
        anchor="left"
        open={open}
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
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Box>{children}</Box>
      </Main>
    </Box>
  );
};

export default PageLayout;
