import React, { useEffect, useState } from 'react';
import { BoardDto } from '../../../core/models/BoardDto';
import { getBoardById } from '../../../core/services/BoardService';
import { Typography } from '@mui/material';
import { useLocation, useParams } from "react-router-dom";
import { BoardListCarousel } from "../../components/Lists/BoardListCarousel/BoardListCarousel";
import BoardLayout from '../../components/Layouts/BoardLayout';
import { Card } from '../../../core/models/Card';
import { useBoardsViewModel } from '../../viewmodels/useBoardsViewModel';
import { CardDto } from '../../../core/models/CardDto';

const defaultBoard: BoardDto = {
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

    const { color, id } = location.state || {};

    const {
        selectedBoard,
        loadBoardById,
        loading,
        error,
    } = useBoardsViewModel();

    useEffect(() => {
        if (id && (!selectedBoard || selectedBoard.board.id !== id)) {
            loadBoardById(id);
        }
    }, [id, selectedBoard, loadBoardById]);


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
            title={selectedBoard?.board.name ?? "No name"}
            onEdit={handleEditBoard}
            onDelete={handleDeleteBoard}
            onLogout={onLogout}
        >
            <BoardListCarousel
                columns={selectedBoard?.columns ?? []}
                boardId={id} onMoveColumnLeft={function (index: number): void {
                    throw new Error('Function not implemented.');
                }} onMoveColumnRight={function (index: number): void {
                    throw new Error('Function not implemented.');
                }} onMoveCardLeft={function (columnIndex: number, card: CardDto): void {
                    throw new Error('Function not implemented.');
                }} onMoveCardRight={function (columnIndex: number, card: CardDto): void {
                    throw new Error('Function not implemented.');
                }} onDeleteColumn={function (columnIndex: number): void {
                    throw new Error('Function not implemented.');
                }} onDeleteCard={function (columnIndex: number, cardId: string): void {
                    throw new Error('Function not implemented.');
                }} onAddCard={function (columnIndex: number): void {
                    throw new Error('Function not implemented.');
                }} onUpdateCard={function (columnIndex: number, cardIndex: number, newCard: CardDto): void {
                    throw new Error('Function not implemented.');
                }} onUpdateColumnTitle={function (columnIndex: number, newTitle: string): void {
                    throw new Error('Function not implemented.');
                }} onCancelAddColumn={function (): void {
                    throw new Error('Function not implemented.');
                }} onAddColumn={function (title: string): void {
                    throw new Error('Function not implemented.');
                }}
            />
        </BoardLayout>
    )
}

export default BoardPage;
