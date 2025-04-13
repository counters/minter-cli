import {Option, CommandRunner, SubCommand} from 'nest-commander';
import {MinterApiService} from '../../services/minter-api/minter-api.service';
import {JsonPatches} from "../../utils/JsonPatches";

import {search} from 'jmespath'
import {MagicPipConvert} from "../../questions/MagicPipConvert";

// import * as jmespath from 'jmespath'

@SubCommand({
    name: 'candidate',
    arguments: '<public_key>',
    argsDescription: {public_key: 'Public key'},
    description: 'Candidate returns candidate’s info by provided public key',
})
export class CandidateCommand extends CommandRunner {

    constructor() {
        super();
    }

    async run(
        inputs: string[],
        options: {
            height?: number;
            not_show_stakes?: boolean;
            config: string;
            patch?: string;
            patches: boolean;
            pretty: boolean
        },
    ): Promise<void> {
        // const {patch, config} = options;
        const candidate = inputs[0];
        const minterApi = new MinterApiService(options.config);

        minterApi.api().getCandidateGrpc(candidate, options.not_show_stakes, options.height).then((r) => {
                const result = r.toObject()
                let out: any;
                // const mpc = new MagicPipConvert()
                if (options.patches) {
                    new JsonPatches().printPropertyNames(result)
                } else if (options.patch && options.patch.length > 0) {
                    // out=result[options.patch]
                    out = search(result, options.patch)
                } else {
                    out = result
                }
                out = new MagicPipConvert().replaceLongNumericStrings(out)
                if (!options.pretty) {
                    process.stdout.write(JSON.stringify(out));
                } else {
                    console.warn((out))
                    // console.warn(out)
                }
            }
        )
            .catch(console.log);
        return Promise.resolve(undefined);
    }

    @Option({
        flags: '--height [number]',
        name: 'Height',
        description:
            'Blockchain state height for the current request. Optional, the last default state of the node is used',
    })
    parseNumber(val: string): number {
        return Number(val);
    }

    @Option({
        flags: '--not_show_stakes [boolean]',
        description:
            'Do not display a list of steaks. Note: used_slots, uniq_users, min_stake will be filled',
        defaultValue: true,
    })
    parseBoolean(val: string): boolean {
        return JSON.parse(val);
    }

    @Option({
        flags: '-c, --config [string]',
        description: 'path to config file',
        defaultValue: 'config.yml',
    })
    parseConfig(val: string): string {
        return val;
    }

    @Option({
        flags: '-p, --patch [string]',
        description: 'path JMESPath format',
        // defaultValue: 'status',
    })
    parsePatch(val: string): string {
        return val;
    }

    @Option({
        flags: '-pl, --patches [boolean]',
        description: 'list of patches',
        // defaultValue: false,
    })
    parsePatches(val: string): boolean {
        return JSON.parse(val);
    }

    @Option({
        flags: '--pretty [boolean]',
        description: 'Pretty',
        defaultValue: true,
    })
    parsePretty(val: string): boolean {
        return JSON.parse(val);
    }
}
