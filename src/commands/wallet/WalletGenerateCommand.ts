import {CommandRunner, SubCommand} from 'nest-commander';
import {generateWallet, Wallet} from 'minterjs-wallet';

@SubCommand({
    name: "generate",
    description: 'Generates wallet from a random BIP39 mnemonic phrase'
})
export class WalletGenerateCommand extends CommandRunner {

    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        const wallet : Wallet = generateWallet();
        console.log(wallet.getAddressString());
        console.log(wallet.getMnemonic());
        // process.stdout.write(`minter-cli version ${version}`);
        return Promise.resolve(undefined);
    }
}
