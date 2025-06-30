import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { sentimentEmojiMap } from '../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/entries/entriesSlice";
import { filterEntries } from "../features/entries/entriesSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import dayjs from "dayjs";

const FilterRow = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.entries.filters);

  const moodOptions = Object.entries(sentimentEmojiMap).map(
    ([label, emoji]) => ({
      label: `${label} ${emoji}`,
      value: emoji,
    })
  );

  useEffect(() => {
    dispatch(filterEntries());
  }, [dispatch, filters]);

  const handleFavorite = () => {
    const newFavoriteValue = filters.favorite === undefined ? true : undefined;

    dispatch(
      setFilter({
        ...filters,
        favorite: newFavoriteValue, 
        page: 1,
      })
    );
  };

  const handleDateChange = (field) => (newValue) => {
    const date = newValue? dayjs(newValue).format('YYYY-MM-DD') : null;

    dispatch(
      setFilter({
        ...filters,
        [field]: date,
        page: 1,
      })
    );
  }

  const handleMoodChange = (event, newValue) => {
    dispatch(
      setFilter({
        ...filters,
        mood: newValue ? newValue.value : null,
        page: 1,
      })
    );
  };

  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "28px",
        padding: "12px 0",
        flexWrap: "wrap",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          value={filters.startDate ? dayjs(filters.startDate) : null}
          onChange={handleDateChange("startDate")}
          disableFuture
          sx={{
            width: 180,
          }}
        />
        <DatePicker
          label="End Date"
          value={filters.endDate ? dayjs(filters.endDate) : null}
          onChange={handleDateChange("endDate")}
          disableFuture
          sx={{ width: 180 }}
        />
      </LocalizationProvider>
      <Autocomplete
        disablePortal
        options={moodOptions}
        onChange={handleMoodChange}
        sx={{
          width: 180,
        }}
        renderInput={(params) => <TextField {...params} label="Mood" />}
      />
      <IconButton
        onClick={handleFavorite}
        sx={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "8px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        {filters.favorite === true ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
    </div>
  );
};
export default FilterRow;
