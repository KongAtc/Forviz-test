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
  const today = new Date();
  const currentDate = today.getDate();
  const currentDay = today.getDay();
  const startOfWeek = new Date().setDate(currentDate - (currentDay - 1));
  const endOfWeek = new Date().setDate(currentDate + (7 - currentDay));
  console.log(bookings);
  // const startOfNextWeek = startOfWeek + MILLISECOND_PER_WEEK;
  // const endOfNextWeek = endOfWeek + MILLISECOND_PER_WEEK;
  return (
    <div className="flex w-full h-full">
      <div className="bg-[#46529D] w-2/5 pl-[90px] text-white">
        <div className="bg-[#2EBAEE] pt-14 pl-12 pb-6">
          <p className="text-[54px] font-medium">{roomId}</p>
        </div>
        <p className="mt-[125px] mb-[58px] font-bold text-lg">Upcoming</p>
        <p className="font-light text-[64px] opacity-50">
          {daysInWeek[currentDay]}
        </p>
        <p className="font-light text-[64px]">
          {currentDate} {months[today.getMonth()]}
        </p>
        <ul className="flex flex-col gap-2">
          {bookings.map((booking) => {
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
      <div className="bg-white w-3/5">2</div>
    </div>
  );
}
