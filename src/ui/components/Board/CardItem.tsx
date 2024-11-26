import { Card, CardContent, CardHeader } from "@mui/material";
import { CardDto } from "../../../core/models/CardDto";

export default function CardItem({card } : { card : CardDto }) {
    return (
        <div>
            <Card>
                <CardHeader>{card.card.title}</CardHeader>
                <CardContent>{card.card.body}</CardContent>
            </Card>
        </div>
    )
}