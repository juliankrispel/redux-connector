import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Connect = ({
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options,
  children,
}) => {

  const Comp = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  )((props) => children(props));

  return <Comp />;
}

Connect.propTypes = {
  mapStateToProps: PropTypes.func,
  mapDispatchToProps: PropTypes.func,
  mergeProps: PropTypes.func,
  options: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default Connect;
