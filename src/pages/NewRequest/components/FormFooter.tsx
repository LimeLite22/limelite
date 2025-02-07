import {
  ArrowBlue3,
  Basket,
  CalendarBlack,
  Chat2,
  LearnMore,
  LocationBlack,
} from "assets/images";
import { DEFAULT } from "consts/consts";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCalculateFinalPrice } from "utils/priceCalculator";

import { selectRequestInfo } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";

const FormFooter = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const option = selectedRequest?.projectInfoSettings.option;
  const location = selectedRequest?.logisticSettings?.location;
  const preferredDate = selectedRequest?.logisticSettings?.preferredDate;
  const company = location?.company;
  const street = location?.street;
  const city = location?.city;
  const state = location?.state;
  const zip = location?.zip;
  const { price, addOnsCount } = useCalculateFinalPrice();
  const calculateEndTime = (
    hour: number | undefined,
    period: string | undefined,
  ): { hour: number; period: string } => {
    if (!hour || !period) return { hour: 0, period: "AM" };
    let adjustedHour = hour + 3;
    let adjustedPeriod = period;

    if (adjustedHour >= 12) {
      if (adjustedHour > 12) adjustedHour -= 12;
      adjustedPeriod = period === "AM" ? "PM" : "AM";
    }

    return { hour: adjustedHour, period: adjustedPeriod };
  };
  const endTime =
    preferredDate?.time !== DEFAULT &&
    calculateEndTime(preferredDate?.time?.hour, preferredDate?.time?.type);
  return (
    <div className={styles.footer}>
      <div className={styles.footer_container}>
        <div className={styles.footer_container_content}>
          <img className={styles.footer_chat} src={Chat2} alt="" />
          <div className={styles.footer_container_typeContainer}>
            <img
              className={styles.footer_container_typeContainer_img}
              src={option?.img}
              alt=""
            />
            <div className={styles.footer_container_typeContainer_text}>
              <div
                className={styles.footer_container_typeContainer_text_title1}
              >
                {option?.value}
                {option?.credits && (
                  <div
                    className={
                      styles.footer_container_typeContainer_text_title1_tag
                    }
                  >
                    {option?.credits}{" "}
                    {option?.credits > 1 ? "Credits" : "Credit"}{" "}
                  </div>
                )}
              </div>
              <Link to="/new-request/project">
                <div
                  className={styles.footer_container_typeContainer_text_title2}
                >
                  Change your selection
                  <img src={ArrowBlue3} alt="" />
                </div>
              </Link>
            </div>
          </div>
          <div className={styles.footer_container_content_divider}></div>
          <div className={styles.footer_container_timeContainer}>
            <img
              className={styles.footer_container_timeContainer_img}
              src={CalendarBlack}
              alt=""
            />
            <div className={styles.footer_container_timeContainer_text}>
              <div
                className={styles.footer_container_timeContainer_text_title1}
                style={{
                  color:
                    preferredDate?.date === DEFAULT ? "var(--gray-light5)" : "",
                }}
              >
                {preferredDate?.date !== DEFAULT
                  ? format(preferredDate?.date as Date, "E,MMMM dd, yyyy")
                  : "Day, Month XX, XXXX"}
              </div>
              <div
                className={styles.footer_container_timeContainer_text_title2}
              >
                {preferredDate?.time !== DEFAULT && endTime ? (
                  <>
                    from
                    <span> {preferredDate?.time.hour}:00 </span>
                    to{" "}
                    <span>
                      {endTime.hour}:00 {endTime.period}
                    </span>
                  </>
                ) : (
                  <>
                    from{" "}
                    <span style={{ color: "var(--gray-light5)" }}>00:00 </span>
                    to{" "}
                    <span style={{ color: "var(--gray-light5)" }}>
                      00:00
                    </span>{" "}
                    AM
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.footer_container_content_divider}></div>
          <div className={styles.footer_container_locationContainer}>
            <img
              className={styles.footer_container_locationContainer_img}
              src={LocationBlack}
              alt=""
            />
            <div className={styles.footer_container_locationContainer_text}>
              <div
                className={
                  styles.footer_container_locationContainer_text_title1
                }
                style={{ color: !company ? "var(--gray-light5)" : "" }}
              >
                {company || "Company Name"}
              </div>
              <div
                className={
                  styles.footer_container_locationContainer_text_title2
                }
                style={{ color: !street ? "var(--gray-light5)" : "" }}
              >
                {street || "123 Any Rd."}
              </div>
              <div
                className={
                  styles.footer_container_locationContainer_text_title2
                }
              >
                <span style={{ color: !city ? "var(--gray-light5)" : "" }}>
                  {city || "City"},{" "}
                </span>
                <span style={{ color: !state ? "var(--gray-light5)" : "" }}>
                  {state || "State"},{" "}
                </span>
                <span style={{ color: !zip ? "var(--gray-light5)" : "" }}>
                  {zip || "Zip"}
                </span>{" "}
              </div>
            </div>
          </div>
          <div className={styles.footer_container_content_divider}></div>
          <div className={styles.footer_container_priceContainer}>
            <div style={{ position: "relative" }}>
              <img
                className={styles.footer_container_priceContainer_img}
                src={Basket}
                alt=""
              />
              {addOnsCount > 0 && <div className={styles.footer_container_priceContainer_count}>{addOnsCount > 9 ? "+9" : addOnsCount}</div>}
            </div>

            <div className={styles.footer_container_priceContainer_text}>
              <div
                className={styles.footer_container_priceContainer_text_title1}
              >
                Requested Add-ons
              </div>
              {price > 0 && (
                <div
                  className={styles.footer_container_priceContainer_text_title2}
                >
                  $ <span>{price}</span>
                  .00
                </div>
              )}
              <div
                className={styles.footer_container_priceContainer_text_title3}
              >
                Learn more
                <img src={LearnMore} alt="LearnMore" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {price > 0 && (
        <div className={styles.footer_mobContainer}>
          <div className={styles.footer_mobContainer_info}>
            <div className={styles.footer_mobContainer_info_text}>
              Requested Add-ons
            </div>
            <div className={styles.footer_mobContainer_info_text2}>
              $ <span>{price}</span>
              .00
            </div>
          </div>
          <div className={styles.footer_mobContainer_imgContainer}>
            <div style={{ position: "relative" }}>
              <img
                className={styles.footer_container_priceContainer_img}
                src={Basket}
                alt=""
              />
              <div className={styles.footer_container_priceContainer_count}>{addOnsCount > 9 ? "+9" : addOnsCount}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormFooter;
