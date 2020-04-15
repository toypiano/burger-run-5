import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

Layout.propTypes = {
  className: PropTypes.string.isRequired,
};

function Layout({ className, children }) {
  return (
    <div className={className}>
      <div>Toolbar, SideBar, Backdrop</div>
      <main>{children}</main>
    </div>
  );
}

export default styled(Layout)`
  ${(props) => css`
    main {
      margin-top: 1em;
    }
  `}
`;
