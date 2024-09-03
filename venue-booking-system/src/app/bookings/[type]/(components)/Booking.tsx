"use client";

type Booking = {
  id: number;
  roomId: string;
  startTime: string;
  endTime: string;
  title: string;
};

type Props = {
  type: string;
  roomId: string;
  bookings: Booking[];
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
export default function Booking({ type, roomId, bookings }: Props) {
  const today = new Date("2019-09-28");
  const currentDate = today.getDate();
  const currentDay = today.getDay();

  const getStartAndEndOfWeek = (date: string) => {
    const inputDate = new Date(date);
    const startOfWeek = new Date(inputDate);
    startOfWeek.setDate(inputDate.getDate() - ((inputDate.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0);
    const endOfWeek = new Date(inputDate);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59);
    return { startOfWeek, endOfWeek };
  };
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(today.toDateString());
  const getEachDayOfWeek = (date: string) => {
    const { startOfWeek } = getStartAndEndOfWeek(date);

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      daysOfWeek.push(day);
    }

    return daysOfWeek;
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
      <div className="bg-[#46529D] w-2/5 pl-[90px] pb-[90px] text-white">
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
        <ul className="flex flex-col gap-2 max-h-96 mr-2 overflow-auto">
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
          <p>THIS WEEK</p>
          <p>NEXT WEEK</p>
          <p>WHOLE WEEK</p>
        </div>
        {bookings.length > 0 ? (
          <div className="flex-1 overflow-auto">
            {getEachDayOfWeek(today.toDateString()).map((day) => (
              <div key={day.toDateString()}>
                <p className="font-bold bg-[#F7F7F7] pl-24 border py-4 border-[#ECECEC] text-[18px] text-[#787878]">
                  {today.getDate() === day.getDate() && "Today "}(
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
            ))}
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
