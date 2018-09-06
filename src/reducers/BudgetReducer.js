import { fromJS } from 'immutable';
import { SAVE_BUDGET_RESPONSE, RESTORE_BUDGETS } from '../constants/actions';

const INITIAL_STATE = fromJS({ budgets: {} });

export default(state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_BUDGET_RESPONSE:
    case RESTORE_BUDGETS:
      return state.merge({ budgets: payload.budgets });
    default:
      return state;
  }
};
