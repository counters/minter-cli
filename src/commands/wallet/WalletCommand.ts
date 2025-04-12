import {Command, CommandRunner} from 'nest-commander';
import {WalletGenerateCommand} from "./WalletGenerateCommand";
import {WalletSendCommand} from "./WalletSendCommand";

@Command({
    name: "wallet",
    subCommands: [WalletGenerateCommand, WalletSendCommand],
    description: 'Wallet utility functions'
})
export class WalletCommand extends CommandRunner {
    run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        this.command.help();
    }
}
