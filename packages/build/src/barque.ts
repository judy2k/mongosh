import child_process from 'child_process' 
import Platform from './platform';
import Config from './config';
import util from 'util';
import path from 'path';

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
const releaseToBarque = async (tarballURL: string, config: Config): Promise<any> => {
  // hard code mongodb edition to 'org' for now
  const mongodbEdition = 'org';
  // linux mongodb versions to release to. This should perhaps be an array of
  // [4.3, 4.4], like mongo-tools
  const mongodbVersion = '4.4';
  // just use the amd64 linux edition for now
  const arch = 'amd64';

  const repoConfig = path.join(config.rootDir, 'config', 'repo-config.yml');

  if (config.platform === Platform.Linux) {
    const { stdout, stderr } = await exec(
      // `curator --level debug hello`
      `curator --level debug
      repo submit
      --service https://barque.corp.mongodb.com
      --config ${repoConfig}
      --distro ${config.buildVariant}
      --arch ${arch}
      --edition ${mongodbEdition}
      --version ${mongodbVersion}
      --pacakges ${tarballURL}
      --username ${config.barqueUsername}
      --api_key ${config.barqueApiKey}
      `
    )

    console.log('currator stdout:', stdout);
    console.error('currator stderr:', stderr);
    return;
  }

  return;
};

export default releaseToBarque;
