import { Injectable } from '@nestjs/common';
import { JsonPatches } from '../utils/JsonPatches';
import { search } from 'jmespath';
import { MagicPipConvert } from '../questions/MagicPipConvert';

@Injectable()
export class ContentExporter {
  print(
    result: Record<string, any> | string,
    skip_pip2bip: boolean,
    options: {
      patch?: string;
      patches: boolean;
      pretty: boolean;
    },
  ) {
    let out: any;
    if (options.patches) {
      new JsonPatches().printPropertyNames(result);
    } else if (options.patch && options.patch.length > 0) {
      out = search(result, options.patch);
    } else {
      out = result;
    }
    if (!skip_pip2bip) out = new MagicPipConvert().mbPipToBip(out);
    if (!options.pretty) {
        if (typeof out === 'string')
            process.stdout.write(out);
            else
      process.stdout.write(JSON.stringify(out));
    } else {
      console.info(out);
    }
  }
}
