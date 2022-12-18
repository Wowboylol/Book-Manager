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
        if(tag.amount == -1)
        {
            tag.amount = 0;
            this.tags.unshift(tag);
            this.tagChange.emit(this.tags.slice());
        }
        else if(tagWithName == null)
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

    // Deletes a tag from the tag list. Precondition: tag must not have books associated with it
    public deleteTag(index:number)
    {
        this.tags.splice(index, 1);
        this.tagChange.emit(this.tags.slice());
    }

    public deleteMultipleTags(indexes:number[])
    {
        for(let i=0; i<indexes.length; i++)
        {
            this.deleteTag(indexes[i]);
        }
    }

    // Decrease tag amount by 1, if amount is 0 then delete tag
    public decreaseTagAmount(tagName:string)
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(tagName == this.tags[i].name)
            {
                this.tags[i].amount--;
                if(this.tags[i].amount <= 0) this.deleteTag(i);
                return;
            }
        }
    }

    // Decrease tag amount then mark them for deletion before deleting them
    public updateAndDeleteTags(tags:Tag[])
    {
        for(let i=0; i<tags.length; i++)
        {
            this.decreaseTagAmount(tags[i].name);
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

    public checkIfTagHasBooks(index:number):boolean
    {
        if(this.tags[index].amount > 0) return true;
    }

    public getTags():Tag[] { return this.tags.slice(); }
    public getTag(index:number):Tag { return this.tags[index]; }
}