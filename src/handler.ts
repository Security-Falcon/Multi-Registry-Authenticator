import * as core from '@actions/core';
import * as exec from '@actions/exec';

/**
 * Logs into all specified container registries.
 * @param registries registries to log into.
 */
export async function login(registries: string[]) {
  if (!registries || registries.length === 0) {
    throw new Error('No registries specified. Please specify at least one registry to login to.');
  }

  core.info(`Caller requested login to ${registries.length} registries 🚪 🚨⏳⏳`);

  try {
    for (const registry of registries) {
      const registryDetails = getRegistryDetails(registry);

      if (!registryDetails.username || !registryDetails.password) {
        throw new Error('Username and password are required for the login. 🚨');
      }

      const loginArgs: Array<string> = ['login', '--password-stdin'];
      loginArgs.push('--username', registryDetails.username);
      loginArgs.push(registryDetails.url);

      core.info(`Logging in to ${registryDetails.username} as private registry...⏳`);

      await exec
        .getExecOutput('docker', loginArgs, {
          ignoreReturnCode: true,
          silent: true,
          input: Buffer.from(registryDetails.password, 'utf-8')
        })
        .then(response => {
          if (response.stderr.length > 0 && response.exitCode != 0) {
            core.info(`Login to ${registryDetails.url} failed 🚨`);
            throw new Error(response.stderr.trim().concat(' 🚨'));
          }
          core.info(`Login to ${registryDetails.url} Succeeded ✅`);
        });
    }
  } catch (error) {
    core.error(error.message);
  }
}

/**
 * Retrieves the registry details from a registry entry.
 * @param registry registry entry to retrieve the registry details from
 * @returns the registry details as an object
 */
export function getRegistryDetails(registry): {url: string; username: string; password: string} {
  const [url, username, password] = registry.split(';');
  return {url: url.trim(), username: username.trim(), password: password.trim()};
}
