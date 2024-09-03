"use client";

import { useRouter } from "next/navigation";

type BookingRange = "thisweek" | "nextweek" | "wholemonth";

type Booking = {
  id: number;
  roomId: string;
  startTime: string;
  endTime: string;
  title: string;
};

type Props = {
  type: BookingRange;
  roomId: string;
  bookings: Booking[];
  start: Date;
  end: Date;
  today: Date;
};
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export default function Booking({
  type,
  roomId,
  bookings,
  start,
  end,
  today,
}: Props) {
  const router = useRouter();
  const currentDate = today.getDate();
  const currentDay = today.getDay();

  const getEachDayOfRange = () => {
    if (type === "thisweek" || type === "nextweek") {
      const daysOfWeek = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        daysOfWeek.push(day);
      }

      return daysOfWeek;
    } else if (type === "wholemonth") {
      const daysOfMonth = [];
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );
      for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
        const day = new Date(start);
        day.setDate(start.getDate() + i);
        daysOfMonth.push(day);
      }
      return daysOfMonth;
    } else {
      return [];
    }
  };
  const getBookings = (date: Date) => {
    const startOfDay = new Date(date).setHours(0, 0, 0);
    const endOfDay = new Date(date).setHours(23, 59, 59);
    return bookings.filter((booking) => {
      const bookingStartDate = new Date(booking.startTime).getTime();
      const bookingEndDate = new Date(booking.endTime).getTime();
      return (
        (bookingStartDate >= startOfDay && bookingStartDate <= endOfDay) ||
        (bookingEndDate >= startOfDay && bookingEndDate <= endOfDay) ||
        (bookingStartDate <= startOfDay && bookingEndDate >= endOfDay)
      );
    });
  };
  return (
    <div className="flex w-full h-full">
      <div className="bg-[#46529D] w-2/5 pl-[90px] max-h-[1000px] pb-[90px] text-white">
        <div className="bg-[#2EBAEE] h-[135px] leading-none pt-14 pl-12 pb-8">
          <p className="text-[54px] font-medium">{roomId}</p>
        </div>
        <p className="mt-[125px] mb-[58px] font-bold text-lg">Upcoming</p>
        <p className="font-light text-[64px] opacity-50">
          {daysInWeek[currentDay]}
        </p>
        <p className="font-light text-[64px] mb-[68px]">
          {currentDate} {months[today.getMonth()]}
        </p>
        <ul className="flex flex-col gap-2 max-h-80 mr-2 overflow-auto scroll-smooth">
          {getBookings(today).map((booking) => {
            const formattedStartTime = new Date(
              booking.startTime
            ).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const formattedEndTime = new Date(
              booking.endTime
            ).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <li key={booking.id} className="py-4">
                <p className="opacity-50">
                  {formattedStartTime} - {formattedEndTime}
                </p>
                <p className="text-xl">{booking.title}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-white flex flex-col min-h-full w-3/5 relative">
        <div className="pl-16 pt-20 h-[135px] flex gap-[75px] bg-[#EFEEEC] text-2xl">
          <button
            className={
              type === "thisweek"
                ? "opacity-100 border-b-2 border-[#707FDD]"
                : "opacity-50"
            }
            onClick={() => {
              router.push(`/bookings/thisweek?roomId=${roomId}`);
            }}>
            THIS WEEK
          </button>
          <button
            className={
              type === "nextweek"
                ? "opacity-100 border-b-2 border-[#707FDD]"
                : "opacity-50"
            }
            onClick={() => {
              router.push(`/bookings/nextweek?roomId=${roomId}`);
            }}>
            NEXT WEEK
          </button>
          <button
            className={
              type === "wholemonth"
                ? "opacity-100 border-b-2 border-[#707FDD]"
                : "opacity-50"
            }
            onClick={() => {
              router.push(`/bookings/wholemonth?roomId=${roomId}`);
            }}>
            WHOLE MONTH
          </button>
        </div>
        {bookings.length > 0 ? (
          <div className="flex-1 overflow-auto scroll-smooth max-h-[800px]">
            {getEachDayOfRange().map((day) => {
              const tomorrowDate = new Date(today);
              tomorrowDate.setDate(today.getDate() + 1);
              return (
                <div key={day.toDateString()}>
                  <p className="font-bold bg-[#F7F7F7] pl-24 border py-4 border-[#ECECEC] text-[18px] text-[#787878]">
                    {today.getDate() === day.getDate() && "Today "}
                    {tomorrowDate.getDate() === day.getDate() && "Tomorrow "}(
                    {daysInWeek[day.getDay()]}, {day.getDate()}{" "}
                    {months[day.getMonth()]} )
                  </p>
                  <ul>
                    {getBookings(day).map((booking) => {
                      const formattedStartTime = new Date(
                        booking.startTime
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      const formattedEndTime = new Date(
                        booking.endTime
                      ).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <li
                          key={booking.id}
                          className="p-4 border-l relative ml-14 pb-20">
                          <div className="w-2 h-2 absolute top-8 bg-red-400 -ml-5 rounded-full" />
                          <div className="absolute left-10 top-1/4 flex">
                            <div>
                              <p className="opacity-50">
                                {formattedStartTime} - {formattedEndTime}
                              </p>
                              <p className="text-xl">{booking.title}</p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-1">
            No booking found.
          </div>
        )}
      </div>
    </div>
  );
}
