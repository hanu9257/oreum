import { Dayjs } from "dayjs";
import { createContext } from "react";

export class Reservation {
  start: null | Dayjs;
  end: null | Dayjs;
  email: null | string;

  constructor() {
    this.start = null;
    this.end = null;
    this.email = null;
  }
}

export const ReservationContext = createContext<Reservation>(new Reservation());
