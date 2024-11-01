import { format, isToday, isThisWeek } from 'date-fns';

const formatMessageTime = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isThisWeek(date)) {
    return format(date, 'EEE HH:mm');
  }
  return format(date, 'dd.MM.yyyy');
};

export default formatMessageTime;
