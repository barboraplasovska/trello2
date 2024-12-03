import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomIconButton } from '../../Buttons/CustomIconButton/CustomIconButton';
import { DialogType } from '../../../../core/models/DialogType';
import { CardDto } from '../../../../core/models/CardDto';

type SubAppBarProps = {
  title: string;
  style?: React.CSSProperties;
  onDelete: (type: DialogType, item: string | CardDto | null) => void;
  onEdit: (newTitle: string) => void;
};

export const SubAppBar: React.FC<SubAppBarProps> = ({
  title,
  style,
  onDelete = () => { },
  onEdit = () => { }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    onDelete(DialogType.Board, null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleSubmit = () => {
    if (newTitle.trim() !== title) {
      onEdit(newTitle);
    }
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
          <CustomIconButton icon={<EditIcon />} onClick={handleEditClick} ariaLabel="edit" />
          <CustomIconButton icon={<DeleteIcon />} onClick={handleDeleteClick} ariaLabel="delete" />
        </div>
      </Toolbar>
    </AppBar>
  );
};
