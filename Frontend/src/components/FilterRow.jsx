import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { sentimentEmojiMap } from '../utils/helpers';
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/entries/entriesSlice";
import { filterEntries } from "../features/entries/entriesSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import dayjs from "dayjs";
import { fetchTags } from "../features/tags/tagsSlice";
import { useTheme } from "@mui/material/styles";

const FilterRow = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.entries.filters);
    const tags = useSelector((state) => state.tags.items);
    const theme = useTheme();

  const moodOptions = Object.entries(sentimentEmojiMap).map(
    ([label, emoji]) => ({
      label: `${label} ${emoji}`,
      value: emoji,
    })
  );

  const tagsOptions = tags.map((tag) => ({
    label: tag.name,
    value: tag._id,
  }));

  useEffect(() => {
    dispatch(filterEntries());
  }, [dispatch, filters]);

  useEffect(() => {
      dispatch(fetchTags());
  }, []);


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

  const handleDeleted = () => {
    const newDeletedValue = !filters.deleted;

    dispatch(
      setFilter({
        ...filters,
        deleted: newDeletedValue, 
        page: 1,
      })
    );
  };

  const handleDateChange = (field) => (newValue) => {
    if (!newValue) {
      dispatch(
        setFilter({
          ...filters,
          [field]: null,
          page: 1,
        })
      );
      return;
    }

    const date = dayjs(newValue);

    const utcISOString =
      field === "startDate"
        ? date.startOf("day").toDate().toISOString() 
        : date.add(1, "day").startOf("day").toDate().toISOString();

    console.log(`Setting ${field} to:`, utcISOString);

    dispatch(
      setFilter({
        ...filters,
        [field]: utcISOString,
        page: 1,
      })
    );
  };

  const handleMoodChange = (event, newValue) => {
    dispatch(
      setFilter({
        ...filters,
        mood: newValue ? newValue.value : null,
        page: 1,
      })
    );
  };

  const handleTagChange = (event, newValue) => {
    dispatch(
      setFilter({
        ...filters,
        tagId: newValue ? newValue.value : null,
        page: 1,
      })
    );
  }
  
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
          onChange={handleDateChange("startDate")}
          disableFuture
          sx={{
            width: 180,
          }}
        />
        <DatePicker
          label="End Date"
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
      <Autocomplete
        disablePortal
        options={tagsOptions}
        onChange={handleTagChange}
        sx={{
          width: 180,
        }}
        renderInput={(params) => <TextField {...params} label="Tags" />}
      />
      <IconButton
        onClick={handleFavorite}
        sx={{
          borderRadius: "12px",
          padding: "8px",
          display: 'flex',
          gap: '8px'
        }}
      >
        {filters.favorite === true ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderOutlinedIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleDeleted}
        sx={{
          borderRadius: "12px",
          padding: "8px",
          display: 'flex',
          gap: '8px'
        }}
      >
        {filters.deleted === true ? (
          <DeleteIcon />
        ) : (
          <DeleteOutlinedIcon />
        )}
      </IconButton>
    </div>
  );
};
export default FilterRow;
