import archiver from 'archiver';
import fs from 'fs-extra';
import path from 'path';
import build from '../build/build';

const inputPath = path.resolve('./build');
const outputPath = path.resolve('./temp');

export default async function productize() {
  await build();

  await fs.ensureDir(outputPath);
  const zipPath = path.join(outputPath, 'index.zip');
  const output = fs.createWriteStream(zipPath);

  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.on('warning', (error) => {
    if (error.code === 'ENOENT') {
      console.warn(error);
    } else {
      throw error;
    }
  });

  archive.on('error', (error) => {
    throw error;
  });

  archive.pipe(output);

  const indexPath = path.join(inputPath, 'index.js');
  archive.append(fs.createReadStream(indexPath), { name: 'index.js' });

  await archive.finalize();
}
