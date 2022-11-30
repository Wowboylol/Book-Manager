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
        this.tags.unshift(tag);
        this.tagChange.emit(this.tags.slice());
    }

    public addMultipleTags(tags:Tag[])
    {
        for(let i=0; i<tags.length; i++)
        {
            const searchName = tags[i].name;
            let nameFound = false;

            for(let j=0; j<this.tags.length; j++)
            {
                if(searchName == this.tags[j].name)
                    nameFound = true;
            }

            if(nameFound == false)
                this.addTag(tags[i]);
        }
    }

    public getTags():Tag[] { return this.tags.slice(); }
    public getTagInput():Tag { return this.tagInput; }
}