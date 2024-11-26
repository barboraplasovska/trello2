import React, { useEffect } from 'react';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import BoardList from '../../components/Boards/BoardList';

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
      <BoardList boards={boards} />
    </div>
  );
}

export default HomePage;
