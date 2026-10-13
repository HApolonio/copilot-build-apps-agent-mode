const configuredCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserCodespaceName = globalThis.location?.hostname.match(
  /^(.+)-5173\.app\.github\.dev$/,
)?.[1]
const codespaceName = configuredCodespaceName || browserCodespaceName

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
