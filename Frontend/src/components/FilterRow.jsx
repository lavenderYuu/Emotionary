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
  

  return (
    <div className="filter-panel">
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
      </LocalizationProvider> */}
      <IconButton onClick={handleFavorite}>
        {filters.favorite === true ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
      {/* <Autocomplete
        disablePortal
        options={moodOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Mood" />}
      /> */}
    </div>
  );
};
export default FilterRow;
