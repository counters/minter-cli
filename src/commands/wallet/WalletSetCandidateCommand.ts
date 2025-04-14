import {
    CommandRunner,
    InquirerService,
    Option,
    SubCommand,
} from 'nest-commander';
import {
    Minter,
    TX_TYPE,
} from 'minter-js-sdk';
import {ConfigMinterService} from '../../services/config/minter/config-minter.service';
import {Wallet} from '../../core/Wallet';
import {
    CANCEL_MESSAGE,
    ConfirmQuestion,
} from '../../questions/ConfirmQuestion';
import {ContentExporter} from "../../services/ContentExporter";

@SubCommand({
    name: 'set_candidate',
    arguments: '<public_key>, <action>',
    argsDescription: {
        public_key: 'Candidate publicKey Mp...',
        action: 'on, off'
    },
    description: 'Set candidate on',
})
export class WalletSetCandidateCommand extends CommandRunner {
    private minter: Minter;
    private interactive = true;

    constructor(private readonly inquirer: InquirerService, private contentExporter: ContentExporter) {
        super();
    }

    async run(
        passedParams: string[],
        options: {
            config: string;
            patch?: string;
            patches: boolean;
            pretty: boolean;
            no_interactive: boolean;
        },
    ): Promise<void> {
        const [public_key, action] = passedParams;
        if (!['on', 'off'].includes(action)) {
            const error = "action only `on` or `off`"
            console.log(error);
            throw new Error('');
        }

        const extConfig = new ConfigMinterService(options.config);
        const confWallet = extConfig.wallet();

        const wallet = new Wallet(confWallet);

        const txType = action == 'on' ? TX_TYPE.SET_CANDIDATE_ON : TX_TYPE.SET_CANDIDATE_OFF;

        if (this.interactive) {
            console.log(
                `${public_key} ${action} from ${wallet.getAddressString()}`,
            );
            const confirm = (
                await this.inquirer.ask<{ confirm: boolean }>(
                    'confirm-question',
                    undefined,
                )
            ).confirm;
            if (!confirm) {
                console.warn(CANCEL_MESSAGE);
                return Promise.resolve(undefined);
            }
        }

        this.minter = new Minter({
            apiType: 'node',
            baseURL: extConfig.minter().urlapi,
        });

        await this.send(
            public_key,
            txType,
            '0x' + wallet.getPrivateKey(),
            confWallet.chain_id,
        )
            .then((r) => {
                // console.log(r);
                this.contentExporter.print(r, false, options);
            })
            .catch((e) => {
                // console.error(e);
                this.contentExporter.print(e, false, options);
            });
        return Promise.resolve(undefined);
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
        flags: '--pretty [boolean]',
        description: 'Pretty',
        defaultValue: true,
    })
    parsePretty(val: string): boolean {
        return JSON.parse(val);
    }

    @Option({
        flags: '-p, --patch [string]',
        description: 'path JMESPath format',
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
        flags: '-y, --no-interactive',
        name: 'no_interactive',
        description: 'Skip confirmation prompt and input',
        defaultValue: false,
    })
    parseNoInteractive(val: string): boolean {
        this.interactive = false;
        return JSON.parse(val);
    }

    async send(
        publicKey: string,
        type: number,
        privateKey: string,
        chain_id: number = 2,
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let txParams = {
                type: TX_TYPE.SET_CANDIDATE_ON,
                chainId: chain_id,
                data: {
                    publicKey: publicKey,
                },
            };
            this.minter
                .postTx(txParams, {privateKey: privateKey}) // seedPhrase
                .then((txHash) => {
                    resolve(txHash.hash);
                })
                .catch((error) => {
                    const errorMsg =
                        error.response?.data?.error ?? error.response ?? error;
                    // console.error(errorMsg);
                    reject(errorMsg);
                });
        });
    }
}
