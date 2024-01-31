export const Env = Object.freeze({
  radikoResourceEndpoint: process.env.RADIKO_RESOURCE_ENDPOINT ?? unsetEnv("radikoResourceEndpoint"),
});

function unsetEnv(envName: string): never {
  throw new Error(`${envName} is not set`);
}
