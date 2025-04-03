import { Command, CommandRunner } from 'nest-commander';
import { CandidateCommand } from './CandidateCommand';

@Command({
  name: 'api',
  subCommands: [CandidateCommand],
  description: 'Api for Minter Node v2',
  // options: { isDefault: true }
})
export class ApiCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    this.command.help();
  }
}
