import {
  GET_MONTH_REQUEST,
  GET_MONTH_SUCCESS,
  GET_MONTH_ERROR,
} from './constants';

const initialState = {
  loading: false,
  error: false,
  data: {},
};

const getMonthReducer = (state = initialState, { type, days, monthName }) => {
  switch (type) {
    case GET_MONTH_REQUEST:
      return {
        loading: true,
        error: false,
        data: {},
      };

    case GET_MONTH_SUCCESS:
      return {
        loading: false,
        error: false,
        data: Object.assign(
          {},
          state.data,
          { [monthName]: days },
        ),
      };

    case GET_MONTH_ERROR:
      return {
        loading: false,
        error: true,
        data: state.data,
      };

    default:
      return state;
  }
};

export default getMonthReducer;
