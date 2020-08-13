import util from 'util';
import child_process from 'child_process' 

const exec = util.promisify(child_process.exec);

/**
 * Upload the provided argument to evergreen s3 bucket.
 *
 * @param {string} buildVariant- The current build variant (host).
 * @param {string} arch - Architecture to build for.
 * @param {string} tarballURL- The uploaded to Evergreen tarball URL.
 * @param {string} barqueUsername - The Barque Username.
 * @param {string} barqueApiKey - The Barque API Key.
 *
 * @returns {Promise} The promise.
 */
const releaseToBarque = (buildVariant: string, arch: string, tarballURL: string, barqueUsername: string, barqueApiKey: string): Promise<any> => {
  return exec('curator --help')
							// "--level", "debug",
							// "repo", "submit",
							// "--service", "https://barque.corp.mongodb.com",
							// "--config", "etc/repo-config.yml",
							// "--distro", buildVariant,
							// "--arch", arch,
							// "--edition", 'mongodb edition',
							// "--version", 'mongodb version',
							// "--packages", tarballURL,
							// "--username", barqueUsername,
							// "--api_key", barqueApiKey,
};

export default releaseToBarque;