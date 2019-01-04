import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { actionCreator } from '../../../reducers';

const LogoutButton = ({ logout }) => (
    <Icon link name="log out" size="big" onClick={logout} />
);

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actionCreator.logout()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);

