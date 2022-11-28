export class Book
{
    public name:string;
    public description:string;
    public imagePath:string;
    public rating:number;

    public constructor(name:string, description:string, imagePath:string, rating:number)
    {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.rating = rating;
    }
}