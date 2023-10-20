export interface IBooks {
    _id:              number;
    title:            string;
    isbn:             string;
    pageCount:        number;
    publishedDate:    PublishedDate;
    thumbnailUrl:     string;
    shortDescription: string;
    longDescription:  string;
    status:           string;
    authors:          string[];
    categories:       string[];
}

export interface PublishedDate {
    $date: string;
}
