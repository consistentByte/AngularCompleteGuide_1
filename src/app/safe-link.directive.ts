import { Directive } from "@angular/core";

@Directive({
    selector: 'a[app-safe-Link]',
    standalone: true,
})
export class SafeLinkDirective {
    constructor(){
        console.log('Safe Link Directive is active!')
    }
}