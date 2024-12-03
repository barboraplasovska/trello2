import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ListCard } from '../../Cards/ListCard/ListCard';
import { AddListButton } from '../../Buttons/AddListButton/AddListButton';
import { NewListCard } from '../../Cards/NewListCard/NewListCard';
import { Column } from '../../../../core/models/Column';
import { Card } from '../../../../core/models/Card';

type BoardListCarouselProps = {
  columns: Column[];
  cards: Card[][]; 
  boardId: string;
  onMoveColumnLeft: (index: number) => void;
  onMoveColumnRight: (index: number) => void;
  onMoveCardLeft: (columnIndex: number, card: Card) => void;
  onMoveCardRight: (columnIndex: number, card: Card) => void;
  onDeleteColumn: (columnIndex: number) => void;
  onDeleteCard: (columnIndex: number, cardId: string) => void;
  onAddCard: (columnIndex: number) => void;
  onUpdateCard: (columnIndex: number, cardIndex: number, newTitle: string) => void;
  onUpdateColumnTitle: (columnIndex: number, newTitle: string) => void;
  onCancelAddColumn: () => void;
  onAddColumn: (title: string) => void;
};

export const BoardListCarousel: React.FC<BoardListCarouselProps> = ({
  columns,
  cards,
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
  const [columnData, setColumnData] = useState(columns);
  const [cardData, setCardData] = useState(cards);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [editingTask, setEditingTask] = useState<{ listIndex: number; taskIndex: number } | null>(null);

  // Function to move columns (lists) left
  const moveColumnLeft = (index: number) => {
    if (index === 0) return;
    const newColumnData = [...columnData];
    const [movedColumn] = newColumnData.splice(index, 1);
    newColumnData.splice(index - 1, 0, movedColumn);
    setColumnData(newColumnData);

    onMoveColumnLeft(index);
  };

  // Function to move columns (lists) right
  const moveColumnRight = (index: number) => {
    if (index === columnData.length - 1) return;
    const newColumnData = [...columnData];
    const [movedColumn] = newColumnData.splice(index, 1);
    newColumnData.splice(index + 1, 0, movedColumn);
    setColumnData(newColumnData);
    onMoveColumnRight(index);
  };

  // Function to move cards (tasks) left
  const moveCardLeft = (columnIndex: number, card: Card) => {
    if (columnIndex === 0) return;
    const newCardData = [...cardData];
    const sourceColumn = newCardData[columnIndex];
    const cardIndex = sourceColumn.findIndex(c => c.id === card.id);
    if (cardIndex > -1) {
      sourceColumn.splice(cardIndex, 1);
      newCardData[columnIndex - 1].push(card);
      setCardData(newCardData);

      onMoveCardLeft(columnIndex, card);
    }
  };

  // Function to move cards (tasks) right
  const moveCardRight = (columnIndex: number, card: Card) => {
    if (columnIndex === columnData.length - 1) return;
    const newCardData = [...cardData];
    const sourceColumn = newCardData[columnIndex];
    const cardIndex = sourceColumn.findIndex(c => c.id === card.id);
    if (cardIndex > -1) {
      sourceColumn.splice(cardIndex, 1);
      newCardData[columnIndex + 1].push(card);
      setCardData(newCardData);

      onMoveCardRight(columnIndex, card);
    }
  };

  // Function to delete a column (list)
  const handleDeleteColumn = (columnIndex: number) => {
    const newColumnData = [...columnData];
    newColumnData.splice(columnIndex, 1);
    setColumnData(newColumnData);

    onDeleteColumn(columnIndex);
  };

  // Function to delete a card (task)
  const handleDeleteCard = (columnIndex: number, cardId: string) => {
    const newCardData = [...cardData];
    const sourceColumn = newCardData[columnIndex];
    const cardIndex = sourceColumn.findIndex(c => c.id === cardId);
    if (cardIndex > -1) {
      sourceColumn.splice(cardIndex, 1);
      setCardData(newCardData);

      onDeleteCard(columnIndex, cardId);
    }
  };

  // Function to add a new card (task)
  const handleAddCard = (columnIndex: number) => {
    const newCardData = [...cardData];
    const newCard : Card = {
      id: `card-${newCardData[columnIndex].length + 1}`,
      title: '',
      body: '',
      columnId: columnData[columnIndex].id,
      rank: newCardData[columnIndex].length,
      version: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    newCardData[columnIndex].push(newCard);
    setCardData(newCardData);

    setEditingTask({ listIndex: columnIndex, taskIndex: newCardData[columnIndex].length - 1 });

    onAddCard(columnIndex);
  };

  // Function to update a card's title
  const handleUpdateCard = (columnIndex: number, cardIndex: number, newTitle: string) => {
    const newCardData = [...cardData];
    newCardData[columnIndex][cardIndex].title = newTitle;
    setCardData(newCardData);

    setEditingTask(null);

    onUpdateCard(columnIndex, cardIndex, newTitle);
  };

  // Function to add a new column (list)
  const handleAddColumn = (title: string) => {
    const newColumn = {
      id: `column-${columnData.length + 1}`,
      name: title,
      boardId: boardId,
      rank: columnData.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    setColumnData([...columnData, newColumn]);
    setIsAddingColumn(false);

    onAddColumn(title);
  };

  // Function to cancel adding a new column (list)
  const handleCancelAddColumn = () => {
    setIsAddingColumn(false);
    onCancelAddColumn();
  };

  // Function to update a column's title
  const handleUpdateColumnTitle = (columnIndex: number, newTitle: string) => {
    const newColumnData = [...columnData];
    newColumnData[columnIndex].name = newTitle;
    setColumnData(newColumnData);

    onUpdateColumnTitle(columnIndex, newTitle);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {columnData.map((column, index) => (
        <ListCard
          key={column.id}
          title={column.name}
          tasks={cardData[index]}
          moveListLeft={() => moveColumnLeft(index)}
          moveListRight={() => moveColumnRight(index)}
          canMoveLeft={index > 0}
          canMoveRight={index < columnData.length - 1}
          onMoveTaskLeft={(task) => moveCardLeft(index, task)}
          onMoveTaskRight={(task) => moveCardRight(index, task)}
          onDelete={() => handleDeleteColumn(index)}
          onDeleteTask={(task) => handleDeleteCard(index, task.id)}
          onAddCard={() => handleAddCard(index)}
          onUpdateTask={(taskIndex, newTitle) => handleUpdateCard(index, taskIndex, newTitle)}
          onUpdateListTitle={(newTitle) => handleUpdateColumnTitle(index, newTitle)} 
          editingTask={editingTask?.listIndex === index ? editingTask.taskIndex : null}        
          />
      ))}
      {isAddingColumn ? (
        <NewListCard onAddList={handleAddColumn} onCancel={handleCancelAddColumn} />
      ) : (
        <AddListButton onClick={() => setIsAddingColumn(true)} />
      )}
    </Box>
  );
};
