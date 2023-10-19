export interface InsertOptions {
    table: string;
    columns: string[];
    values: string[];
    constants: any[];
}

export interface QueryOptions {
    table: string;
    columns: string[];
    values: number[];
    constants: any[];
}
