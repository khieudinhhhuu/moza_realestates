// import { FETCH_PRODUCTS } from './types';
import * as  types from './types'
import { getProducts } from '../../utils/data';

export const fetchProducts = () => dispatch => {
    const books = getProducts();
    dispatch({
        type: types.FETCH_PRODUCTS,
        data: books
    })
}
