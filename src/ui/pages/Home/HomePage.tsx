import { useEffect } from 'react';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import BoardsCarousel from "../../components/Lists/BoardsCarousel/BoardsCarousel";
import {Box, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Board } from '../../../core/models/Board';
import HomeLayout from '../../components/Layouts/HomeLayout';
import { logout } from '../../../core/services/LoginService';

function HomePage() {
  const {
    boards,
    loading,
    error,
    userId,
    loadBoards,
    handleCreateBoard,
  } = useBoardsViewModel();

  const navigate = useNavigate();

  const colors = [
    'A3537A', '5366A3', '57A353', 'A35353',
    '7453A3', 'D29034', '06AECC', '838C91'
  ];

  const handleBoardClick = (board: Board) => {
    const boardNameSlug = board.name.toLowerCase().replace(/\s+/g, '-');

    // use the first character ascii code of the board id to determine the color
    const color = `#${colors[board.id.charAt(0).charCodeAt(0) % colors.length]}`;

    navigate(`/board/${boardNameSlug}`, { state: { color, id: board.id } });
  };

  useEffect(() => {
    const jwt = localStorage.getItem('accessToken');
    if (jwt) {
      loadBoards();
    } else {
      console.log('No JWT found. Waiting for it to be set...');
    }
  }, []);

  function onLogout() {
    logout().then(() => navigate('/login'));
  }

  return (
    <HomeLayout onLogout={onLogout}>
      {loading ? (
        <Typography variant="h6" color="white">
          Loading...
        </Typography>
      ) : error ? (
          <Box sx={{ padding: 2, backgroundColor: '#fff', border: '1px solid red', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ color: 'red' }}>
              Error: {error || "Something went wrong!"}
            </Typography>
          </Box>
      ) : (
        <>
          <Typography
            variant="h4"
            color="white"
            sx={{ marginBottom: 4 }}
          >
            My Boards
          </Typography>
          <BoardsCarousel
            boards={boards}
            colors={colors}
            onBoardClick={(board) => handleBoardClick(board)}
            onCreateBoard={(board) => {
              handleCreateBoard(board.name);
            }}
            userId={userId!}
          />
        </>
      )}
    </HomeLayout>
  );
}

export default HomePage;
