import React, { useEffect, useState } from 'react';
import { BoardDto } from '../../../core/models/BoardDto';
import { getBoardById } from '../../../core/services/BoardService';
import { Typography } from '@mui/material';
import {useLocation, useParams} from "react-router-dom";
import {BoardListCarousel} from "../../components/Lists/BoardListCarousel/BoardListCarousel";
import BoardLayout from '../../components/Layouts/BoardLayout';

const defaultBoard : BoardDto = {
    board: {
        name: '',
        id: '',
        version: 0,
        createdAt: '',
        updatedAt: '',
        userId: ''
    },
    columns: []
}

function BoardPage() {
    const { name } = useParams<{ name: string }>();

    const location = useLocation();
  
    const { color, board } = location.state || {};
    console.log(color);
  
    //const [board, setBoard] = useState<BoardDto>(defaultBoard);

    var title = "";

    // useEffect(() => {
    //     const fetchBoard = async () => {
    //         await getBoardById(id).then((res) => { setBoard(res)})
    //     }
    //     fetchBoard();
    // }, [id])

    // const convertedColumns = board.columns.map((columnDto) => {
    //     return {
    //         id: columnDto.column.id, // ID de la colonne
    //         title: columnDto.column.name, // Nom de la colonne
    //         tasks: columnDto.cards.map(cardDto => cardDto.card.title) // Titres des cartes dans cette colonne
    //     };
    // });

    const handleEditBoard = () => {
        console.log('Edit board');
    }

    const handleDeleteBoard = () => {
        console.log('Delete board');
    }

    const onLogout = () => {
        console.log('Logout');
    }

    return (
        <BoardLayout
              color={color}
              title={board.name}
              onEdit={handleEditBoard}
              onDelete={handleDeleteBoard}
              onLogout={onLogout}
            >
                <Typography variant="h6" color="white">h</Typography>
            {/* <BoardListCarousel
                lists={convertedColumns}
                onMoveListLeft={() => {}}
                onMoveListRight={() => {}}
                onMoveTaskLeft={() => {}}
                onMoveTaskRight={() => {}}
                onDeleteList={() => {}}
                onDeleteTask={() => {}}
                onAddCard={() => {}}
                onUpdateTask={() => {}}
                onUpdateListTitle={() => {}}
                onCancelAddList={() => {}}
                onAddList={() => {}}
            /> */}
        </BoardLayout>
    )
}

export default BoardPage;
