import { createStore } from "redux";

export const ACTIONS = (payload = {}) => ({
  DISABLE_INTERRUPT: {
    type: 'DISABLE_CALL_TASK_AVAILABILITY',
  },
  ENABLE_INTERRUPT: {
    type: 'ENABLE_CALL_TASK_AVAILABILITY'
  },
  CLOSE_TASK_CHANNEL: {
    type: 'CLOSE_TASK_CHANNEL',
    payload: payload,
  },
  OPEN_TASK_CHANNEL: {
    type: 'OPEN_TASK_CHANNEL',
    payload: payload
  }
});

const defaultState = {
  isAvailableForCalls: false
};

const reducer = (state = defaultState, action) => {
  if (typeof action.type !== typeof 'string') {
    return state;
  }
  const actions = ACTIONS();

  switch (action.type) {
    case actions.CLOSE_TASK_CHANNEL.type:

    case actions.OPEN_TASK_CHANNEL.type:

    case actions.ENABLE_INTERRUPT.type:

    case actions.DISABLE_INTERRUPT.type:

    default:
      return state;
  }
};

export default createStore(reducer, defaultState);
