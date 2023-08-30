import PropTypes from 'prop-types';
import './GloBalStyle.module.scss';

GlobalStyle.propTypes = {
  children: PropTypes.node.isRequired,
};

function GlobalStyle({ children }) {
  return <>{children}</>;
}

export default GlobalStyle;
