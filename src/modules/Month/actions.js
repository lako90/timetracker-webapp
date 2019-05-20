import serverInstance from '../../libraries/axios';
import {
  GET_MONTH_REQUEST,
  GET_MONTH_SUCCESS,
  GET_MONTH_ERROR,
} from './constants';

const getMonthRequest = () => ({ type: GET_MONTH_REQUEST });
const getMonthSuccess = (days, monthName) => ({
  type: GET_MONTH_SUCCESS,
  days,
  monthName,
});
const getMonthError = error => ({
  type: GET_MONTH_ERROR,
  error,
});

const getMonth = monthName => (dispatch) => {
  dispatch(getMonthRequest());

  return serverInstance({
    method: 'get',
    url: `2019/${monthName}`,
  }).then(({ data }) => {
    dispatch(getMonthSuccess(data, monthName));
  }).catch(() => {
    dispatch(getMonthError());
  });
};

export default getMonth;
