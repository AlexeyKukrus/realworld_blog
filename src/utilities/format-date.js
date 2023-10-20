import { format, parseISO } from 'date-fns';

export const formatDate = (createdAt) => {
  if (createdAt === null) {
    return null;
  } else {
    const date = parseISO(createdAt);
    return format(date, 'MMMM d, yyyy');
  }
};
