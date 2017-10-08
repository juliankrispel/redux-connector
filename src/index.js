import { createElement, PureComponent } from 'react';
import { connect } from 'react-redux';

class Connect extends PureComponent {
  render() {
    const {
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      options,
      children
    } = this.props;

    return createElement(
      connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(props =>
        children(props)
      )
    );
  }
}

export default Connect;
