/**
 * Préchargement de tarballs npm volumineux.
 *
 * Contexte : sur le poste de développement utilisé, la pile TLS de Node corrompt
 * les transferts volumineux (erreurs `ERR_SSL_CIPHER_OPERATION_FAILED` /
 * « bad record mac ») et `npm install` échoue sur les binaires natifs de Next.js,
 * SWC et Sharp. Ce script télécharge ces tarballs via PowerShell (pile TLS
 * Windows), vérifie leur empreinte sha512 contre celle publiée par le registre,
 * puis les injecte dans le cache npm. `npm install` peut ensuite aboutir.
 *
 * Usage : node scripts/prefetch-tarballs.mjs [--retries=8]
 * Ce script est un utilitaire d'environnement : il n'est pas nécessaire sur un
 * poste ou une plateforme de CI dont le réseau fonctionne normalement.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const SPECS = [
  'next@15.5.26',
  '@next/swc-win32-x64-msvc@15.5.26',
  '@swc/core-win32-x64-msvc@1.16.2',
  '@img/sharp-win32-x64@0.35.4',
  '@img/sharp-wasm32@0.35.4',
];

const retriesArg = process.argv.find((a) => a.startsWith('--retries='));
const MAX_RETRIES = retriesArg ? Number(retriesArg.split('=')[1]) : 8;
const DIR = join(tmpdir(), 'etn-tarballs');
mkdirSync(DIR, { recursive: true });

const IS_WIN = process.platform === 'win32';

function npm(args, options = {}) {
  return execFileSync(IS_WIN ? 'npm.cmd' : 'npm', args, {
    shell: IS_WIN,
    ...options,
  });
}

function npmView(spec, field) {
  return npm(['view', `"${spec}"`, field], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

function powershellDownload(url, target) {
  execFileSync(
    'powershell',
    [
      '-NoProfile',
      '-Command',
      `$ProgressPreference='SilentlyContinue'; Invoke-WebRequest -Uri '${url}' -OutFile '${target}' -UseBasicParsing`,
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
}

function sha512Base64(file) {
  return createHash('sha512').update(readFileSync(file)).digest('base64');
}

let failures = 0;

for (const spec of SPECS) {
  const url = npmView(spec, 'dist.tarball');
  const expected = npmView(spec, 'dist.integrity');
  const expectedHash = expected.replace(/^sha512-/, '');
  const target = join(DIR, url.split('/').pop());

  let done = false;
  for (let attempt = 1; attempt <= MAX_RETRIES && !done; attempt += 1) {
    try {
      if (!existsSync(target) || statSync(target).size === 0) {
        powershellDownload(url, target);
      }
      if (sha512Base64(target) === expectedHash) {
        done = true;
      } else {
        rmSync(target, { force: true });
        console.log(`  empreinte invalide (${spec}), tentative ${attempt}/${MAX_RETRIES}`);
      }
    } catch {
      rmSync(target, { force: true });
      console.log(`  téléchargement échoué (${spec}), tentative ${attempt}/${MAX_RETRIES}`);
    }
  }

  if (!done) {
    failures += 1;
    console.log(`✗ ${spec} — abandon après ${MAX_RETRIES} tentatives`);
    continue;
  }

  npm(['cache', 'add', `"${target}"`], { stdio: ['ignore', 'ignore', 'pipe'] });
  console.log(`✓ ${spec} — ajouté au cache npm`);
}

if (failures > 0) {
  console.log(`\n${failures} paquet(s) non préchargé(s).`);
  process.exit(1);
}

console.log('\nTous les tarballs sont dans le cache npm. Lancez « npm install ».');
