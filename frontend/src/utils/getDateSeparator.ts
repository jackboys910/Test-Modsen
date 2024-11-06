import { format } from 'date-fns';

const getDateSeparator = (currentMessageDate: string, previousMessageDate?: string) => {
  const currentDate = new Date(currentMessageDate);
  const previousDate = previousMessageDate ? new Date(previousMessageDate) : null;

  if (!previousDate || currentDate.toDateString() !== previousDate.toDateString()) {
    return format(currentDate, 'd MMMM');
  }

  return null;
};

export default getDateSeparator;
