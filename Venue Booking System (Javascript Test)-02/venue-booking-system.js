const bookingData = [
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

const checkAvailability = (roomId, startTime, endTime) => {
  const requestStart = new Date(startTime).getTime();
  const requestEnd = new Date(endTime).getTime();
  for (const booking of bookingData) {
    if (roomId === booking.roomId) {
      const bookingStart = new Date(booking.startTime).getTime();
      const bookingEnd = new Date(booking.endTime).getTime();

      if (
        (requestStart < bookingEnd && requestEnd > bookingStart) ||
        (requestStart <= bookingStart && bookingEnd <= requestEnd)
      ) {
        return false;
      }
    }
  }
  return true;
};

const getStartAndEndOfTwoWeek = (date) => {
  const inputDate = new Date(date);
  const startOfWeek = new Date(inputDate);
  startOfWeek.setDate(inputDate.getDate() - inputDate.getDay());
  startOfWeek.setHours(0, 0, 0);
  const endOfTwoWeek = new Date(inputDate);
  endOfTwoWeek.setDate(startOfWeek.getDate() + 13);
  endOfTwoWeek.setHours(23, 59, 59);
  return { startOfWeek, endOfTwoWeek };
};

const getBookingsForWeek = (roomId, weekNo) => {
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const dateOfYear = (weekNo - 1) * 7;
  const selectedDate = new Date(startOfYear);
  selectedDate.setDate(dateOfYear);
  const { startOfWeek, endOfTwoWeek } = getStartAndEndOfTwoWeek(
    selectedDate.toISOString()
  );

  const bookings = bookingData.filter((booking) => {
    if (booking.roomId !== roomId) return false;
    const bookingStartTime = new Date(booking.startTime).getTime();
    const bookingEndTime = new Date(booking.endTime).getTime();

    const isStartThisWeek =
      bookingStartTime >= startOfWeek.getTime() &&
      bookingStartTime <= endOfTwoWeek.getTime();
    const isEndNextWeek =
      bookingEndTime >= startOfWeek.getTime() &&
      bookingEndTime <= endOfTwoWeek.getTime();
    const isSpanningTwoWeekWeek =
      bookingStartTime <= startOfWeek.getTime() &&
      bookingEndTime >= endOfTwoWeek.getTime();
    return isStartThisWeek || isEndNextWeek || isSpanningTwoWeekWeek;
  });
  return bookings;
};

console.log(getBookingsForWeek("A101", 38));
