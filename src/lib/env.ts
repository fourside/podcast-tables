export const Env = Object.freeze({
  radikoResourceEndpoint: process.env.RADIKO_RESOURCE_ENDPOINT ?? unsetEnv("radikoResourceEndpoint"),
  writableUserMailAddress: process.env.WRITABLE_USER_MAIL_ADDRESS ?? unsetEnv("writableUserMailAddress"),
});

function unsetEnv(envName: string): never {
  throw new Error(`${envName} is not set`);
}
