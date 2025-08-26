import { Directive, input } from "@angular/core";

@Directive({
    selector: 'a[app-safe-Link]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)',
    }
})
export class SafeLinkDirective {
    queryParams = input<string>('myapp', {alias: 'app-safe-link'});

    constructor(){
        console.log('Safe Link Directive is active!')
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');
        if(wantsToLeave) {
            const address = (event.target as HTMLAnchorElement).href;
            (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParams();            
            
            return;
        }
        event.preventDefault(); // cancel the naviagation click
    }
}