import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const GridSection = ({ data, Icon, handleFunc, listLength }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 8, md: 12 }}
      >
        {data?.map((book, index) => {
          return (
            <Grid item xs={2} sm={4} md={3} key={index}>
              <ImageListItem key={book.img}>
                <img
                  src={require(`../../../${book.coverPhotoURL}`)}
                  srcSet={require(`../../../${book.coverPhotoURL}`)}
                  alt={book?.title}
                  loading="lazy"
                />

                <ImageListItemBar
                  title={book?.title}
                  subtitle={book?.author}
                  actionIcon={
                    <Tooltip
                      title={
                        listLength === 0
                          ? `Add ${book?.title} to reading list`
                          : `Remove ${book?.title} from reading list`
                      }
                      arrow
                    >
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={
                          listLength === 0
                            ? `Add ${book?.title} to reading list`
                            : `Remove ${book?.title} from reading list`
                        }
                        onClick={() => handleFunc(book)}
                      >
                        <Icon />
                      </IconButton>
                    </Tooltip>
                  }
                />
              </ImageListItem>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default GridSection;
