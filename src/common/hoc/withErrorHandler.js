import React from 'react';
import Modal from '../ui/Modal';

import useHttpErrorHandler from '../hooks/useHttpErrorHandler';

export default function withErrorHandler(C, axios) {
  return function WithErrorHandler(props) {
    WithErrorHandler.displayName = `WithErrorHandler(${getDisplayName(C)})`;
    const [error, closeErrorModal] = useHttpErrorHandler(axios);
    return (
      <>
        <Modal show={!!error} closeModal={closeErrorModal}>
          {error &&
            (error.response ? error.response.data.error : error.message)}
        </Modal>
        <C {...props} />
      </>
    );
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
