// ui/pages/Board/Board.tsx
import React, { useEffect, useState } from 'react';
import { BoardDto } from '../../../core/models/BoardDto';
import { getBoardById } from '../../../core/services/BoardService';
import { Typography } from '@mui/material';
import ColumnList from '../../components/Board/ColumnList';

const defaultBoard : BoardDto = {
    board: {
        name: 'defaultBoard',
        id: '',
        version: 0,
        createdAt: '',
        updatedAt: '',
        userId: ''
    },
    columns: []
}

function BoardPage(id : string) {
    const [board, setBoard] = useState<BoardDto>(defaultBoard);

    useEffect(() => {
        const fetchBoard = async () => {
            await getBoardById(id).then((res) => { setBoard(res)})
        }
        fetchBoard();
    }, [board])

    return (
        <div>
            <Typography>{board.board.name}</Typography>
            {/* <ColumnList columns={board.columns}/> */}
        </div>
    )
}

export default BoardPage;
