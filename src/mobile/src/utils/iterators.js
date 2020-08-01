export function findAndReplace(array, oldValue, newValue) {
  const index = array.findIndex((element) => element.id === oldValue.id);

  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
}

export function findAndRemove(array, value) {
  const index = array.findIndex((element) => element.id === value.id);

  return [...array.slice(0, index), ...array.slice(index + 1)];
}
