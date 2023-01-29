import { nanoid } from "@reduxjs/toolkit";
import { store } from "../store";
import { addAlert, removeAlert } from "../features/alert/alert.slice";

import { IAlert } from "../interfaces/app/alert.interface";

export function setAlert(alertData: Omit<IAlert, "id">) {
  const { dispatch } = store;

  const id = nanoid();

  setTimeout(() => dispatch(removeAlert(id)), 3000);

  dispatch(addAlert({ id, ...alertData }));
}
