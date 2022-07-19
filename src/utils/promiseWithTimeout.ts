const promiseWithTimeout = <T>(promise: Promise<T>, timeout?: number) => {
  if (!timeout) {
    return promise;
  }

  return Promise.race([promise, rejectAfterTimeout<T>(timeout)]);
};
export default promiseWithTimeout;

const rejectAfterTimeout = <T>(timeout: number) =>
  new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject({
        code: 408,
        message: 'Request(promise) Time out',
        timeout,
      });
    }, timeout);
  });
