import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

const SearchBar = ({ query, setQuery, data, Icon, handleFunc }) => (
  <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
    <Autocomplete
      id="select-dropdown"
      disablePortal
      sx={{ width: 300 }}
      options={data}
      autoHighlight
      getOptionLabel={(option) => option?.title}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="80"
            src={require(`../../../${option?.coverPhotoURL}`)}
            srcSet={require(`../../../${option?.coverPhotoURL}`)}
            alt={option?.title}
          />
          <Box>
            <Typography variant="subtitle1">{option?.title}</Typography>

            <Typography variant="subtitle2">
              Author: {option?.author}
            </Typography>
            <Tooltip title="Add book to reading list" arrow>
              <IconButton
                sx={{ color: '#76434' }}
                aria-label={`Add ${option?.title} to reading list`}
                onClick={() => handleFunc(option)}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
          }}
          onInput={(e) => {
            setQuery(e?.target.value);
          }}
          label="Enter book title"
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={query}
        />
      )}
    />
  </Box>
);

export default SearchBar;
