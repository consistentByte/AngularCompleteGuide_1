import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform{
    transform(value: any, ...args:any[]) {
        return value + '-transform'
    }
    //add PipeTransform to force us write the transform method.
    //All pipe classes need a transform method,and this transform method is executed by angular when we use this pipe in a tempelate.

    // transform function must return the transformed value.
}