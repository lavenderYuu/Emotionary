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
import { doFavorite } from '../features/favorites/favoritesSlice';

// overview: https://mui.com/material-ui/react-card/
const EntryCard = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  console.log("favorites: ", favorites);

  const getDate = (date) => {
    const entryDate = new Date(date);
    return entryDate.toLocaleDateString('en-US');
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
              <Card sx={{ 
                width: 280,
                height: 224,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                textAlign: 'left',
                borderRadius: 4,
                border: '1px solid rgb(226, 210, 190)',
                backgroundColor: 'rgb(251, 246, 239)',
                boxShadow: 'none',
                overflow: 'hidden'
              }}>
                <CardHeader
                  title={entry.title}
                  subheader={getDate(entry.date)}
                  sx={{
                    display:'flex', 
                    flexDirection: 'column', 
                    alignItems: 'flex-start'
                }}/>
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
                <CardActions disableSpacing>
                  <IconButton 
                    aria-label="add to favorites"
                    onClick={() => dispatch(doFavorite(entry))}
                    >
                    {favorites.some((favorite) => favorite.id === entry.id) ? (
                      <FavoriteIcon color="error" />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
          </Box>
        ))}
     </Box>
    </>
  );
}

export default EntryCard;
