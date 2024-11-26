import { ColumnDto } from "../../../core/models/ColumnDto";
import ColumnItem from "./ColumnItem";

export default function ColumnList({columns } : { columns : ColumnDto[] }) {
    return columns.map((column) => <ColumnItem column={column}/>)
}