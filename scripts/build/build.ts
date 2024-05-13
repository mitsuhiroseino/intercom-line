import esbuild from 'esbuild';
import config from '../../esbuild.config';

export default async function build() {
  try {
    return await esbuild.build(config);
  } catch (error) {
    throw error;
  }
}
