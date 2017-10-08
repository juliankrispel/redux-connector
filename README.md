# Redux Connector

[Install from npm](https://www.npmjs.com/package/redux-connector) - `yarn add redux-connector` or `npm install redux --save`

A component alternative for the `connect` HOC from react-redux, using the [Function as a child](https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9) or [render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) pattern.  
```jsx
<Connect
  mapStateToProps={mapStateToProps}
  mapDispatchToProps={mapDispatchToProps}
>
  {({ currentUser, login }) => (
    { currentUser.isLoggedIn
    ? <HomeScreen />
    : <LoginScreen login={login} />}
  )}
</Connect>
```

## Rationale

Higher order components are used to wrap other components. This component enables you to use connect straightforwardly within jsx, removing much of the cognitive burden of using connect and refactoring components to use connect.


## API:

Redux Connector mirrors the api from [the `connect`](https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) method of [react-redux](https://github.com/reactjs/react-redux). To configure the component, simply add the arguments as props.

### Props

- `mapStateToProps` - (Function),
- `mapDispatchToProps` - (Function)
- `mergeProps` - (Function)
- `options` - (Object)

## A more complete Example

```jsx
import React from 'react';
import Connector from 'redux-connector';
import { loginAction } from '../actions/user';

const mapStateToProps = ({ currentUser }) => ({ currentUser });
const mapDispatchToProps = { login: loginAction };

const Root = () => (
  <Connect
    mapStateToProps={mapStateToProps}
    mapDispatchToProps={mapDispatchToProps}
  >
    {({ currentUser, login }) => (
      { currentUser.isLoggedIn
      ? <HomeScreen />
      : <LoginScreen login={login} />}
    )}
  </Connect>
)
```

Shoutout to [Max Stoiber](https://twitter.com/mxstbr) for putting this into my head!

