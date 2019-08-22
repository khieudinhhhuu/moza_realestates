import * as types from '../actions/types';

const initialState = {
    items : []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.PRODUCTS:
            return{
                ...state,
                items: action.payload
            };
        default:
            return state
    }
}
