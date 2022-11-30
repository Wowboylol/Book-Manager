import { Component, ElementRef, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Tag } from 'src/app/shared/tag.model';

@Component({
	selector: 'app-tag-edit',
	templateUrl: './tag-edit.component.html',
	styleUrls: ['./tag-edit.component.css']
})

export class TagEditComponent implements OnInit 
{
	@ViewChild('nameInput') nameInputRef:ElementRef;
	@Output() tagAdded = new EventEmitter<Tag>();

	public constructor() {}

	ngOnInit(): void {}

	public onAddTag()
	{
		const tagName = this.nameInputRef.nativeElement.value;
		const newTag = new Tag(tagName, 0);
		this.tagAdded.emit(newTag);
	}
}
