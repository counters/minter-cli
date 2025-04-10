import { Command, CommandRunner } from 'nest-commander';
import { CandidateCommand } from './CandidateCommand';

@Command({
  name: 'api',
  subCommands: [CandidateCommand],
  description: 'Api v2 for Minter Node',
  // options: { isDefault: true }
})
export class ApiCommand extends CommandRunner {
  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    this.command.help();
  }
}
