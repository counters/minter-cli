import { readFileSync } from 'fs';

class MaybeFile {
  private prefix = 'file://';
  private start = 7;
  text(str: string): string {
    if (str.startsWith(this.prefix)) {
      const filePatch = str.substring(this.start);
      return readFileSync(filePatch, 'utf8').trimEnd();
    }
    return str;
  }
}
export default MaybeFile;
