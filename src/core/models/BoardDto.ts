import { ColumnDto } from './ColumnDto';
import { Board } from './Board';

export interface BoardDto {
    columns: ColumnDto[];
    board: Board;
}
