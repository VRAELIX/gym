export function normalizeBasePath(baseUrl = '/'): string {
  const clean = baseUrl.split('?')[0].split('#')[0].trim();
  if (!clean || clean === '/') return '/';
  const withLeading = clean.startsWith('/') ? clean : `/${clean}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function normalizePathname(pathname: string, baseUrl = '/'): string {
  if (!pathname) return '/';
  const clean = pathname.split('?')[0].split('#')[0].trim();
  const base = normalizeBasePath(baseUrl);

  let relative = clean;
  if (base !== '/') {
    const baseNoTrailing = base.slice(0, -1);
    if (clean === baseNoTrailing || clean === base) {
      return '/';
    }
    if (clean.startsWith(base)) {
      relative = clean.slice(base.length - 1);
    }
  }

  if (relative === '' || relative === '/index.html') return '/';
  return relative.endsWith('/') && relative.length > 1
    ? relative.slice(0, -1)
    : relative;
}

export function isHomePath(pathname: string, baseUrl = '/'): boolean {
  return normalizePathname(pathname, baseUrl) === '/';
}

export function resolveAssetUrl(assetPath: string, baseUrl = '/'): string {
  if (!assetPath) return assetPath;
  if (/^(https?:)?\/\//i.test(assetPath) || assetPath.startsWith('data:')) {
    return assetPath;
  }
  const base = normalizeBasePath(baseUrl);
  if (base === '/') return assetPath;
  const trimmedAsset = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return `${base}${trimmedAsset}`;
}
