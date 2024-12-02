import React, { useEffect, useState } from 'react';
import { BoardDto } from '../../../core/models/BoardDto';
import { getBoardById } from '../../../core/services/BoardService';
import { Typography } from '@mui/material';
import {useParams} from "react-router-dom";
import {BoardListCarousel} from "../../components/Lists/BoardListCarousel/BoardListCarousel";

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
    const [board, setBoard] = useState<BoardDto>(defaultBoard);

    // useEffect(() => {
    //     const fetchBoard = async () => {
    //         await getBoardById(id).then((res) => { setBoard(res)})
    //     }
    //     fetchBoard();
    // }, [id])

    const convertedColumns = board.columns.map((columnDto) => {
        return {
            id: columnDto.column.id, // ID de la colonne
            title: columnDto.column.name, // Nom de la colonne
            tasks: columnDto.cards.map(cardDto => cardDto.card.title) // Titres des cartes dans cette colonne
        };
    });

    return (
        <div>
            <Typography>{board.board.name}</Typography>
            <BoardListCarousel
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
            />
        </div>
    )
}

export default BoardPage;
