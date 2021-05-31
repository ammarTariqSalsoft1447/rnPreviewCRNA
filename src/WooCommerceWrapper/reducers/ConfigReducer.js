import config from '../../../config.json'
const initialState = {
    ...config
}
export const ConfigReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CONFIG_UPDATE": {
            return {
                ...state,
                ...action.config
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
