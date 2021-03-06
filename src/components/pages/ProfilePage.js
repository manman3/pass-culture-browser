import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import withLogin from '../hocs/withLogin'
import { requestData } from '../../reducers/data'

class ProfilePage extends Component {
  onSignOutClick = () => {
    const { requestData } = this.props
    requestData('GET', 'users/signout')
  }
  componentWillReceiveProps(nextProps) {
    const {
      history: { push },
      user,
    } = nextProps
    if (user === false && this.props.user) {
      push('/')
    }
  }
  render() {
    const { user } = this.props
    return (
      <main className="page center col-6 mx-auto mt3">
        <div className="h2 mb2">Bienvenue !</div>
        <div className="mb2">
          {(user && user.email) ||
            "vous n'etes pas connecté (ou attendez 2s...)"}
        </div>
        <button
          className={classnames('button button--alive', {
            'button--disabled': !user,
          })}
          disabled={!user}
          onClick={this.onSignOutClick}
        >
          Déconnection
        </button>
      </main>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  withRouter,
  connect(state => ({ user: state.user }), { requestData })
)(ProfilePage)
