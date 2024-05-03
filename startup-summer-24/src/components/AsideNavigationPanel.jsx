import { Box } from "@mantine/core";
import Logo from "../assets/logo.svg?react";
import "../styles/AsideNavigationPanel.css";
import { AsideNavigation } from "./AsideNavigation";

export const AsideNavigationPanel = () => {
  return (
    <Box component="aside" mih="100vh" p={24} bg="var(--purple-100)" w="280px">
      <Logo className="logo" />
      <AsideNavigation />
    </Box>
  )
}