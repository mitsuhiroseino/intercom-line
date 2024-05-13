import build from './build';

console.info(new Date(), 'start');
build()
  .then(() => {
    console.info(new Date(), 'end');
  })
  .catch((error) => {
    console.error(error);
  });
