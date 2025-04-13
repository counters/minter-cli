import { Option, CommandRunner, SubCommand } from 'nest-commander';
import { MinterApiService } from '../../services/minter-api/minter-api.service';
import { ContentExporter } from '../../services/ContentExporter';

@SubCommand({
  name: 'address',
  arguments: '<address>',
  argsDescription: { public_key: 'address: Mx...' },
  description: 'Address returns coins list, balance and transaction count of an address',
})
export class AddressCommand extends CommandRunner {
  private skipPip2Bip = false;

  constructor(private contentExporter: ContentExporter) {
    super();
  }

  async run(
    inputs: string[],
    options: {
      height?: number;
        delegated?: boolean;
      config: string;
      patch?: string;
      patches: boolean;
      pretty: boolean;
    },
  ): Promise<void> {
    // const {patch, config} = options;
    const candidate = inputs[0];
    const minterApi = new MinterApiService(options.config);

    minterApi
      .api()
      .getAddressGrpc(candidate, options.delegated, options.height)
      .then((r) => {
        const result = r.toObject();
        this.contentExporter.print(result, this.skipPip2Bip, options);
      })
      .catch(console.log);
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
    flags: '-d, --delegated [boolean]',
    description:
      'delegated',
    defaultValue: false,
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
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
    flags: '-p, --patch [string]',
    description: 'path JMESPath format',
    // defaultValue: 'status',
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
    flags: '--pretty [boolean]',
    description: 'Pretty',
    defaultValue: true,
  })
  parsePretty(val: string): boolean {
    return JSON.parse(val);
  }

  @Option({
    flags: '--skip_pip2bip',
    name: 'skip_pip2bip',
    description: 'Skip convert PIP to BIP',
    defaultValue: false,
  })
  parseSkipPip2Bip(val: string): boolean {
    this.skipPip2Bip = true;
    return JSON.parse(val);
  }
}
