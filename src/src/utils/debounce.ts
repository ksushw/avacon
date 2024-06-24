type DebouncedFunction= (...args: any[]) => void;

export const debounce = <F extends DebouncedFunction>(fn: F, ms: number): DebouncedFunction => {
  let timeout: number
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms) as number
  };
};