function logwords(results) {
  console.log(results[results.length - 1][0].transcript);
}
export function handleResult(event) {
  logwords(event.results);
}
