import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { sentimentEmojiMap } from '../utils/helpers';

const FilterRow = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [mood, setMood] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const moodOptions = Object.entries(sentimentEmojiMap).map(
    ([label, emoji]) => ({
      label: `${label} ${emoji}`,
      value: emoji,
    })
  );

  return (
    <div className="filter-panel">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          disableFuture
        />
        <span style={{ margin: "0 8px" }} />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          disableFuture
        />
      </LocalizationProvider>
      <IconButton
        aria-label="add to favorites"
        onClick={(e) => handleFavorite()}
      >
        <FavoriteIcon color="error" />
      </IconButton>
      <Autocomplete
        disablePortal
        options={moodOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Mood" />}
      />
    </div>
  );
};
export default FilterRow;
