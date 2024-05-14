import { NavLink } from "react-router-dom";
import { Box, List } from "@mantine/core";
import "../styles/AsideNavigation.css";

export const AsideNavigation = () => {
  const setActiveLink = ({ isActive }) => isActive ? "navigation-link navigation-link__active" : "navigation-link";

  return (
    <Box component="nav">
      <List listStyleType="none" >
        <List.Item w="100%" mb={16} className="navigation-list-item">
          <NavLink to="/movies" className={setActiveLink}>Movies</NavLink>
        </List.Item>
        <List.Item w="100%" mb={16} className="navigation-list-item">
          <NavLink to="/rated" className={setActiveLink}>Rated movies</NavLink>
        </List.Item>
      </List>
    </Box>
  )
}