import {Command, CommandRunner} from 'nest-commander';
import {readFile} from 'fs/promises';

@Command({
    name: "version",
    description: 'version app'
})
export class VersionCommand extends CommandRunner {
    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        const version = await this.getVersion();
        // console.log(passedParams);
        console.log(`minter-cli version ${version}`);
        // process.stdout.write(`minter-cli version ${version}`);
        return Promise.resolve(undefined);
    }

    /*  @Option({
            flags: '--version [boolean]',
            description:
                ' ',
            defaultValue: true,
        })
        parseBoolean(val: string): boolean {
            return JSON.parse(val);
        }*/

    async getVersion(): Promise<string> {
        const packageJson = JSON.parse(await readFile(__dirname+'/../../package.json', 'utf-8'));
        return packageJson.version;
    }
}
