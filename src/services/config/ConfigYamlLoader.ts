// import yaml from 'js-yaml';
// import fs from 'fs';
// import * as fs from 'fs'
import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';

export class ConfigYamlLoader {
  protected load(yamlFile: string): Record<string, any> | null {
    try {
      return yaml.load(readFileSync(yamlFile, 'utf8')) as Record<string, any>;
    } catch (e) {
      console.error(`Error load yaml file ${yamlFile}`);
      console.error(e);
      return null;
    }
  }
}
