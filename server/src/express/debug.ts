export function debug(scope: string) {
  const d = {
    err: require('debug')(scope + ':error'),
    log: require('debug')(scope)};

  d.log.log = console.log.bind(console);

  return d;
}
