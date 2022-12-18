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
        console.log(this.tags);
        return retTags;
    }

    public updateTag(index:number, name:string)
    {
        this.tags[index].name = name;
        this.tagChange.emit(this.tags.slice());
    }

    // Deletes tag completely only if tag amount == 0, returns whether a tag is successfully deleted or not
    public deleteTag(index:number):boolean
    {
        if(this.tags[index].amount <= 0)
        {
            this.tags.splice(index, 1);
            this.tagChange.emit(this.tags.slice());
            return true;
        }
        return false;
    }

    public deleteMultipleTags(indexes:number[])
    {
        for(let i=0; i<indexes.length; i++)
        {
            this.deleteTag(indexes[i]);
        }
    }

    // Decrease tag amount by 1
    public decreaseTagAmount(tagName:string)
    {
        for(let i=0; i<this.tags.length; i++)
        {
            if(tagName == this.tags[i].name)
            {
                this.tags[i].amount--;
                // this.tagChange.emit(this.tags.slice());
                return;
            }
        }
    }

    // Mark tags that have amount <= 0 as to delete and return the index of those tags
    public markTagsToDelete():number[]
    {
        let tagsToDelete:number[] = [];

        for(let i=0; i<this.tags.length; i++)
        {
            if(this.tags[i].amount <= 0)
            {
                tagsToDelete.push(i);
            }
        }
        return tagsToDelete;
    }

    // Decrease tag amount then mark them for deletion before deleting them
    public updateAndDeleteTags(tags:Tag[])
    {
        for(let i=0; i<tags.length; i++)
        {
            this.decreaseTagAmount(tags[i].name);
        }
        const tagsToDelete = this.markTagsToDelete();
        this.deleteMultipleTags(tagsToDelete);
    }

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