import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type SubAppBarProps = {
  title: string;
  style?: React.CSSProperties;
  onDelete: () => void;
  onEdit: (newTitle: string) => void;
};

export const SubAppBar: React.FC<SubAppBarProps> = ({ title, style, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    onEdit(newTitle);
    setIsEditing(false);
  };

  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        ...style,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isEditing ? (
          <TextField
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
            }}
            variant="outlined"
            size="small"
            sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: 1 }}
          />
        ) : (
          <Typography variant="h6" sx={{ color: 'white' }}>
            {title}
          </Typography>
        )}

        <div>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleEditClick}
            sx={{ marginRight: 2 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" color="inherit" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};
