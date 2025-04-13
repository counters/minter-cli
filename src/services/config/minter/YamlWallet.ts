import WalletType from './WalletType';

function YamlMinter(obj: Record<string, any>): WalletType {
  if (obj.private_key && obj.seed_phrase) {
    throw new Error('private_key && seed_phrase == null');
  }
  return {
    seed_phrase: obj.seed_phrase || null,
    private_key: obj.private_key || null,
    chain_id: obj.chain_id || 2,
  };
}
export default YamlMinter;
