import { Directive } from "@angular/core";

@Directive({
    selector: 'a[app-safe-Link]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)',
    }
})
export class SafeLinkDirective {
    constructor(){
        console.log('Safe Link Directive is active!')
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');
        if(wantsToLeave) {
            return;
        }
        event.preventDefault(); // cancel the naviagation click
    }
}