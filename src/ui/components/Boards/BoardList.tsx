import React from 'react';
import { Board } from '../../../core/models/Board';
import { Link } from 'react-router-dom';
import BoardItem from './BoardItem';
import BoardCard from "../Cards/BoardCard/BoardCard";
import {createBoard} from "../../../core/services/BoardService";

interface BoardListProps {
  boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  const createBoardClick = () => {
    console.log("Create Board Button Clicked");
    createBoard("New Board");
  }

  return (
      <div style={styles.boardList}>
        {boards.map((board) => (
            <div key={board.id} style={styles.boardCardWrapper}>
              <Link to={`/board/${board.id}`} style={styles.link}>
                <BoardCard
                    title={board.name}
                    color={"#000000"}
                    onClick={() => {}}
                />
              </Link>
            </div>
        ))}
      </div>
  );
};

const styles = {
  boardList: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  },
  boardCardWrapper: {
    textDecoration: 'none',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default BoardList;
