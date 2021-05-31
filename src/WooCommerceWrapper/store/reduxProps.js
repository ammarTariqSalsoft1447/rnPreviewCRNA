
import Dispatcher from '../actions/Dispatcher';

export default {
  mapStateToProps: (state) => {
    console.log('mapStateToProps : ',state)
    return {...state};
  },
  mapDispatchToProps: (dispatch) => {
    return {
      updateConfigs:(config)=>{
        dispatch({type:'CONFIG_UPDATE',config:config})
      },
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
