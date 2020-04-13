import { OPERATOR } from "../enum/Operator";

export interface ISearch {
    filters: Array<{
        field: string;
        operator: OPERATOR;
        or: boolean;
        value: string;
    }>;
    orderBy: Array<{
        asc: true;
        name: string;
    }>;
    page: number;
    size: number;
    skipCount: boolean;
}
