const calculateDday = (startDate: string | undefined) => {
  if (!startDate) {
    return '-day';
  }

  const today = new Date();
  const start = new Date(startDate);

  const timeDiff = start.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff === 0) {
    return 'D-day';
  } else if (daysDiff > 0) {
    return `D-${daysDiff}`;
  } else {
    return `D+${Math.abs(daysDiff)}`;
  }
};

export default calculateDday;
