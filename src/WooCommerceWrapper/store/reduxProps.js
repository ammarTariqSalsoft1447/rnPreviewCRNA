import Dispatcher from '../actions/Dispatcher';

export default {
  mapStateToProps: (state) => {
    return {...state};
  },
  mapDispatchToProps: (dispatch) => {
    return {
      setApplication: (application) => {
        dispatch({type: 'SET_APPLICATION', application: application});
      },
      clearApplication: () => {
        dispatch({type: 'CLEAR_APPLICATION'});
      },
      ...Dispatcher(dispatch),
    };
  },
};
