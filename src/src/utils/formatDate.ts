import moment from 'moment/moment';

export function formatDate(inputDate: string) {
  const dateMatch = inputDate.match(/(\d{4})-(\d{2})-(\d{2})/);

  if (dateMatch) {
    const [, year, month, day] = dateMatch;
    return `${day}.${month}.${year}`;
  } else {
    return "Invalid date format";
  }
}

export function getNextPayDate(date: string) {
  const inputDate = new Date(moment.utc(date).toDate());

  const currentDate = new Date().getDate();
  const currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Определяем день последней выплаты
  const lastPaymentDay = currentDate < 15 ? 1 : 15;
  const lastPaymentDate = new Date(currentYear, currentMonth, lastPaymentDay);

  // Определяем день выплаты
  let paymentDay;
  let nextMonth = currentMonth + 1;

  // Логика для определения дня и месяца выплаты
  if (inputDate < lastPaymentDate) {
    paymentDay = currentDate < 15 ? 15 : 1;
    nextMonth = currentMonth < 11 ? nextMonth : 0;
  } else {
    paymentDay = currentDate < 15 ? 1 : 15
    nextMonth = currentMonth < 11 ? nextMonth : 0;
    currentYear = currentMonth < 11 ? currentYear : currentYear + 1;
  }

  return new Date(currentYear, nextMonth, paymentDay).toLocaleDateString('ru-RU');
}