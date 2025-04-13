export class JsonPatches {
  printPropertyNames(obj: any, prefix = ''): void {
    this.propertyNames(obj, prefix).forEach((propertyName) => {
      console.info(propertyName);
    });
  }

  propertyNames(obj: any, prefix = ''): string[] {
    if (typeof obj !== 'object' || obj === null) {
      return [];
    }
    let result: string[] = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        result.push(fullPath);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          result.push.apply(result, this.propertyNames(obj[key], fullPath));
        }
      }
    }
    return result;
  }
}
