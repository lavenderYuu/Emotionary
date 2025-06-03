import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { entries } from "../assets/data/entries";
import { useSelector, useDispatch } from "react-redux"
import { useMemo } from 'react';
import { doFavorite } from '../features/entries/entriesSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleIcon from '@mui/icons-material/Circle';
import { getDate, getTags } from '../utils/helpers';

// base component: https://mui.com/material-ui/react-card/
const EntryCard = ({ onClick }) => {
  const favorites = useSelector((state) => state.entries.favorites);
  const tags = useSelector((state) => state.tags.tags);
  const dispatch = useDispatch();
  console.log("favorites: ", favorites);
  console.log("tags", tags);

  const tagMap = useMemo(() => getTags(tags), [tags]);

  const handleFavorite = (e, entry) => {
    e.stopPropagation();
    dispatch(doFavorite(entry));
  }

  const handleKebab = (e) => {
    e.stopPropagation();  
  }

  return (
    <>
     <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      flexWrap: 'wrap', 
      alignItems: 'center', 
      gap: 2, 
      p: 2 }}>
        {entries.map((entry, index) => (
          <Box
            key={index}
            sx={{ margin: '8px' }}>
              <Card 
                onClick={() => onClick(entry.id)}
                sx={{ 
                  width: 280,
                  height: 224,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  borderRadius: 4,
                  border: '1px solid #e2d2be',
                  backgroundColor: '#fbf6ef',
                  boxShadow: 'none',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f5eee4' }
                }}>
                <CardHeader
                  title={entry.title}
                  subheader={getDate(entry.date)}
                  action={
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={'menu'}
                      aria-expanded={'menu'}
                      aria-haspopup="true"
                      onClick={handleKebab}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  sx={{
                    width: '90%',
                    display:'flex',
                    justifyContent: 'space-between'
                }}/>
                <Menu>
                  <MenuItem display='true'>Hello</MenuItem>
                </Menu>
                <CardContent sx={{
                  pt: 0,
                  pb: 0
                }}>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      display: '-webkit-box', // https://stackoverflow.com/questions/5269713/css-ellipsis-on-second-line
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}>
                    {entry.content}
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={(e) => handleFavorite(e, entry)}
                  >
                    {favorites.some((favorite) => favorite.id === entry.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {entry.tags.map((id) => {
                      const tag = tagMap[id];
                      return tag ? (
                        <CircleIcon sx={{ color: tag.color, fontSize: 12 }} />
                      ) : null;
                    })}
                  </Box>
                </CardActions>
              </Card>
          </Box>
        ))}
     </Box>
    </>
  );
}

export default EntryCard;
