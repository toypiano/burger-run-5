import React, { useState, useEffect } from 'react';

const withLazy = (importComponent) =>
  function WithLazy(props) {
    WithLazy.displayName = `WithLazy(${getDisplayName(importComponent)})`;
    const [Component, setComponent] = useState(null);
    useEffect(() => {
      (async () => {
        try {
          const cmp = await importComponent();
          console.log(cmp);
          setComponent(cmp.default);
        } catch (err) {
          console.log(err);
        }
      })();
    }, []);

    return Component ? <Component {...props} /> : null;
  };

export default withLazy;

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
