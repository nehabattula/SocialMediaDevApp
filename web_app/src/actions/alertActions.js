import { SET_ALERT, REMOVE_ALERT } from "../constants/alertConstants";
import { v4 as uuid } from "uuid";

//common alert for  user actions
export const setAlert =
  (msg, alertType, timeout = 3000) =>
  (dispatch) => {
    const randomId = uuid();
    dispatch({
      type: SET_ALERT,
      data: { msg, alertType, randomId },
    });

    setTimeout(
      () =>
        dispatch({
          type: REMOVE_ALERT,
          data: randomId,
        }),
      timeout
    );
  };
