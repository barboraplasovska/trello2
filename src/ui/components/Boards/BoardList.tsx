import React from 'react';
import { Board } from '../../../core/models/Board';
import { Link } from 'react-router-dom';
import BoardItem from './BoardItem';
import BoardCard from "../Cards/BoardCard/BoardCard";
import CreateBoardButton from "../Buttons/CreateBoardButton/CreateBoardButton";
import {createBoard} from "../../../core/services/BoardService";

interface BoardListProps {
  boards: Board[];
}

const BoardList: React.FC<BoardListProps> = ({ boards }) => {
  const handleClick = (id: string) => {
    console.log("Clicked on board with id:", id);
  }

  const createBoardClick = () => {
    console.log("Create Board Button Clicked");
    createBoard("New Board");
  }

  return (
      <div style={styles.boardList}>
        {boards.map((board) => (
            <div key={board.id} style={styles.boardCardWrapper}>
              <Link to={`/boards/${board.id}`} style={styles.link}>
                <BoardCard
                    id={board.id}
                    title={board.name}
                    color={"#000000"}
                    onClick={handleClick}
                />
              </Link>
            </div>
        ))}
        <CreateBoardButton onClick={createBoardClick}/>
      </div>
  );
};

const styles = {
  boardList: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: '16px',
    justifyContent: 'center',
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
