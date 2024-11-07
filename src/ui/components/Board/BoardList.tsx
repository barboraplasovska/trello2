import React from 'react';
import { Board } from '../../../core/models/Board';
import { Link } from 'react-router-dom';

interface BoardListProps {
  boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  return (
    <div>
      {boards.map((board) => (
        <div key={board.id}>
          <Link to={`/board/${board.id}`}>
            <h3>{board.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
