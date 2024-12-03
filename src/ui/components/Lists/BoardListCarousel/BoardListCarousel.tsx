import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { ListCard } from '../../Cards/ListCard/ListCard';
import { AddListButton } from '../../Buttons/AddListButton/AddListButton';
import { NewListCard } from '../../Cards/NewListCard/NewListCard';
import { ColumnDto } from '../../../../core/models/ColumnDto';
import { Card } from '../../../../core/models/Card';
import { CardDto } from '../../../../core/models/CardDto';

type BoardListCarouselProps = {
  columns: ColumnDto[];
  boardId: string;
  onMoveColumnLeft: (index: number) => void;
  onMoveColumnRight: (index: number) => void;
  onMoveCardLeft: (columnIndex: number, card: CardDto) => void;
  onMoveCardRight: (columnIndex: number, card: CardDto) => void;
  onDeleteColumn: (columnId: string) => void;
  onDeleteCard: (card: CardDto) => void;
  onAddCard: (columnIndex: number) => void;
  onUpdateCard: (columnIndex: number, cardIndex: number, newCard: CardDto) => void;
  onUpdateColumnTitle: (columnIndex: number, newTitle: string) => void;
  onCancelAddColumn: () => void;
  onAddColumn: (title: string) => void;
};

export const BoardListCarousel: React.FC<BoardListCarouselProps> = ({
  columns,
  boardId,
  onMoveColumnLeft,
  onMoveColumnRight,
  onMoveCardLeft,
  onMoveCardRight,
  onDeleteColumn,
  onDeleteCard,
  onAddCard,
  onUpdateCard,
  onUpdateColumnTitle,
  onCancelAddColumn,
  onAddColumn,
}) => {
  const [columnData, setColumnData] = useState<ColumnDto[]>([]);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingTask, setEditingTask] = useState<{ listIndex: number; taskIndex: number } | null>(null);

  useEffect(() => {
    const sortedColumns = [...columns].sort((a, b) => a.column.rank - b.column.rank);
    setColumnData(sortedColumns);
  }, [columns]);

  const updateRanks = (updatedColumns: ColumnDto[]) => {
    setColumnData([...updatedColumns].sort((a, b) => a.column.rank - b.column.rank));
  };

  const moveColumnLeft = (index: number) => {
    if (index === 0) return;
    const newColumnData = [...columnData];
    [newColumnData[index - 1], newColumnData[index]] = [
      { ...newColumnData[index - 1], column: { ...newColumnData[index - 1].column, rank: newColumnData[index - 1].column.rank + 1 } },
      { ...newColumnData[index], column: { ...newColumnData[index].column, rank: newColumnData[index].column.rank - 1 } },
    ];
    updateRanks(newColumnData);
    onMoveColumnLeft(index);
  };

  const moveColumnRight = (index: number) => {
    if (index === columnData.length - 1) return;
    const newColumnData = [...columnData];
    [newColumnData[index], newColumnData[index + 1]] = [
      { ...newColumnData[index], column: { ...newColumnData[index].column, rank: newColumnData[index].column.rank + 1 } },
      { ...newColumnData[index + 1], column: { ...newColumnData[index + 1].column, rank: newColumnData[index + 1].column.rank - 1 } },
    ];
    updateRanks(newColumnData);
    onMoveColumnRight(index);
  };

  const moveCardLeft = (columnIndex: number, card: CardDto) => {
    if (columnIndex === 0) return;
    const newColumnData = [...columnData];
    const sourceColumn = newColumnData[columnIndex];
    const destinationColumn = newColumnData[columnIndex - 1];
    const cardIndex = sourceColumn.cards.findIndex(c => c.card.id === card.card.id);

    if (cardIndex > -1) {
      const movedCard = { ...sourceColumn.cards[cardIndex], card: { ...sourceColumn.cards[cardIndex].card, rank: destinationColumn.cards.length } };
      sourceColumn.cards.splice(cardIndex, 1);
      destinationColumn.cards.push(movedCard);

      updateRanks(newColumnData);
      onMoveCardLeft(columnIndex, card);
    }
  };

  const moveCardRight = (columnIndex: number, card: CardDto) => {
    if (columnIndex === columnData.length - 1) return;
    const newColumnData = [...columnData];
    const sourceColumn = newColumnData[columnIndex];
    const destinationColumn = newColumnData[columnIndex + 1];
    const cardIndex = sourceColumn.cards.findIndex(c => c.card.id === card.card.id);

    if (cardIndex > -1) {
      const movedCard = { ...sourceColumn.cards[cardIndex], card: { ...sourceColumn.cards[cardIndex].card, rank: destinationColumn.cards.length } };
      sourceColumn.cards.splice(cardIndex, 1);
      destinationColumn.cards.push(movedCard);

      updateRanks(newColumnData);
      onMoveCardRight(columnIndex, card);
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    const newColumnData = columnData.filter((column) => column.column.id !== columnId);
    updateRanks(newColumnData);
    onDeleteColumn(columnId);
  };

  const handleDeleteCard = async (card: CardDto) => {
    const newColumnData = columnData.map((column) => {
      if (column.column.id === card.card.columnId) {
        return {
          ...column,
          cards: column.cards.filter((c) => c.card.id !== card.card.id),
        };
      }
      return column;
    });
    updateRanks(newColumnData);
    onDeleteCard(card);
  };

  const handleAddCard = (columnIndex: number) => {
    const newColumnData = [...columnData];
    const newCard: Card = {
      id: `card-${newColumnData[columnIndex].cards.length + 1}`,
      title: '',
      body: '',
      columnId: newColumnData[columnIndex].column.id,
      rank: newColumnData[columnIndex].cards.length,
      version: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    newColumnData[columnIndex].cards.push({ card: newCard, boardId });
    updateRanks(newColumnData);
    setEditingTask({ listIndex: columnIndex, taskIndex: newCard.rank });
    onAddCard(columnIndex);
  };

  const handleAddColumn = (title: string) => {
    const newColumn: ColumnDto = {
      column: {
        id: `column-${columnData.length + 1}`,
        name: title,
        boardId,
        rank: columnData.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 1,
      },
      cards: [],
    };

    const newColumnData = [...columnData, newColumn];
    updateRanks(newColumnData);
    setIsAddingColumn(false);
    onAddColumn(title);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      {columnData.map((columnDto, index) => (
        <ListCard
          key={columnDto.column.id}
          title={columnDto.column.name}
          cards={columnDto.cards ?? []}
          moveListLeft={() => moveColumnLeft(index)}
          moveListRight={() => moveColumnRight(index)}
          canMoveLeft={index > 0}
          canMoveRight={index < columnData.length - 1}
          onMoveCardLeft={(card: CardDto) => moveCardLeft(index, card)}
          onMoveCardRight={(card: CardDto) => moveCardRight(index, card)}
          onDelete={() => handleDeleteColumn(columnDto.column.id)}
          onDeleteCard={(card: CardDto) => handleDeleteCard(card)}
          onAddCard={() => handleAddCard(index)}
          onUpdateCard={(taskIndex, newCard) => onUpdateCard(index, taskIndex, newCard)}
          onUpdateListTitle={(newTitle) => onUpdateColumnTitle(index, newTitle)}
          editingTask={editingTask?.listIndex === index ? editingTask.taskIndex : null}
        />
      ))}
      {isAddingColumn ? (
        <NewListCard onAddList={handleAddColumn} onCancel={() => setIsAddingColumn(false)} />
      ) : (
        <AddListButton onClick={() => setIsAddingColumn(true)} />
      )}
    </Box>
  );
};
