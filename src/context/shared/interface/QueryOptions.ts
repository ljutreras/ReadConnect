export interface QueryOptions {
    table: string;
    columns: string[];
    values: number[];
    constants: any[];
}

export interface InsertBook {
    table: string,
    column: string,
    book: any,
    columnWhere: any,
    pathParams: string,
}
