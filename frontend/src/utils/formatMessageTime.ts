import { format, isToday, isThisWeek } from 'date-fns';

const formatMessageTime = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isThisWeek(date)) {
    return format(date, 'EEE HH:mm');
  }
  return format(date, 'dd.MM.yyyy');
};

export default formatMessageTime;
