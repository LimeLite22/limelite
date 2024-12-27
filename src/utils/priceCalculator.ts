import { CUSTOM_THUMBNAIL, DEFAULT, PROFESSIONAL_SCRIPT, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_VIRTUALLY, TRACK_AUTHOR_PROFESSIONAL, VIRTUAL_INTERVIEW } from "consts/consts";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "./../redux/requests/reducer";

export const useCalculateFinalPrice = () => {
  const request = useSelector(selectRequestInfo);
  const preferredDate = request?.preferredDate;
  const savedPrefferedDate = preferredDate?.date;
  const savedPrefferedTime = preferredDate?.time;

  let price: number = 0;
  let addOnsCount = 0
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
        addOnsCount += 1
      } else {
        price += 0;
      }
      if (
        dateValue.getTime() === today.getTime() ||
        dateValue.getTime() === tomorrow.getTime()
      ) {
        price += 595;
        addOnsCount += 1
      } else if (dateValue.getTime() === twoDaysAfter.getTime()) {
        price += 495;
        addOnsCount += 1
      } else if (dateValue.getTime() === threeDaysAfter.getTime()) {
        price += 395;
        addOnsCount += 1
      } else if (dateValue.getTime() === fourDaysAfter.getTime()) {
        price += 0;
      } else {
        price += 0;
      }
    }
    if (savedPrefferedTime !== DEFAULT && savedPrefferedTime.isAddon) {
      price += 195;
      addOnsCount += 1
    }
  }
  if (request?.location.type === 2) {
    price += 795;
    addOnsCount += 1
  }
  if (request?.location.type === 3) {
    price += 695;
    addOnsCount += 1
  }
  if (request?.travel?.zoneCode?.value) {
    const number = request?.travel?.zoneCode?.value || 0;
    price += number;
    addOnsCount += 1
  }
  if (request?.scriptSettings.scriptWriter === PROFESSIONAL_SCRIPT) {
    price += 895;
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL) {
    price += 895
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionSettings.type === QUESTIONS_VIRTUALLY) {
    price += 695
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionSettings.type === VIRTUAL_INTERVIEW) {
    price += 695
    addOnsCount += 1
  }
  if (request?.voiceTrackSettings.trackAuthor === TRACK_AUTHOR_PROFESSIONAL) {
    price += 895
    addOnsCount += 1
  }
  if (request?.voiceTrackSettings.scriptAuthor === PROFESSIONAL_SCRIPT) {
    price += 895
    addOnsCount += 1
  }
  if (request?.videoSettings.thumbnail === CUSTOM_THUMBNAIL) {
    price += 95
    addOnsCount += 1
  }
  if (request?.videoSettings?.additionalFormats === true && request?.videoSettings?.selectedAdditionalFormats?.length && request?.videoSettings?.selectedAdditionalFormats?.length > 0) {
    price += 75
    addOnsCount += 1
  }
  return { price: price || 0, addOnsCount: addOnsCount || 0 };
};
