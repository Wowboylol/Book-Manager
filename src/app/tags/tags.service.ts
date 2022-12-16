import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Tag } from "../shared/tag.model";

export class TagService
{
    tagChange = new EventEmitter<Tag[]>();
    startedEditing = new Subject<number>();
    private tags:Tag[];

	public constructor() 
	{
		this.tags = [new Tag("Tester", 2), new Tag("Testy", 4)];
	}

    public addTag(tag:Tag)
    {
        let nameFound = false;

        for(let i=0; i<this.tags.length; i++)
        {
            if(tag.name == this.tags[i].name)
                nameFound = true;
        }
        if(nameFound == false)
        {
            this.tags.unshift(tag);
            this.tagChange.emit(this.tags.slice());
        }
    }

    public updateTag(index:number, name:string)
    {
        this.tags[index].name = name;
        this.tagChange.emit(this.tags.slice());
    }

    public deleteTag(name:string)
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(name == this.tags[i].name)
            {
                this.tags.splice(i, 1);
                this.tagChange.emit(this.tags.slice());
                break;
            }
        }
    }

    public checkIfTagExists(tagName:string):boolean
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(tagName == this.tags[i].name) return true;
        }
        return false;
    }

    public addMultipleTags(tags:Tag[])
    {
        for(let i=0; i<tags.length; i++)
        {
            this.addTag(tags[i]);
        }
    }

    public getTags():Tag[] { return this.tags.slice(); }
    public getTag(index:number):Tag { return this.tags[index]; }
}