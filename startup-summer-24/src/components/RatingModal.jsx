import { useState } from "react";
import { Group, Box, Text, Button } from "@mantine/core";
import { Rating } from '@mantine/core';

export const RatingModal = ({ title, movie, onClose, updateRating }) => {
  const [rating, setRating] = useState(0);

  const handleSave = () => {
    const ratings = JSON.parse(localStorage.getItem("rated")) || {};

    if (rating === 0) {
      delete ratings[movie.id];
    } else {
      ratings[movie.id] = {
        ...movie,
        rating
      };
    }
    localStorage.setItem("rated", JSON.stringify(ratings));
    updateRating(movie.id, rating);
    onClose();
  };

  return (
    <Box component="section" pt={16}>
      <Group gap={16}>
        <Text component="h3" fz={16} fw="bold">{title}</Text>
        <Rating count={10} value={rating || 0} size={28} defaultValue={0} onChange={setRating} />
        <Button onClick={handleSave}>Save</Button>
      </Group>
    </Box>
  );
};
