import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent
{
    @Output() headerSelected = new EventEmitter<string>();
	public collapsed = true;

    public onSelect(selection:string)
    {
        this.headerSelected.emit(selection);
    }
}