import { ColumnDto } from "../../../core/models/ColumnDto";
import ColumnItem from "./ColumnItem";
import React from "react";
import {Card} from "@mui/material";

export default function ColumnList({columns } : { columns : ColumnDto[] }) {
    return (
        <Card>
            {columns.map((column) => (
                <ColumnItem key={column.column.id} column={column}/>
            ))}
        </Card>
    )
}