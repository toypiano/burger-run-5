import { useState, useEffect } from 'react';

export default (axios) => {
  const [error, setError] = useState(null);
  const reqInterceptor = axios.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const resInterceptor = axios.interceptors.response.use(null, (err) => {
    let errMsg;
    // request was made and server responded with a non-200 status
    if (err.response) {
      console.log('Out of 200');
      errMsg = [
        JSON.stringify(err.response.status),
        JSON.stringify(err.response.data),
      ];
    } else if (err.request) {
      // request was made, but no response was received
      console.log('no response');
      console.log(err.request);
      errMsg = 'Network Error: No response';
    } else {
      // error while setting up the request
      console.log('non-network error');
      errMsg = err.message;
    }
    console.log(errMsg);
    setError(errMsg);
    // async middleware returns Promise! (so that next middleware can chain the result)
    return Promise.reject(err);
  });

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
