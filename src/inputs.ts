import * as core from '@actions/core';

export interface Inputs {
  registries: string[];
}

export function getInputs(): Inputs {
  return {
    registries: core
      .getInput('registries')
      .split('\n')
      .map(registry => registry.trim())
      .filter(Boolean)
  };
}
