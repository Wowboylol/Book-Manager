import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective
{
    // Binds directives to host class 'open' and toggles based on isOpen variable
    @HostBinding('class.open') isOpen = false;

    // Listens to click event of host and runs toggleOpen function
    @HostListener('click') toggleOpen() 
    {
        this.isOpen = !this.isOpen;
    }
}