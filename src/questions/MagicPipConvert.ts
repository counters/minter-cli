import {ConvertAmount} from "minter-typescript-sdk";

export class MagicPipConvert {
    private minLength = 12;

    private convertAmount = new ConvertAmount()

    replaceLongNumericStrings(input: any): any {
        if (Array.isArray(input)) {
            return input.map(item => this.replaceLongNumericStrings(item));
        } else if (typeof input === 'object' && input !== null) {
            const result: { [key: string]: any } = {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    result[key] = this.replaceLongNumericStrings(input[key]);
                }
            }
            return result;
        } else if (typeof input === 'string') {

            if (/^\d+$/.test(input) && input.length >= this.minLength) {
                return this.convertAmount.toBip(input);
            }
        }
        return input;

    }
}
