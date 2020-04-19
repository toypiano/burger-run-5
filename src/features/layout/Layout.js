import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Navbar from './Navbar';
import DrawerToggle from './DrawerToggle';

Layout.propTypes = {
  className: PropTypes.string.isRequired,
};

function Layout({ className, children }) {
  return (
    <div className={className}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}

export default styled(Layout)`
  ${(props) => css`
    main {
      margin-top: var(--h-navbar);
    }
  `}
`;
