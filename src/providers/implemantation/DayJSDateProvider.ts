import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { IDateProvider } from '../interfaces'

dayjs.extend(utc)


export class DayjsDateProvider implements IDateProvider {
    compareIfBefore(end_date: Date, start_date: Date): boolean {
        return dayjs(end_date).isBefore(start_date);
      }
      addHours(hours: number): Date {
        return dayjs().add(hours, "hour").toDate()
      }
      addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
      }
  
      dateNow(): Date {
        
        return dayjs().toDate()
      }
      convertToUTC(date: Date): string {
  
        return dayjs(date).utc().local().format()
      }
  
      compareInHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)
  
        return  dayjs(end_date_utc).diff(start_date_utc, "hours")
      }
  
      compareInDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date)
        const start_date_utc = this.convertToUTC(start_date)
  
        return  dayjs(end_date_utc).diff(start_date_utc, "days")
      }
}