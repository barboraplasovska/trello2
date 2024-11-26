import { Card, CardContent, CardHeader } from "@mui/material";
import { ColumnDto } from "../../../core/models/ColumnDto";
import CardList from "./CardList";

export default function ColumnItem({column} : { column : ColumnDto }){
    return (
        <div className="column-item">
            <Card>
                <CardHeader>{column.column.name}</CardHeader>
                <CardContent>
                    <CardList cards={column.cards}/>
                </CardContent>
            </Card>
        </div>
    )
}