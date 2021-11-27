export const formatDate = dateString => {
  let date = new Date(dateString);
  date = date.toLocaleDateString().replaceAll('/', '-');

  return date;
}
