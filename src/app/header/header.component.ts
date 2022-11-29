import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent
{
    @Output() selectedHeader = new EventEmitter<string>();
	public collapsed = true;

    public onSelect(selection:string)
    {
        this.selectedHeader.emit(selection);
    }
}