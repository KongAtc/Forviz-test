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

const MILLISECOND_PER_WEEK = 604800000;

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

  const today = new Date("2019-09-29");
  const currentDate = today.getDate();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(currentDate - ((currentDay + 6) % 7));
  startOfWeek.setHours(0, 0, 0);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59);

  const startOfNextWeek = startOfWeek.getTime() + MILLISECOND_PER_WEEK;
  const endOfNextWeek = endOfWeek.getTime() + MILLISECOND_PER_WEEK;

  const getBookingsByRange = (roomId: string, bookingRange: BookingRange) => {
    const matchedRoomId = bookingData.filter(
      (booking) => booking.roomId === roomId
    );
    const todayBookings = matchedRoomId.filter((booking) => {
      const bookingStartDate = new Date(booking.startTime).getDate();
      const bookingEndDate = new Date(booking.endTime).getDate();

      return bookingStartDate === currentDate || bookingEndDate === currentDate;
    });
    if (bookingRange === "thisweek") {
      const currentWeekBookings = matchedRoomId.filter((booking) => {
        const bookingStartTime = new Date(booking.startTime).getTime();
        const bookingEndTime = new Date(booking.startTime).getTime();
        const isStartThisWeek =
          bookingStartTime >= startOfWeek.getTime() &&
          bookingStartTime <= endOfWeek.getTime();
        const isEndThisWeek =
          bookingEndTime >= startOfWeek.getTime() &&
          bookingEndTime <= endOfWeek.getTime();

        return isStartThisWeek || isEndThisWeek;
      });
      return currentWeekBookings;
    } else if (bookingRange === "nextweek") {
      const nextWeekBookings = matchedRoomId.filter((booking) => {
        const bookingStartDate = new Date(booking.startTime).getTime();
        const bookingEndDate = new Date(booking.endTime).getTime();
        const isStartNextWeek =
          bookingStartDate >= startOfNextWeek &&
          bookingStartDate <= endOfNextWeek;
        const isEndNextWeek =
          bookingEndDate >= startOfNextWeek && bookingEndDate <= endOfNextWeek;

        return isStartNextWeek || isEndNextWeek;
      });
      return nextWeekBookings;
    } else {
      return [];
    }
  };
  const bookings = getBookingsByRange(searchParams.roomId, params.type);

  return (
    <Booking
      type={params.type}
      roomId={searchParams.roomId}
      bookings={bookings}
    />
  );
}
