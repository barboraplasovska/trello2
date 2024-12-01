import React, { useEffect } from 'react';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import BoardList from '../../components/Boards/BoardList';
import BoardsCarousel from "../../components/Lists/BoardsCarousel/BoardsCarousel";

function HomePage() {
  const { boards, loading, error, loadBoards } = useBoardsViewModel();

  useEffect(() => {
    loadBoards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div>
        <h1>My Boards</h1>
        {/* <BoardsCarousel boards={boards} colors={} onBoardClick={} onCreateBoard={}/> */}
      </div>
  );
}

export default HomePage;
