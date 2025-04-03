import { Option, CommandRunner, SubCommand } from 'nest-commander';

@SubCommand({
  name: 'candidate',
  arguments: '<public_key>',
  argsDescription: { public_key: 'Public key' },
  description: 'Candidate returns candidate’s info by provided public key',
})
export class CandidateCommand extends CommandRunner {
  async run(
    inputs: string[],
    options: { height?: number; not_show_stakes?: boolean },
  ): Promise<void> {
    console.log('candidate');
    console.log(`inputs: ${inputs[0]}`);
    console.log(`height: ${options.height}`);
    console.log(`not_show_stakes: ${options.not_show_stakes}`);
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
}
