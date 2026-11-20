import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isHomePath,
  normalizeBasePath,
  normalizePathname,
  resolveAssetUrl,
} from './routing.ts';

test('isHomePath recognizes root and index.html as home', () => {
  assert.equal(isHomePath('/'), true);
  assert.equal(isHomePath(''), true);
  assert.equal(isHomePath('/index.html'), true);
  assert.equal(isHomePath('/?utm_source=test'), true);
});

test('isHomePath flags unknown routes as 404', () => {
  assert.equal(isHomePath('/unknown'), false);
  assert.equal(isHomePath('/programs/missing/'), false);
  assert.equal(normalizePathname('/programs/missing/'), '/programs/missing');
});

test('routing helpers handle GitHub Pages /gym/ base subpath accurately', () => {
  assert.equal(normalizeBasePath('/gym'), '/gym/');
  assert.equal(normalizeBasePath('/gym/'), '/gym/');
  assert.equal(isHomePath('/gym/', '/gym/'), true);
  assert.equal(isHomePath('/gym', '/gym/'), true);
  assert.equal(isHomePath('/gym/index.html', '/gym/'), true);
  assert.equal(isHomePath('/gym/missing-route', '/gym/'), false);
  assert.equal(normalizePathname('/gym/missing-route', '/gym/'), '/missing-route');
});

test('resolveAssetUrl prefixes local assets with base path when deployed under /gym/', () => {
  assert.equal(
    resolveAssetUrl('/assets/images/trainer-portrait.jpg', '/'),
    '/assets/images/trainer-portrait.jpg'
  );
  assert.equal(
    resolveAssetUrl('/assets/images/trainer-portrait.jpg', '/gym/'),
    '/gym/assets/images/trainer-portrait.jpg'
  );
  assert.equal(
    resolveAssetUrl('https://example.com/photo.jpg', '/gym/'),
    'https://example.com/photo.jpg'
  );
});
