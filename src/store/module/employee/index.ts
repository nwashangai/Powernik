const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const CLEAR_DATA = 'CLEAR_DATA';

const retrievedData = localStorage.getItem('record');
const defaultState = {
  employeeData: retrievedData ? JSON.parse(retrievedData) : []
};

export const addEmployee = (record: any) => (dispatch: any) => {
  dispatch({
    type: ADD_EMPLOYEE,
    payload: record
  });
};

export const clearStorage = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_DATA
  });
};

const EmployeeRecord = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      localStorage.setItem(
        'record',
        JSON.stringify([...state.employeeData, action.payload])
      );
      return {
        ...state,
        employeeData: [...state.employeeData, action.payload]
      };
    case CLEAR_DATA:
      localStorage.setItem('record', JSON.stringify([]));
      return {
        ...state,
        employeeData: []
      };

    default:
      return state;
  }
};

export default EmployeeRecord;
