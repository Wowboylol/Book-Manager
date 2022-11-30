import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Tag } from 'src/app/shared/tag.model';
import { TagService } from '../tags.service';

@Component({
	selector: 'app-tag-edit',
	templateUrl: './tag-edit.component.html',
	styleUrls: ['./tag-edit.component.css']
})

export class TagEditComponent implements OnInit 
{
	@ViewChild('nameInput') nameInputRef:ElementRef;
	private _tagService:TagService;

	public constructor(tagService:TagService) 
	{
		this._tagService = tagService;
	}

	ngOnInit(): void {}

	public onAddTag()
	{
		const tagName = this.nameInputRef.nativeElement.value;
		const newTag = new Tag(tagName, 0);
		this._tagService.addTag(newTag);
	}
}
