import {ConvertAmount} from "minter-typescript-sdk";
import {Injectable} from "@nestjs/common";

@Injectable()
export class MagicPipConvert {
    private minLength = 12;
    private convertAmount = new ConvertAmount()

    mbPipToBip(input: any): any {
        if (Array.isArray(input)) {
            return input.map(item => this.mbPipToBip(item));
        } else if (typeof input === 'object' && input !== null) {
            const result: { [key: string]: any } = {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    result[key] = this.mbPipToBip(input[key]);
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
