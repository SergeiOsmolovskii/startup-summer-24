import { Box, Group, Image, Text } from "@mantine/core";
import NoCompanyIcon from "../assets/no-company-icon.svg?react";
import "../styles/ProductionCompany.css";
const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_BASE_URL;

export const ProductionCompany = ({ company }) => {
  const logoPath = `${IMAGES_BASE_URL}${company.logo_path}`

  return (
    <Group gap={8}>
      <Box className={company.logo_path ? "image-container" : null} h={40}>
        {company.logo_path ?
          <Image w={40} h={40} fit="contain" src={logoPath} c="red" />
          :
          <NoCompanyIcon />
        }
      </Box>
      <Text component="h4" fz={16} fw="bold">{company.name}</Text>
    </Group>
  )
}