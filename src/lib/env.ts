export function getApiEndpoint(): string {
  const apiEndpoint = process.env.API_ENDPOINT;
  if (!apiEndpoint) {
    throw new Error("not set API_ENDPOINT");
  }
  return apiEndpoint;
}

export function getWritableUserMailAddress(): string {
  return process.env.WRITABLE_USER_MAIL_ADDRESS || "";
}
