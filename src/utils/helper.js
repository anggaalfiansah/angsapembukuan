/* eslint-disable prettier/prettier */
export const handleResponse = (code, data, message) => {
  switch (code) {
    case 200:
      return {
        code: 200,
        status: 'success',
        message: message ? message : '',
        data: data ? data : null,
      };
    case 500:
      return {
        code: 500,
        status: 'internal error',
        message: message ? message : '',
      };
  }
};
