import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RESTORE_USER, RESTORE_BUDGETS } from '../constants/actions';

class PlaceholderContainer extends React.Component {
  componentWillMount() {
    this.reroute();
  }

  reroute = async () => {
    AsyncStorage.getItem('user')
      .then(userData => {
        if (userData) {
          this.props.restoreUser(JSON.parse(userData));
          // AsyncStorage.removeItem('budgets') // for debugging
          AsyncStorage.getItem('budgets')
            .then(budgetsData => {
              if (budgetsData) this.props.restoreBudgets(JSON.parse(budgetsData));
              Actions.replace('budgetList');
            }).catch(budgetsError => {
              console.error(budgetsError);
              Actions.replace('login');
            });
        } else {
          Actions.replace('login');
        }
      }).catch(error => {
        console.error(error);
        Actions.replace('login');
      });
  }

  render() { return <View />; }
}

const mapDispatchToProps = dispatch => ({
  restoreUser: user => dispatch({
    type: RESTORE_USER,
    payload: { user },
  }),
  restoreBudgets: budgets => dispatch({
    type: RESTORE_BUDGETS,
    payload: { budgets },
  }),
});

PlaceholderContainer.propTypes = {
  restoreUser: PropTypes.func.isRequired,
  restoreBudgets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PlaceholderContainer);
