import { Column } from './Column';

export interface StatusObjectColumn {
    message: string;
    status: string;
    resource: Column;
}
