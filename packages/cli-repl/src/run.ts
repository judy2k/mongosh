import { CliRepl, parseCliArgs, mapCliToDriver, generateUri, USAGE } from './index';

try {
  const options = parseCliArgs(process.argv);
  const { version } = require('../package.json');

  if (options.help) {
    console.log(USAGE);
  } else if (options.version) {
    console.log(version);
  } else {
    process.title = 'mongosh';
    const driverOptions = mapCliToDriver(options);
    const driverUri = generateUri(options);
    const appname = `${process.title} ${version}`;
    /* eslint no-new:0 */
    new CliRepl(driverUri, { appname, ...driverOptions }, options);
  }
} catch (e) {
  console.log(e.message);
}