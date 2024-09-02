"use client";
import { useContext } from "react";
import { Reservation, ReservationContext } from "./context";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const reservation = useContext(ReservationContext);

  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1 className='font-semibold text-xl'>Reservation</h1>
      <div>{JSON.stringify(reservation)}</div>
      <ReservationContext.Provider value={new Reservation()}>
        {children}
      </ReservationContext.Provider>
    </div>
  );
}
