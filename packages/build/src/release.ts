/* eslint-disable no-shadow */
import releaseToDownloadCenter from './release-downloads-center';
import compileAndZipExecutable from './compile-and-zip-executable';
import uploadArtifactToEvergreen from './evergreen';
import buildAndRelease from './build-and-release';
import { GithubRepo } from './github-repo';
import { Octokit } from '@octokit/rest';
import releaseToBarque from './barque';
import Config from './config';

/**
 * Run the release process.
 * zip, release internally on evergreen, and, if applicable do a public release
 * (download centre and github.
 * @param {Config} config - the configuration, usually config/build.config.js.
 */
export default async function release(config: Config): Promise<void> {
  const octokit = new Octokit({
    auth: config.githubToken
  });

  const githubRepo = new GithubRepo(config.repo, octokit);

  await buildAndRelease(
    config,
    githubRepo,
    releaseToBarque,
    compileAndZipExecutable,
    uploadArtifactToEvergreen,
    releaseToDownloadCenter
  );
}
