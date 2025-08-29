import { output, Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temp',
    standalone: true
})
export class TemperaturePipe implements PipeTransform{
    // if we chained with number pipe, output of number is of type string or null, and output of that will be input of temp pipe, so making it flexible.
    transform(value: string | number | null, inputType: 'cel' | 'fah', outputType?: 'cel' | 'fah') {
        if(!value) {
            return value;
        }

        let val: number;
        if(typeof value === 'string') {
            val = parseFloat(value);
        } else {
            val = value;
        }
        let outputTemp:number;
        if(inputType === 'cel' && outputType === 'fah') {
            outputTemp = val*(9/5)+32;
        } else if(inputType === 'fah' && outputType === 'cel') {
            outputTemp = (val-32)*(5/9);
        } else {
            outputTemp = val;
        }
        let symbol: '°F' | '°C';
        
        if(!outputType) {
            symbol = inputType === 'cel' ? '°C' : '°F';
        } else{
            symbol = outputType === 'cel' ? '°C' : '°F';
        }

        return `${outputTemp.toFixed(2)} ${symbol}`;
    }
    //add PipeTransform to force us write the transform method.
    //All pipe classes need a transform method,and this transform method is executed by angular when we use this pipe in a tempelate.

    // transform function must return the transformed value.
}