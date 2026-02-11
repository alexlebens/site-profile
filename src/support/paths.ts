import { join } from 'node:path';

function resolveFilePath(path: string) {
  if (path.startsWith('/')) {
    return resolveFilePathPublic(path);
  }

  return resolveFilePathInternal(path);
}

function resolveFilePathPublic(path: string) {
  return join(process.cwd(), path);
}

function resolveFilePathInternal(path: string) {
  const normalizePath = path.startsWith('@') ? path.replace('@', '') : path;

  return join(process.cwd(), 'src/', normalizePath);
}

export { resolveFilePath, resolveFilePathPublic, resolveFilePathInternal };
