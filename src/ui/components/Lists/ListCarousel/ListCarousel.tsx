import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ListCard } from '../../Cards/ListCard/ListCard';
import { AddListButton } from '../../Buttons/AddListButton/AddListButton'; 

type ListCarouselProps = {
  lists: { id: string; title: string; tasks: string[] }[];
};

export const ListCarousel: React.FC<ListCarouselProps> = ({ lists }) => {
  const [listData, setListData] = useState(lists);

  const moveListLeft = (index: number) => {
    if (index === 0) return; 
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index - 1, 0, movedList);
    setListData(newListData);
  };

  const moveListRight = (index: number) => {
    if (index === listData.length - 1) return; 
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index + 1, 0, movedList);
    setListData(newListData);
  };

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

  // Placeholder function for required props on ListCard
  const handleAddCard = () => {
    console.log('Add card clicked');
  };

  const handleArrowClick = () => {
    console.log('Arrow clicked');
  };

  const handleMoreClick = () => {
    console.log('More clicked');
  };

  const handleAddList = () => {
    const newList = {
      id: `${Date.now()}`,
      title: 'New List',
      tasks: [],
    };
    setListData([...listData, newList]);
  };

  return (
    <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2 }}>
      {listData.map((list, index) => (
        <ListCard
          key={list.id}
          title={list.title}
          tasks={list.tasks}
          onAddCard={handleAddCard}
          onArrowClick={handleArrowClick}
          onMoreClick={handleMoreClick}
          moveListLeft={() => moveListLeft(index)}
          moveListRight={() => moveListRight(index)}
          canMoveLeft={index > 0}
          canMoveRight={index < listData.length - 1}
          onMoveTaskLeft={(task) => moveTaskLeft(index, task)}
          onMoveTaskRight={(task) => moveTaskRight(index, task)}
        />
      ))}
      <AddListButton onClick={handleAddList} /> 
    </Box>
  );
};
