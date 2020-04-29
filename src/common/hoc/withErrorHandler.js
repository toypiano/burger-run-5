import React from 'react';
import Modal from '../ui/Modal';

import useHttpErrorHandler from '../hooks/useHttpErrorHandler';

export default function withErrorHandler(C, axios) {
  return (props) => {
    const [error, closeErrorModal] = useHttpErrorHandler(axios);
    return (
      <>
        <Modal show={!!error} closeModal={closeErrorModal}>
          {error && error.response.data.error}
        </Modal>
        <C {...props} />
      </>
    );
  };
}
