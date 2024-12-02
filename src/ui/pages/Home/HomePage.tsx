import React, { useEffect } from 'react';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import BoardsCarousel from "../../components/Lists/BoardsCarousel/BoardsCarousel";
import { Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Board } from '../../../core/models/Board';

function HomePage() {
  const { 
    boards, 
    loading, 
    error, 
    userId, 
    loadBoards, 
    handleCreateBoard, 
    handleDeleteBoard,
    handleUpdateBoard 
  } = useBoardsViewModel();

  const navigate = useNavigate();

  const handleBoardClick = (board: Board) => {
    navigate(`/boards/${board.name.toLowerCase().replace(/\s/g, '-')}`);
  };

  const colors = [
    'A3537A', '5366A3', '57A353', 'A35353',
    '7453A3', 'D29034', '06AECC', '838C91'
  ];

  useEffect(() => {
    const jwt = localStorage.getItem('accessToken');
    if (jwt) {
      loadBoards();
    } else {
      console.log('No JWT found. Waiting for it to be set...');
    }
  }, []);

  return (
    <>
      {loading ? (
        <Typography variant="h6" color="white">
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" color="error">
          {error}
        </Typography>
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
    </>
  );
}

export default HomePage;
