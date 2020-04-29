import { useState, useEffect } from 'react';

export default (axios) => {
  const [error, setError] = useState(null);
  const reqInterceptor = axios.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptor = axios.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
      // async middleware returns Promise! (so that next middleware can chain the result)
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    // cleanup when the component using this custom hook unmounts
    return () => {
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
