import Booking from "./(components)/Booking";

type BookingRange = "thisweek" | "nextweek" | "wholemonth";

type Booking = {
  id: number;
  roomId: string;
  startTime: string;
  endTime: string;
  title: string;
};

type Props = {
  params: { type: BookingRange };
  searchParams: { [key: string]: string | undefined };
};

export default function BookingPage({ params, searchParams }: Props) {
  if (!searchParams.roomId) {
    return;
  }
  const bookingData: Booking[] = [
    {
      id: 1,
      roomId: "A101",
      startTime: "2019-09-28 13:00:00",
      endTime: "2019-09-28 14:00:00",
      title: "Lunch with Petr",
    },
    {
      id: 2,
      roomId: "A101",
      startTime: "2019-09-28 14:00:00",
      endTime: "2019-09-28 15:00:00",
      title: "Sales Weekly Meeting",
    },
    {
      id: 3,
      roomId: "A101",
      startTime: "2019-09-28 16:00:00",
      endTime: "2019-09-28 18:00:00",
      title: "Anastasia Website Warroom",
    },
    {
      id: 4,
      roomId: "A101",
      startTime: "2019-09-29 13:00:00",
      endTime: "2019-09-29 14:00:00",
      title: "One-on-One Session",
    },
    {
      id: 5,
      roomId: "A101",
      startTime: "2019-09-29 16:00:00",
      endTime: "2019-09-29 18:00:00",
      title: "UGC Sprint Planning",
    },
    {
      id: 6,
      roomId: "A102",
      startTime: "2019-09-30 09:00:00",
      endTime: "2019-10-04 18:00:00",
      title: "5-Day Design Sprint Workshop",
    },
    {
      id: 7,
      roomId: "Auditorium",
      startTime: "2019-09-19 09:00:00",
      endTime: "2019-09-23 19:00:00",
      title: "Thai Tech Innovation 2019",
    },
    {
      id: 8,
      roomId: "A101",
      startTime: "2019-09-28 10:00:00",
      endTime: "2019-09-28 13:00:00",
      title: "Raimonland project",
    },
    {
      id: 9,
      roomId: "A102",
      startTime: "2019-09-30 18:00:00",
      endTime: "2019-09-30 20:00:00",
      title: "Management Meetinng",
    },
    {
      id: 10,
      roomId: "A101",
      startTime: "2019-10-04 14:00:00",
      endTime: "2019-10-06 11:00:00",
      title: "3-day workshop Corgi costume",
    },
  ];

  const today = new Date("2019-09-28");
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
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek(today.toISOString());
  const startOfNextWeek = new Date(startOfWeek);
  startOfNextWeek.setDate(startOfNextWeek.getDate() + 7);
  const endOfNextWeek = new Date(startOfNextWeek);
  endOfNextWeek.setDate(startOfNextWeek.getDate() + 6);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59);

  const rangeCondition = {
    thisweek: { start: startOfWeek, end: endOfWeek },
    nextweek: { start: startOfNextWeek, end: endOfNextWeek },
    wholemonth: { start: startOfMonth, end: endOfMonth },
  };
  const { start, end } = rangeCondition[params.type] || {};
  if (!start || !end) {
    return [];
  }
  const getBookingsByRange = (roomId: string) => {
    const currentWeekBookings = bookingData.filter((booking) => {
      if (booking.roomId !== roomId) return false;

      const bookingStartTime = new Date(booking.startTime).getTime();
      const bookingEndTime = new Date(booking.endTime).getTime();
      const isStartThisWeek =
        bookingStartTime >= start.getTime() &&
        bookingStartTime <= end.getTime();
      const isEndThisWeek =
        bookingEndTime >= start.getTime() && bookingEndTime <= end.getTime();
      const isSpanningThisWeek =
        bookingStartTime <= start.getTime() && bookingEndTime >= end.getTime();

      return isStartThisWeek || isEndThisWeek || isSpanningThisWeek;
    });
    return currentWeekBookings;
  };
  const bookings = getBookingsByRange(searchParams.roomId);
  const sortedBookings = bookings.sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  return (
    <Booking
      type={params.type}
      roomId={searchParams.roomId}
      bookings={sortedBookings}
      today={today}
      start={start}
      end={end}
    />
  );
}
