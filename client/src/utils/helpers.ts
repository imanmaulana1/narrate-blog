import moment from 'moment';

export const dateFormatted = (date: string | undefined) => {
  if (!date) return '';

  return moment(date).format('MMM D, YYYY');
};

export const dateFormattedFromNow = (date: string) => {
  return moment(date).fromNow();
};
