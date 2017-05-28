import * as React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export const Login = React.createClass({
  onLogin() {
    console.log(`I'm working!`);
    let {dispatch} = this.props;

    dispatch(actions.startLogin());
  },
  render() {
    return (
      <div>
        <h1 className="page-title">Todo App</h1>

        <div className="row">
          <div className="columns small-centered small-10 medium-6 large-4">
            <div className="callout callout-auth">
              <h3>Login</h3>
              <p>
                Login with Github account below.
              </p>
              <button className="button" onClick={this.onLogin}>Login With Github</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// export default connect()(Login);
export default Redux.connect()(Login);
