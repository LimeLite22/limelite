import { format } from "date-fns";
import { TRange } from "types/types";

export const isDateInRange = (date: Date, range: TRange): boolean => {
    const currentDate = new Date();

    switch (range) {
        case 'Last week': {
            const currentDay = currentDate.getDay();
            const lastWeekStart = new Date(currentDate);
            lastWeekStart.setDate(currentDate.getDate() - currentDay - 7);
            lastWeekStart.setHours(0, 0, 0, 0); 

            const lastWeekEnd = new Date(currentDate);
            lastWeekEnd.setDate(currentDate.getDate() - currentDay - 1);
            lastWeekEnd.setHours(23, 59, 59, 999);

            return date >= lastWeekStart && date <= lastWeekEnd
        }

        case 'Current month': {
            console.log(date.getMonth(), currentDate.getMonth(), date.getFullYear(), currentDate.getFullYear());
            return date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear();
        }

        case 'Last 30 days': {
            const last30DaysStart = new Date();
            last30DaysStart.setDate(currentDate.getDate() - 30);
            return date >= last30DaysStart && date <= currentDate;
        }
        case 'Current year': {
            return date.getFullYear() === currentDate.getFullYear();
        }

        case 'Last 12 months': {
            const last12MonthsStart = new Date();
            last12MonthsStart.setFullYear(currentDate.getFullYear() - 1);
            return date >= last12MonthsStart && date <= currentDate;
        }

        case 'default': {
            return true
        }

        default: {
            return true
        }
    }
};

export const getDatesInRange = (range: TRange) => {

    let startDate: Date | null = null;
    let endDate: Date | null = null;
    const currentDate = new Date();
    switch (range) {
        case 'Last week': {
            const currentDay = currentDate.getDay();
            startDate = new Date(currentDate);
            startDate.setDate(currentDate.getDate() - currentDay - 7);
            startDate.setHours(0, 0, 0, 0);

            endDate = new Date(currentDate);
            endDate.setDate(currentDate.getDate() - currentDay - 1);
            endDate.setHours(23, 59, 59, 999);
            break;
        }

        case 'Current month': {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            break;
        }

        case 'Last 30 days': {
            const last30DaysStart = new Date();
            last30DaysStart.setDate(currentDate.getDate() - 30);
            startDate = last30DaysStart;
            endDate = currentDate;
            break;
        }

        case 'Current year': {
            startDate = new Date(currentDate.getFullYear(), 0, 1);
            endDate = new Date(currentDate.getFullYear(), 11, 31);
            break;
        }

        case 'Last 12 months': {
            const last12MonthsStart = new Date();
            last12MonthsStart.setFullYear(currentDate.getFullYear() - 1);
            startDate = last12MonthsStart;
            endDate = currentDate;
            break;
        }

        case 'default': {
            startDate = new Date();
            endDate = new Date();
        }
    }

    return { startDate: format(startDate as Date, "MMM d, yyyy"), endDate: format(endDate as Date, "MMM d, yyyy") };
}
