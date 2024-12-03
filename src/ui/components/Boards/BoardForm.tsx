"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createBoard } from "../../../core/services/BoardService";

export default function BoardForm() {
    const [formData, setFormData] = useState({
        name: "",
      });
    const [ error, setError ] = useState<string|null>(null);

    const handleChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    }

    const handleSubmit = async () => {

        const { name } = formData
        if (!name)
            return;
        await createBoard(name).catch(err => setError(err)).finally(() => setFormData({ name: ""}))
    }

    return (
        <Box className="create-new-board">
            {error && <Typography className="form-error">{error}</Typography>}
    
            <TextField
                label="Board Name"
                name="board_name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
            />
            <Button type="submit" variant="contained" className="submit-button" onClick={handleSubmit}>
              Sign up!
            </Button>
        </Box>
    )
}