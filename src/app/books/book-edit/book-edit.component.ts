import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-book-edit',
	templateUrl: './book-edit.component.html',
	styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit 
{
	private route: ActivatedRoute;
	private _bookID:number;
	private _editMode:boolean;

	constructor(route:ActivatedRoute) 
	{ 
		this.route = route;
		this._editMode = false;
	}

	ngOnInit(): void 
	{
		this.route.params.subscribe(params => 
		{
			this._bookID = +params['id'];
			this._editMode = params['id'] != null;
		});
	}

}
