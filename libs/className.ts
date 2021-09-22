export function classNameCombine(className: string[]) {
  return className.filter(item => {
    return !!item;
  }).join(' ')
}