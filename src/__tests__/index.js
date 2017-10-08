import React, { Component } from 'react';
import Connector from '../';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  actions: [],
  firstName: 'Julian',
  lastName: 'Krispel'
};

const UPDATE = 'UPDATE';

const reducer = (state = initialState, action = {}) => {
  if (action.type === UPDATE) {
    return {
      ...state,
      ...action.payload,
      actions: [...state.actions, action]
    };
  }

  return {
    ...state,
    actions: [...state.actions, action]
  };
};

const store = createStore(reducer);

const mapState = currentUser => currentUser;

class Child extends Component {
  componentDidMount() {
    this.props.hasMounted();
  }

  render() {
    this.props.hasRendered();
    return <h1>Hello</h1>;
  }
}

describe('Connector', () => {
  it('mounts and renders the child component only once, even if new props are set', () => {
    const hasRendered = jest.fn();
    const hasMounted = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <Connector mapStateToProps={mapState}>
          {() => <Child hasRendered={hasRendered} hasMounted={hasMounted} />}
        </Connector>
      </Provider>
    );
    wrapper.setProps({});
    wrapper.setProps({});
    wrapper.setProps({});
    expect(hasRendered.mock.calls.length).toBe(1);
    expect(hasMounted.mock.calls.length).toBe(1);
  });

  it('renders twice but only mounts once and thus does not throw away the entire tree', () => {
    const hasRendered = jest.fn();
    const hasMounted = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <Connector mapStateToProps={mapState}>
          {({ firstName, lastName }) => (
            <Child
              firstName={firstName}
              lastName={lastName}
              hasRendered={hasRendered}
              hasMounted={hasMounted}
            />
          )}
        </Connector>
      </Provider>
    );

    store.dispatch({ type: UPDATE, payload: { firstName: 'John' } });

    wrapper.update();

    expect(hasRendered.mock.calls.length).toBe(2);
    expect(hasMounted.mock.calls.length).toBe(1);
  });
});
