import React from 'react';
import { Board } from '../../../core/models/Board';
import { Link } from 'react-router-dom';
import BoardItem from './BoardItem';

interface BoardListProps {
  boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  return (
    <div>
      {boards.map((board) => (
        <div key={board.id}>
          <Link to={`/board/${board.id}`}>
            <BoardItem board={board}/>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
