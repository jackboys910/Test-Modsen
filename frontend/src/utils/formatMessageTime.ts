import { format } from 'date-fns';

const formatMessageTime = (dateString: string | null) => {
  if (!dateString) return '';
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return '';
  }

  return format(date, 'HH:mm');
};

export default formatMessageTime;
