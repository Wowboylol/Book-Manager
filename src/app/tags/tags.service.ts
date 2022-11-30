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

    public getTags():Tag[] { return this.tags.slice(); }
    public getTagInput():Tag { return this.tagInput; }
}