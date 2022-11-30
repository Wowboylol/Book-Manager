import { EventEmitter } from "@angular/core";
import { Tag } from "../shared/tag.model";

export class TagService
{
    tagChange = new EventEmitter<Tag[]>();
    private tags:Tag[];
    private tagInput:Tag;

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

    public addMultipleTags(tags:Tag[])
    {
        for(let i=0; i<tags.length; i++)
        {
            this.addTag(tags[i]);
        }
    }

    public getTags():Tag[] { return this.tags.slice(); }
    public getTagInput():Tag { return this.tagInput; }
}