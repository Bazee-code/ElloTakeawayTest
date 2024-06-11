import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import SearchBar from './frontend/components/ui/searchbar';
import useBooks from './frontend/hooks/useBooks';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GridSection from './frontend/components/ui/grid';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

const themeLight = createTheme({
  palette: {
    background: {
      default: '#e4f0e2',
    },
  },
  typography: {
    fontFamily: ['Mulish', 'sans-serif'].join(','),
    h6: {
      color: '#335C6E',
    },
    h5: {
      color: '#F76434',
    },
  },
});
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #FAAD00',
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const { data, loading, error } = useBooks();
  const [query, setQuery] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [readingList, setReadingList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (data) {
      setBooksData(data);
    }
  }, [data]);

  const handleAddBook = (data) => {
    if (!readingList?.includes(data)) {
      return setReadingList((prev) => [...prev, data]);
    }
    return handleOpen();
  };

  const handleRemoveBook = (data) => {
    const filteredData = readingList?.filter(
      (book) => book.title !== data?.title
    );

    setReadingList(filteredData);
  };

  const RenderModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h5">
            The selected book already exists in your reading list.
          </Typography>
        </Box>
      </Modal>
    );
  };

  return (
    <ThemeProvider theme={themeLight}>
      <CssBaseline />
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress color="success" />
        </Box>
      )}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="13vh"
      >
        <SearchBar
          query={query}
          setQuery={setQuery}
          data={data?.books}
          Icon={AddIcon}
          handleFunc={handleAddBook}
        />
      </Box>
      {readingList?.length == 0 ? (
        <Box m={2}>
          <Typography variant="h6">Browse through all book titles</Typography>
          <GridSection
            data={data?.books}
            Icon={AddIcon}
            handleFunc={handleAddBook}
            listLength={readingList?.length}
          />
        </Box>
      ) : (
        <Box m={2}>
          <Typography variant="h6">Your reading list</Typography>
          <GridSection
            data={readingList}
            Icon={RemoveIcon}
            handleFunc={handleRemoveBook}
            listLength={readingList?.length}
          />
        </Box>
      )}
      <RenderModal />
    </ThemeProvider>
  );
};

export default App;
