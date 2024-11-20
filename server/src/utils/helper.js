export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const calculatedReadTime = (content) => {
  const wordPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordPerMinute);

  return `${minutes} min read`;
};
