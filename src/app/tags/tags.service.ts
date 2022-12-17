import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Tag } from "../shared/tag.model";

export class TagService
{
    tagChange = new EventEmitter<Tag[]>();
    startedEditing = new Subject<number>();
    private tags:Tag[] = [];

    // Checks if tag exists in tag list, if it does increase count, otherwise add new tag
    // Function returns the updated pre-existing tag, or returns the new tag
    public addTag(tag:Tag):Tag
    {
        let tagWithName:Tag = null;

        for(let i=0; i<this.tags.length; i++)
        {
            if(tag.name == this.tags[i].name)
                tagWithName = this.tags[i];
        }
        if(tagWithName == null)
        {
            tagWithName = new Tag(tag.name, 1);
            this.tags.unshift(tagWithName);
            this.tagChange.emit(this.tags.slice());
        }
        else
        {
            tagWithName.amount++;
            this.tagChange.emit(this.tags.slice());
        }
        return tagWithName;
    }

    public addMultipleTags(tags:Tag[]):Tag[]
    {
        let retTags:Tag[] = [];
        for(let i=0; i<tags.length; i++)
        {
            retTags.push(this.addTag(tags[i]));
        }
        return retTags;
    }

    public updateTag(index:number, name:string)
    {
        this.tags[index].name = name;
        this.tagChange.emit(this.tags.slice());
    }

    // Deletes tag completely, regardless of amount
    public deleteTag(index:number)
    {
        this.tags.splice(index, 1);
        this.tagChange.emit(this.tags.slice());
    }

    // Deletes tag only if tag amount == 1, else decrease tag amount
    public decreaseTagAmount(tag:Tag)
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(tag.name = this.tags[i].name)
            {
                this.tags[i].amount--;
                if(this.tags[i].amount <= 0) this.deleteTag(i);
            }
        }
    }

    public decreaseMultipleTagAmount(tags:Tag[]) { for(let tag of tags) this.decreaseTagAmount(tag); }

    public checkIfTagExists(tagName:string):boolean
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(tagName == this.tags[i].name) return true;
        }
        return false;
    }

    public getTags():Tag[] { return this.tags.slice(); }
    public getTag(index:number):Tag { return this.tags[index]; }
}