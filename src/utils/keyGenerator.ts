export function* keyGenerator () {
  let count = 0;
  while(1) {
    yield count++;
  }
}
