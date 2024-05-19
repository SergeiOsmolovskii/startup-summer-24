import { useEffect, useState } from "react";
import { Group, Box, Text, Button } from "@mantine/core";
import { Rating } from "@mantine/core";
import "../styles/RatingModal.css";

export const RatingModal = ({ title, movie, onClose, updateRating }) => {
  const ratings = JSON.parse(localStorage.getItem("rated")) || {};
  const [rating, setRating] = useState(null);

  const handleSave = () => {
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

  useEffect(() => {
    if (movie && ratings[movie.id]) {
      if (ratings[movie.id].rating) {
        setRating(ratings[movie.id].rating);
      }
    } else {
      setRating(0);
    }
  }, [movie]);

  return (
    <Box component="section" pt={16}>
      <Group gap={16}>
        <Text component="h3" fz={16} fw="bold">{title}</Text>
        <Rating count={10} value={rating} size={window.innerWidth > 574 ? 28 : 26} defaultValue={rating || 0} onChange={setRating} />
        <Group>
          <Button className="save-button" onClick={handleSave} radius={8} color="var(--purple-500)">Save</Button>
          <Button className="remove-button" onClick={() => setRating(0)} p={0} variant="transparent" color="var(--purple-500)">Remove rating</Button>
        </Group>
      </Group>
    </Box>
  );
};
