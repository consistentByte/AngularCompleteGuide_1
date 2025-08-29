import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform{
    transform(value: string | number, ...args:any[]) {
        let val: number;
        if(typeof value === 'string') {
            val = parseFloat(value);
        } else {
            val = value;
        }
        const outputTemp = val*(9/5)+32;

        return `${outputTemp} °F`;
    }
    //add PipeTransform to force us write the transform method.
    //All pipe classes need a transform method,and this transform method is executed by angular when we use this pipe in a tempelate.

    // transform function must return the transformed value.
}