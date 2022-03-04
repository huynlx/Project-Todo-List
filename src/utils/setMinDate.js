export const setMinDate = () => {
  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10)
    month = '0' + month.toString();
  if (day < 10)
    day = '0' + day.toString();

  var maxDate = year + '-' + month + '-' + day;

  var list, index;
  list = document.getElementsByClassName("date-select");

  for (index = 0; index < list.length; ++index) {
    list[index].setAttribute("min", maxDate);
  }
}