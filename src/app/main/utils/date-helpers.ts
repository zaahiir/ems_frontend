export function getBusinessDayDate(startDate: Date, days: number): Date {
  let date = new Date(startDate);
  let businessDays = 0;
  while (businessDays < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      businessDays++;
    }
  }
  return date;
}
  
  export function formatDate(date: Date, format: string): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    switch (format) {
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      default:
        return date.toString();
    }
  }