import { ConfigMinterService } from '../config/minter/config-minter.service';
import MinterApi from 'minter-typescript-sdk';
import { GetMinterApi } from './GetMinterApi';
import { ConfigConst } from '../config/ConfigConst';

export class MinterApiService extends GetMinterApi {
  private extConfig: ConfigMinterService;
  private readonly minterApi: MinterApi;
  constructor(config_file: string = ConfigConst.DEFAULT_CONFIG_FILE) {
    super();

    this.extConfig = new ConfigMinterService(config_file);

    const minterConf = this.extConfig.minter();
    this.minterApi = this.getMinterApi(minterConf);
  }

  api(): MinterApi {
    return this.minterApi;
  }

  candidate(
    candidate: string,
    notShowStakes: boolean | null = null,
    height: number | null = null,
  ) {
    // console.log('MinterApiService candidate');
    this.minterApi
      .getCandidateGrpc(candidate, notShowStakes, height)
      .then((r) => {
        const result = r.toObject();
        // console.log(r.toObject())
        const param = 'status';
        console.warn(result[param]);
      });
  }
}
