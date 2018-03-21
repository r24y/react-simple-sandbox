import React from 'react';
import PropTypes from 'prop-types';

export default function Group({children, path, name}) {
  return React.Children.map(children, child =>
    React.cloneElement(child, {path: [...path, name]})
  );
}

Group.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  path: PropTypes.arrayOf(PropTypes.string),
};

Group.defaultProps = {
  path: [],
};
