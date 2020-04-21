import React from 'react';
import Modal from '../ui/Modal';

import useHttpErrorHandler from '../hooks/useHttpErrorHandler';

export default function withErrorHandler(C, axios) {
  return (props) => {
    const [errorText, closeErrorModal] = useHttpErrorHandler(axios);

    return (
      <>
        <Modal show={!!errorText} closeModal={closeErrorModal}>
          {errorText && errorText}
        </Modal>
        <C {...props} />
      </>
    );
  };
}
