import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ListCard } from '../../Cards/ListCard/ListCard';
import { AddListButton } from '../../Buttons/AddListButton/AddListButton';

type BoardListCarouselProps = {
  lists: { id: string; title: string; tasks: string[] }[];
};

export const BoardListCarousel: React.FC<BoardListCarouselProps> = ({ lists }) => {
  const [listData, setListData] = useState(lists);

  // Move the list to the left
  const moveListLeft = (index: number) => {
    if (index === 0) return; // If it's the first list, we can't move it left
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index - 1, 0, movedList);
    setListData(newListData);
  };

  // Move the list to the right
  const moveListRight = (index: number) => {
    if (index === listData.length - 1) return; // If it's the last list, we can't move it right
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index + 1, 0, movedList);
    setListData(newListData);
  };

  // Move the task to the left in a list
  const moveTaskLeft = (listIndex: number, task: string) => {
    if (listIndex === 0) return;
    const newListData = [...listData];
    const sourceList = newListData[listIndex];
    const taskIndex = sourceList.tasks.indexOf(task);
    if (taskIndex > -1) {
      sourceList.tasks.splice(taskIndex, 1);
      newListData[listIndex - 1].tasks.push(task);
      setListData(newListData);
    }
  };

  // Move the task to the right in a list
  const moveTaskRight = (listIndex: number, task: string) => {
    if (listIndex === listData.length - 1) return;
    const newListData = [...listData];
    const sourceList = newListData[listIndex];
    const taskIndex = sourceList.tasks.indexOf(task);
    if (taskIndex > -1) {
      sourceList.tasks.splice(taskIndex, 1);
      newListData[listIndex + 1].tasks.push(task);
      setListData(newListData);
    }
  };

  // Handle list deletion
  const handleDeleteList = (listIndex: number) => {
    const newListData = [...listData];
    newListData.splice(listIndex, 1);
    setListData(newListData);
  };

  // Handle task deletion
  const handleDeleteTask = (listIndex: number, task: string) => {
    const newListData = [...listData];
    const sourceList = newListData[listIndex];
    const taskIndex = sourceList.tasks.indexOf(task);
    if (taskIndex > -1) {
      sourceList.tasks.splice(taskIndex, 1);
      setListData(newListData);
    }
  };

  // Handle adding a card (this is just a placeholder)
  const handleAddCard = () => {
    console.log('Add card clicked');
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {listData.map((list, index) => (
        <ListCard
          key={list.id}
          title={list.title}
          tasks={list.tasks}
          moveListLeft={() => moveListLeft(index)}
          moveListRight={() => moveListRight(index)}
          canMoveLeft={index > 0}
          canMoveRight={index < listData.length - 1}
          onMoveTaskLeft={(task) => moveTaskLeft(index, task)}
          onMoveTaskRight={(task) => moveTaskRight(index, task)}
          onDelete={() => handleDeleteList(index)} 
          onDeleteTask={(task) => handleDeleteTask(index, task)} 
          onAddCard={handleAddCard}
        />
      ))}
      <AddListButton onClick={handleAddCard} />
    </Box>
  );
};
