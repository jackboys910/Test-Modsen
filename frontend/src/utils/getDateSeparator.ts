import { format } from 'date-fns';

const getDateSeparator = (currentMessageDate: string, previousMessageDate?: string) => {
  if (!currentMessageDate) return null;

  const currentDate = new Date(currentMessageDate);
  if (isNaN(currentDate.getTime())) return null;

  const previousDate = previousMessageDate ? new Date(previousMessageDate) : null;
  if (previousDate && isNaN(previousDate.getTime())) return null;

  if (!previousDate || currentDate.toDateString() !== previousDate.toDateString()) {
    return format(currentDate, 'd MMMM');
  }

  return null;
};

export default getDateSeparator;
