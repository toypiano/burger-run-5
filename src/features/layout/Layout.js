import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';

Layout.propTypes = {
  className: PropTypes.string.isRequired,
};

function Layout({ className, children }) {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  return (
    <div className={className}>
      <Navbar openSideDrawer={() => setIsSideDrawerOpen(true)} />
      <SideDrawer
        isOpen={isSideDrawerOpen}
        closeSideDrawer={() => setIsSideDrawerOpen(false)}
      />
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
