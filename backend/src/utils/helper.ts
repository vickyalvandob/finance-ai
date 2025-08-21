import {addDays, addMonths, addWeeks, startOfMonth} from "date-fns"
import { RecurringIntervalEnum } from "../models/transaction.model";

export function calulateNextReportDate(
  lastSentDate?: Date
): Date {
  const now = new Date();
  const lastSent = lastSentDate || now;
  
  const nextDate = startOfMonth(addMonths(lastSent, 1));
  nextDate.setHours(0,0,0,0)

  return nextDate;
}

export function calculateNextOccurrence(
  date:Date,
  recurringInterval: keyof typeof RecurringIntervalEnum
){
  const base = new Date(date)
  base.setHours(0,0,0,0);

  switch(recurringInterval){
    case RecurringIntervalEnum.DAILY:
      return addDays(base, 1);
    case RecurringIntervalEnum.WEEKLY:
      return addWeeks(base, 1);
    case RecurringIntervalEnum.MONTHLY:
      return addMonths(base, 1);
    case RecurringIntervalEnum.YEARLY:
      return addWeeks(base, 1);
    default:
      return base;
  }

}