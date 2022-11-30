import { Book } from "../books/book.model";

export class SearchService
{
    private searchResult:Book[];

    public constructor()
    {
        this.searchResult = [];
    }
}