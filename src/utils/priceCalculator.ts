import { DEFAULT, PROFESSIONAL_SCRIPT } from "consts/consts";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "./../redux/requests/reducer";

export const useCalculateFinalPrice = () => {
  const request = useSelector(selectRequestInfo);
  const preferredDate = request?.preferredDate;
  const savedPrefferedDate = preferredDate?.date;
  const savedPrefferedTime = preferredDate?.time;

  let price: number = 0;
  if (savedPrefferedDate && savedPrefferedTime) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dates = Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d;
    });
    const [tomorrow, twoDaysAfter, threeDaysAfter, fourDaysAfter] =
      dates.slice(1);

    if (!Array.isArray(savedPrefferedDate) && savedPrefferedDate !== DEFAULT) {
      const dateValue = new Date(savedPrefferedDate as Date);
      dateValue.setHours(0, 0, 0, 0);

      if (dateValue.getDay() === 6 || dateValue.getDay() === 0) {
        price += 295;
      } else {
        price += 0;
      }
      if (
        dateValue.getTime() === today.getTime() ||
        dateValue.getTime() === tomorrow.getTime()
      ) {
        price += 595;
      } else if (dateValue.getTime() === twoDaysAfter.getTime()) {
        price += 495;
      } else if (dateValue.getTime() === threeDaysAfter.getTime()) {
        price += 395;
      } else if (dateValue.getTime() === fourDaysAfter.getTime()) {
        price += 0;
      } else {
        price += 0;
      }
    }
    if (savedPrefferedTime !== DEFAULT && savedPrefferedTime.isAddon) {
      price += 195;
    }
  }

  if (request?.location.type === 2) {
    price += 795;
  }
  if (request?.location.type === 3) {
    price += 695;
  }
  if (request?.travel?.zoneCode?.value) {
    const number = request?.travel?.zoneCode?.value || 0;
    price += number;
  }
  if (request?.scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT) {
    price += 895;
  }
  return price || 0;
};
