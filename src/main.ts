import * as actionInput from './inputs';
import * as handler from './handler';

export async function main(): Promise<void> {
  const input: actionInput.Inputs = actionInput.getInputs();
  await handler.login(input.registries);
}

main();
