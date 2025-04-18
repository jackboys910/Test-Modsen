import { format, isToday, isThisWeek } from 'date-fns';

const formatLastMessageTime = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEE HH:mm');
  }
  return format(date, 'dd.MM.yyyy');
};

export default formatLastMessageTime;
