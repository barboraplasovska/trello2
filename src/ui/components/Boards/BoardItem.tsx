import { Card, CardContent, Typography } from "@mui/material";
import { Board } from "../../../core/models/Board";

export default function BoardItem({ board } : {board : Board}) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">{board.name}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Créé le {board.createdAt}
                </Typography>
            </CardContent>
        </Card>
    )
}