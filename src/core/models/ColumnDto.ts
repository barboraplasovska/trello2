import { Column } from './Column';
import { CardDto } from './CardDto';

export interface ColumnDto {
    column: Column;
    cards: CardDto[];
}
