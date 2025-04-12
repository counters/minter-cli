import {CommandRunner, Option, SubCommand} from 'nest-commander';
import {Minter, MinterApi, postTx, prepareSignedTx, TX_TYPE, FEE_PRECISION_SETTING} from "minter-js-sdk";
import {
    getPrivateKeyFromSeedPhraseAsync,
    getPrivateKeyFromSeedPhrase,
    getBaseCoinSymbol
} from "minter-js-sdk/src/utils";
import {ConfigMinterService} from "../../services/config/minter/config-minter.service";
import {parseNumber} from "../../utils/parseNumber";
import {Wallet} from "../../utils/Wallet";


@SubCommand({
    name: "send",
    arguments: '<recipient>, <amount>, <symbol>',
    argsDescription: {recipient: 'Recipient', amount: 'Amount', symbol: 'Symbol, Coin, Token'},
    description: 'Send to address'
})
export class WalletSendCommand extends CommandRunner {
    private minter: Minter;

    async run(
        passedParams: string[],
        options: { config: string; patch?: string; patches: boolean; pretty: boolean; no_interactive: boolean }
    ): Promise<void> {

        const [recipient, _amount, symbol] = passedParams;
        const amount = parseNumber(_amount);

        // console.log(options.no_interactive)
        // console.log(recipient, _amount, amount, symbol)

        const extConfig = new ConfigMinterService(options.config);
        const confWallet = extConfig.wallet()

        const wallet = new Wallet(confWallet)
        // console.log(`Sending from ${wallet.getAddressString()} to address ${recipient}`);

        this.minter = new Minter({apiType: 'node', baseURL: extConfig.minter().urlapi});
        // console.log(getBaseCoinSymbol(confWallet.chain_id));

        if ( !options.no_interactive) throw new Error("No interactive not implemented!")
        await this.send(recipient, amount, symbol, '0x'+wallet.getPrivateKey(), confWallet.chain_id).then(r => {
                console.log(r);
            }
        ).catch(e => {
            console.error(e);
        })

        // process.stdout.write(`minter-cli...`);
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
        flags: '-y, --no-interactive [boolean]',
        name: 'no_interactive',
        description: 'No Interactive',
        defaultValue: true,
    })
    parseNoInteractive(val: string): boolean {
        return JSON.parse(val);
    }

    async send(to: string, amount: number, coinId: number | string, privateKey: string, chain_id: number = 2): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let txParams = {
                type: TX_TYPE.SEND,
                chainId: chain_id,
                data: {
                    to: to,
                    value: amount,
                    coin: coinId, // coin id
                },
                gasCoin: 0,
            };
            this.minter.postTx(txParams, {privateKey: privateKey})// seedPhrase
                .then((txHash) => {
                    resolve(txHash.hash)
                })
                .catch((error) => {
                    const errorMsg = error.response?.data?.error??error.response??error;
                    // console.error(errorMsg);
                    reject(errorMsg);
                });

        })
    }

}
