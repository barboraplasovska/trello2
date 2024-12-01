// ui/pages/Board/Board.tsx
import React, { useEffect, useState } from 'react';
import { BoardDto } from '../../../core/models/BoardDto';
import { getBoardById } from '../../../core/services/BoardService';
import { Typography } from '@mui/material';
import ColumnList from '../../components/Board/ColumnList';
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
    const { id } = useParams<{ id: string }>();
    const [board, setBoard] = useState<BoardDto>(defaultBoard);

    useEffect(() => {
        const fetchBoard = async () => {
            await getBoardById(id).then((res) => { setBoard(res)})
        }
        fetchBoard();
    }, [id])

    return (
        <div>
            <Typography>{board.board.name}</Typography>
            {/* <BoardListCarousel lists={convertedColumns}/> */}
        </div>
    )
}

export default BoardPage;
