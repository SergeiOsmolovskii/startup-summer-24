import { Box } from "@mantine/core";
import Logo from "../assets/logo.svg?react";
import LogoMobile from "../assets/logo-mobile.svg?react";
import "../styles/AsideNavigationPanel.css";
import { AsideNavigation } from "./AsideNavigation";

export const AsideNavigationPanel = () => {
  return (
    <Box className="navigation-container" component="aside" mih="100vh" bg="var(--purple-100)">
      <Logo className="logo" />
      <LogoMobile className="logo-mobile" />
      <AsideNavigation />
    </Box>
  )
}