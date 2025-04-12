import { Injectable } from '@nestjs/common';
import YamlMinter from './YamlMinter';
import MinterType from './MinterType';
import { ConfigConst } from '../ConfigConst';
import { ConfigYamlLoader } from '../ConfigYamlLoader';
import WalletType from "./WalletType";
import YamlWallet from "./YamlWallet";

@Injectable()
export class ConfigMinterService extends ConfigYamlLoader {
  private readonly yamlContent: Record<string, any>;

  constructor(
      yaml_file: string = ConfigConst.DEFAULT_CONFIG_FILE,
      _yamlContent: Record<string, any> | null = null,
  ) {
    super();
    let tmpYamlContent: Record<string, any> | null = null;
    if (_yamlContent) {
      this.yamlContent = _yamlContent;
    } else {
      tmpYamlContent = this.load(yaml_file);
    }
    if (tmpYamlContent != null) {
        this.yamlContent = tmpYamlContent;
    } else {
        console.error('Not loaded yaml file');
        throw new Error('Not loaded yaml file');
    }
  }

  minter(path: string = ConfigConst.MINTER_PATCH): MinterType {
      return YamlMinter(this.yamlContent[path]);
  }
  wallet(path: string = ConfigConst.WALLET_PATCH): WalletType {
      return YamlWallet(this.yamlContent[path]);
  }
}
