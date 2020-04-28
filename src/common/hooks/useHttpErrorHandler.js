import { useState, useEffect } from 'react';

export default (axios) => {
  console.log('hoc render');
  const [error, setError] = useState(null);
  const reqInterceptor = axios.interceptors.request.use((req) => {
    console.log('req intercept - setError');
    setError(null);
    return req;
  });

  const resInterceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log('res intercept - setError');
      setError(err);
      // async middleware returns Promise! (so that next middleware can chain the result)
      return Promise.reject(err);
    }
  );
  console.log('set interceptors: ', reqInterceptor, resInterceptor);

  useEffect(() => {
    console.log('hoc effect');
    // cleanup when the component using this custom hook unmounts
    return () => {
      console.log(
        'hoc effect callback - eject:',
        reqInterceptor,
        resInterceptor
      );
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, [
    // linter enforced list
    reqInterceptor,
    resInterceptor,
    axios.interceptors.request,
    axios.interceptors.response,
  ]);

  const closeErrorModal = () => {
    setError(null);
  };
  return [error, closeErrorModal];
};
