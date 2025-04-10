import {Command, CommandRunner} from 'nest-commander';
import {WalletGenerateCommand} from "./WalletGenerateCommand";

@Command({
    name: "wallet",
    subCommands: [WalletGenerateCommand],
    description: 'Wallet utility functions'
})
export class WalletCommand extends CommandRunner {
    run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        this.command.help();
    }
}
