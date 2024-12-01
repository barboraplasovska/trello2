import React, { useState } from 'react';
import { Box } from '@mui/material';
import { ListCard } from '../../Cards/ListCard/ListCard';
import { AddListButton } from '../../Buttons/AddListButton/AddListButton';
import { NewListCard } from '../../Cards/NewListCard/NewListCard';

type BoardListCarouselProps = {
  lists: { id: string; title: string; tasks: string[] }[];
  onMoveListLeft: (index: number) => void;
  onMoveListRight: (index: number) => void;
  onMoveTaskLeft: (listIndex: number, task: string) => void;
  onMoveTaskRight: (listIndex: number, task: string) => void;
  onDeleteList: (listIndex: number) => void;
  onDeleteTask: (listIndex: number, task: string) => void;
  onAddCard: (listIndex: number) => void;
  onUpdateTask: (listIndex: number, taskIndex: number, newTitle: string) => void;
  onUpdateListTitle: (listIndex: number, newTitle: string) => void;
  onCancelAddList: () => void;
  onAddList: (title: string) => void;
};

export const BoardListCarousel: React.FC<BoardListCarouselProps> = ({ 
  lists,
  onMoveListLeft,
  onMoveListRight,
  onMoveTaskLeft,
  onMoveTaskRight,
  onDeleteList,
  onDeleteTask,
  onAddCard,
  onUpdateTask,
  onUpdateListTitle,
  onCancelAddList,
  onAddList,
}) => {

  const [listData, setListData] = useState(lists);
  const [editingTask, setEditingTask] = useState<{ listIndex: number; taskIndex: number } | null>(null);
  const [isAddingList, setIsAddingList] = useState(false); 

  const moveListLeft = (index: number) => {
    if (index === 0) return; 
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index - 1, 0, movedList);
    setListData(newListData);

    onMoveListLeft(index);
  };

  const moveListRight = (index: number) => {
    if (index === listData.length - 1) return; 
    const newListData = [...listData];
    const [movedList] = newListData.splice(index, 1);
    newListData.splice(index + 1, 0, movedList);
    setListData(newListData);

    onMoveListRight(index);
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

      onMoveTaskLeft(listIndex, task);
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

      onMoveTaskRight(listIndex, task);
    }
  };

  const handleDeleteList = (listIndex: number) => {
    const newListData = [...listData];
    newListData.splice(listIndex, 1);
    setListData(newListData);

    onDeleteList(listIndex);
  };

  const handleDeleteTask = (listIndex: number, task: string) => {
    const newListData = [...listData];
    const sourceList = newListData[listIndex];
    const taskIndex = sourceList.tasks.indexOf(task);
    if (taskIndex > -1) {
      sourceList.tasks.splice(taskIndex, 1);
      setListData(newListData);

      onDeleteTask(listIndex, task);
    }
  };

  const handleAddCard = (listIndex: number) => {
    const newListData = [...listData];
    const newTask = '';
    newListData[listIndex].tasks.push(newTask);
    setListData(newListData);

    setEditingTask({ listIndex, taskIndex: newListData[listIndex].tasks.length - 1 });

    onAddCard(listIndex);
  };

  const handleUpdateTask = (listIndex: number, taskIndex: number, newTitle: string) => {
    const newListData = [...listData];
    newListData[listIndex].tasks[taskIndex] = newTitle;
    setListData(newListData);

    setEditingTask(null);

    onUpdateTask(listIndex, taskIndex, newTitle);
  };

  const handleAddList = (title: string) => {
    const newList = {
      id: `list-${listData.length + 1}`,
      title,
      tasks: [],
    };
    setListData([...listData, newList]);
    setIsAddingList(false); 

    onAddList(title);
  };

  const handleCancelAddList = () => {
    setIsAddingList(false);  

    onCancelAddList();
  };

  const handleUpdateListTitle = (listIndex: number, newTitle: string) => {
    const newListData = [...listData];
    newListData[listIndex].title = newTitle;
    setListData(newListData);

    onUpdateListTitle(listIndex, newTitle);
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
          onAddCard={() => handleAddCard(index)}
          onUpdateTask={(taskIndex, newTitle) =>
            handleUpdateTask(index, taskIndex, newTitle)
          }
          editingTask={editingTask?.listIndex === index ? editingTask.taskIndex : null}
          onUpdateListTitle={(newTitle) => handleUpdateListTitle(index, newTitle)}
        />
      ))}
      {isAddingList ? (
        <NewListCard onAddList={handleAddList} onCancel={handleCancelAddList} />
      ) : (
        <AddListButton onClick={() => setIsAddingList(true)} />
      )}
    </Box>
  );
};
