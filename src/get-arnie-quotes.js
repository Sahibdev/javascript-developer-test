const { httpGet } = require('./mock-http-interface');

const OK = 200;
const SUCCESS = 'Arnie Quote';
const FAILURE = 'FAILURE';
const NO_STATUS = 'Response Error - Cannot find Status';

const getArnieQuotes = async (urls) => {
  return Promise.all(
    urls.map(async (url) => {
      try {
        const response = await httpGet(url);
        if (response?.status) {
          const { status } = response;
          const key = status === OK ? SUCCESS : FAILURE;

          const { message } = JSON.parse(response.body);
          return { [key]: message };
        } else {
          throw new Error(NO_STATUS);
        }
      } catch (err) {
        return err;
      }
    })
  );
};

module.exports = {
  getArnieQuotes,
};
