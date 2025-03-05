import { CUSTOM_THUMBNAIL, DEFAULT, HOME_RENTAL, PROFESSIONAL_SCRIPT, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_VIRTUALLY, RUSH_TIME, STUDIO_RENTAL, TRACK_AUTHOR_PROFESSIONAL, VIRTUAL_INTERVIEW, YES } from "consts/consts";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "./../redux/requests/reducer";

export const useCalculateFinalPrice = () => {
  const request = useSelector(selectRequestInfo);
  const preferredDate = request?.logisticSettings?.preferredDate;
  const savedPrefferedDate = preferredDate?.date;
  const savedPrefferedTime = preferredDate?.time;

  let price = 0;
  let addOnsCount = 0

  let rushDay = 0;
  let rushHour = 0;
  let weekEnd = 0;
  let locationType2 = 0;
  let locationType3 = 0;
  let location = 0;
  let professionalScriptWriter = 0;
  let professionalQuestionWriter = 0;
  let virtualQuestion = 0;
  let virtualInterview = 0;
  let professionalTruckAuthor = 0;
  let professionalVoiceWriter = 0;
  let customThumbnail = 0;
  let videoFormats = 0;
  let addOns = 0;
  let turnAround = 0;

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
        weekEnd += 295;
        addOnsCount += 1
      } else {
        price += 0;
      }
      if (
        dateValue.getTime() === today.getTime() ||
        dateValue.getTime() === tomorrow.getTime()
      ) {
        price += 595;
        rushDay = 595;
        addOnsCount += 1
      } else if (dateValue.getTime() === twoDaysAfter.getTime()) {
        price += 495;
        rushDay = 495;
        addOnsCount += 1
      } else if (dateValue.getTime() === threeDaysAfter.getTime()) {
        price += 395;
        rushDay = 395;
        addOnsCount += 1
      } else if (dateValue.getTime() === fourDaysAfter.getTime()) {
        price += 0;
      } else {
        price += 0;
      }
    }
    if (savedPrefferedTime !== DEFAULT && savedPrefferedTime.isAddon) {
      price += 195;
      rushHour += 195;
      addOnsCount += 1
    }
  }
  if (request?.logisticSettings?.location.type === STUDIO_RENTAL) {
    price += 795;
    locationType2 += 795;
    addOnsCount += 1
  }
  if (request?.logisticSettings?.location.type === HOME_RENTAL) {
    price += 695;
    locationType3 += 695;
    addOnsCount += 1
  }
  if (request?.logisticSettings?.travel?.zoneCode?.value && request?.logisticSettings?.travel.selection === YES) {
    const number = request?.logisticSettings?.travel?.zoneCode?.value || 0;
    price += number;
    location += number;
    addOnsCount += 1
  }
  if (request?.script.scriptWriter === PROFESSIONAL_SCRIPT) {
    price += 895;
    professionalScriptWriter += 895;
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionsAuthor === QUESTIONS_AUTHOR_PROFESSIONAL) {
    price += 895;
    professionalQuestionWriter += 895;
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionSettings.type === QUESTIONS_VIRTUALLY) {
    price += 695
    virtualQuestion += 695
    addOnsCount += 1
  }
  if (request?.interviewSettings.questionSettings.type === VIRTUAL_INTERVIEW) {
    price += 695
    virtualInterview += 695
    addOnsCount += 1
  }
  if (request?.voiceTrackSettings.trackAuthor === TRACK_AUTHOR_PROFESSIONAL) {
    price += 895
    professionalTruckAuthor += 895
    addOnsCount += 1
  }
  if (request?.videoSettings.thumbnail === CUSTOM_THUMBNAIL) {
    price += 95
    customThumbnail += 95
    addOnsCount += 1
  }
  if (
    request?.videoSettings?.additionalFormats === true
    && request?.videoSettings?.selectedAdditionalFormats?.length
    && request?.videoSettings?.selectedAdditionalFormats?.length > 0) {
    price += 75
    videoFormats += 75
    addOnsCount += 1
  }
  if (request?.projectInfoSettings?.type?.addOns?.length && request?.projectInfoSettings?.type?.addOns?.length > 0) {
    request?.projectInfoSettings?.type.addOns.forEach((addOn, index) => {
      if (addOn.isSelected && index !== 0) {
        price += addOn.price;
        addOns += addOn.price;
        addOnsCount += 1
      }
    });
  }
  if (request?.videoSettings?.resultTime === RUSH_TIME) {
    turnAround = request?.videoSettings?.time.value || 0;
  }
  return {
    price: price || 0, addOnsCount: addOnsCount || 0,
    list: {
      rushDay: rushDay,
      weekEnd: weekEnd,
      rushHour: rushHour,
      location: location,
      locationType2: locationType2,
      locationType3: locationType3,
      professionalScriptWriter: professionalScriptWriter,
      professionalQuestionWriter: professionalQuestionWriter,
      virtualQuestion: virtualQuestion,
      virtualInterview: virtualInterview,
      professionalTruckAuthor: professionalTruckAuthor,
      professionalVoiceWriter: professionalVoiceWriter,
      customThumbnail: customThumbnail,
      videoFormats: videoFormats,
      turnAround: turnAround,
      addOns: addOns
    }
  };
};
