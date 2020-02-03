export const simpleAction = () => (dispatch: any) => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: 'result_of_simple_action'
  });
};

export default (state = {}, action: any) => {
  switch (action.type) {
    case 'SIMPLE_ACTION':
      return {
        result: action.payload
      };
    default:
      return state;
  }
};
