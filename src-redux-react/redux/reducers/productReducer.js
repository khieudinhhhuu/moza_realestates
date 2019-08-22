import * as  types from '../actions/types'

const initialState = {
    items: []
};
export default function(state = initialState, action) {
    switch(action.type){
        case types.FETCH_PRODUCTS:
            return {
                ...state,
                items:action.data
            }
        default:
            return state
    }
}
