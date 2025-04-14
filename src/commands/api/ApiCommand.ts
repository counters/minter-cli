import { Command, CommandRunner } from 'nest-commander';
import { CandidateCommand } from './CandidateCommand';
import {AddressCommand} from "./AddressCommand";
import {WalletSetCandidateCommand} from "../wallet/WalletSetCandidateCommand";

@Command({
  name: 'api',
  subCommands: [CandidateCommand, AddressCommand, WalletSetCandidateCommand],
  description: 'Api v2 for Minter Node',
  // options: { isDefault: true }
})
export class ApiCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    this.command.help();
  }
}
