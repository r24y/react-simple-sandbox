import PropTypes from 'prop-types';

export default function Demo() {
  return null;
}

Demo.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  path: PropTypes.arrayOf(PropTypes.string),
};

Demo.defaultProps = {
  path: [],
};
