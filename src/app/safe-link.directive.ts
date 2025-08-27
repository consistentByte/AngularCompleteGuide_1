import { Directive, ElementRef, inject, input } from "@angular/core";
import { LogDirective } from "./log.directive";

@Directive({
    selector: 'a[app-safe-Link]',
    standalone: true,
    hostDirectives: [LogDirective],
    host: {
        '(click)': 'onConfirmLeavePage($event)',
    }
})
export class SafeLinkDirective {
    queryParams = input<string>('myapp', {alias: 'app-safe-Link'});
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef); 
    //Here we are letting angular know the return type, 
    // inject(ElementRef) lets us access host element in ts file programmatically, 
    // <ElementRef<HTMLAnchorElement>> here we are passing the expected return type, ElementRef is just a wrapper around the actual return element
    // Since we knw we use this directive on only Anchor Element so, host element will be HTMLAnchorElement.

    constructor(){
        console.log('Safe Link Directive is active!')
    }

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm('Do you want to leave the app?');
        if(wantsToLeave) {
            // const address = (event.target as HTMLAnchorElement).href;
            // (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParams();            
            
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParams();
            return;
        }
        event.preventDefault(); // cancel the naviagation click
    }
}