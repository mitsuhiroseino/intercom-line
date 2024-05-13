import productize from './productize';

console.info(new Date(), 'start');
productize()
  .then(() => {
    console.info(new Date(), 'end');
  })
  .catch((error) => {
    console.error(error);
  });
