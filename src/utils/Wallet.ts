import {walletFromPrivateKey, walletFromMnemonic} from 'minterjs-wallet';
import WalletType from "../services/config/minter/WalletType";

export class Wallet {
    private readonly wallet: any;
    private privateKey: string | null = null;
    private address: string | null = null;

    constructor(private readonly secrets: { seed_phrase?: string; private_key?: string } | WalletType) {
        if (secrets.private_key) {
            this.wallet = walletFromPrivateKey(secrets.private_key);
            this.privateKey = secrets.private_key;
        } else if (secrets.seed_phrase) {
            this.wallet = walletFromMnemonic(secrets.seed_phrase);
        } else {
            throw new Error('private_key && seed_phrase == null');
        }
    }

    getPrivateKey(): string {
        if (!this.privateKey) {
            this.privateKey = this.wallet.getPrivateKeyString().slice(2)
        }
        return <string>this.privateKey;
    }

    getAddressString(): string {
        if (!this.address) {
            this.address = this.wallet.getAddressString();
        }
        return <string>this.address;
    }
}
