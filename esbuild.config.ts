import { BuildOptions } from 'esbuild';

const config: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  outfile: 'build/index.js',
  platform: 'node',
  target: 'node20',
};

export default config;
