export const parseErrorMessage = (response: any): any => {
  let message = '';
  if (typeof response === 'string') {
    return response;
  } else if (!!response?.error?.error) {
    message = response.error.error;
  } else if (!!response?.error?.message) {
    message = response.error.message;
  } else if (!!response?.error) {
    message = response.error;
  } else if (!!response?.message) {
    message = response.message;
  } else {
    message = JSON.stringify(response);
  }
  return message;
}
