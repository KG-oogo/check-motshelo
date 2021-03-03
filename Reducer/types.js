export const ADD_UPDATE_LOCATION = "ADD_UPDATE_LOCATION";


export const addUpdateDataTransaction = (actionType, payload) => {
  
  return (dispatch) => {
    dispatch({ type: actionType, payload: payload });
  };
};