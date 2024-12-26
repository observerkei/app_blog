export function getLocalData(key: string, defaultValue: any) {
    const value = localStorage.getItem(key);
    if (value && value.length > 0) {
      return JSON.parse(value);
    }
  
    return defaultValue;
  }
  
export function setLocalData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function console_dbg(...params: any[]): void {
    const dbg = getLocalData('dbg', 0);
    if (!dbg) return;
    console.log(...params);   
}

