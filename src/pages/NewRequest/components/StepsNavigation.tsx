import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { ArrowLightGray, Success } from "assets/images";

import styles from "../NewRequest.module.scss";
import { useSelector } from "react-redux";
import { selectSteps } from "../../../redux/requests/reducer";

const StepsNavigation = () => {
  const [step, setStep] = useState(1);
  const steps = useSelector(selectSteps)

  const location = useLocation();

  return (
    <>
      <div className={styles.navigation} >
        {steps.map((stepItem, index) => (
          <>
            <div
              className={`${styles.navigation_item} ${index + 1 === Number(step) && styles.navigation_item_selected}`}
            >
              {Number(step) > index + 1 ? (
                <img src={Success} alt="" />
              ) : (
                <span
                  className={
                    index + 1 === Number(step)
                      ? styles.navigation_item_blackNumber
                      : styles.navigation_item_number
                  }
                >
                  {index + 1}
                </span>
              )}
              <p>{stepItem}</p>
            </div>
            {index !== steps.length - 1 && <img src={ArrowLightGray} alt="" />}
          </>
        ))}

      </div>
      {/* <div className={styles.navigation}>
        <div
          className={`${styles.navigation_item} ${step === 1 && styles.navigation_item_selected}`}
        >
          {step > 1 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 1
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              1
            </span>
          )}
          <p>Project</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 2 && styles.navigation_item_selected}`}
        >
          {step > 2 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 2
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              2
            </span>
          )}
          <p> Logistics</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 3 && styles.navigation_item_selected}`}
        >
          {step > 3 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 3
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              3
            </span>
          )}
          <p>Script</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 4 && styles.navigation_item_selected}`}
        >
          {step > 4 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 4
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              4
            </span>
          )}
          <p>Interview</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 5 && styles.navigation_item_selected}`}
        >
          {step > 5 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 5
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              5
            </span>
          )}
          <p>Voiceover</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 6 && styles.navigation_item_selected}`}
        >
          {step > 6 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 6
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              6
            </span>
          )}
          <p>Video edit</p>
        </div>
        <img src={ArrowLightGray} alt="" />
        <div
          className={`${styles.navigation_item} ${step === 6 && styles.navigation_item_selected}`}
        >
          {step > 7 ? (
            <img src={Success} alt="" />
          ) : (
            <span
              className={
                step === 7
                  ? styles.navigation_item_blackNumber
                  : styles.navigation_item_number
              }
            >
              7
            </span>
          )}
          <p>Add-ons</p>
        </div>
      </div> */}
    </>
  );
};

export default StepsNavigation;
