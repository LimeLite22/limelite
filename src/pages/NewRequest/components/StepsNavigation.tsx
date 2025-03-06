import { ArrowLightGray, Success } from "assets/images";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { selectSteps } from "../../../redux/requests/reducer";
import styles from "../NewRequest.module.scss";

const StepsNavigation = () => {
  const steps = useSelector(selectSteps);
  const location = useLocation();
  const stepItem = location.pathname.slice(1);
  const stepIndex = steps.findIndex(step => step === stepItem) + 1;
  const getStepName = (step: string) => {
    if (step === 'new-request/add-ons') return 'Other Add-ons'
    if (step === 'new-request/video-edit') return 'Video Edit'
    return step.replace(/^new-request\//, "").replace(/^./, match => match.toUpperCase())
  }

  return (
    <div className={styles.navigation} >
      {steps.map((stepItem, index) => {
        if (getStepName(stepItem) === 'Final' || getStepName(stepItem) === 'Submit' || getStepName(stepItem) === 'Other Add-ons') return null
        return <>
          <div
            className={`${styles.navigation_item} ${index + 1 === Number(stepIndex) && styles.navigation_item_selected}`}
          >
            {Number(stepIndex) > index + 1 ? (
              <img src={Success} alt="" />
            ) : (
              <span
                className={
                  index + 1 === Number(stepIndex)
                    ? styles.navigation_item_blackNumber
                    : styles.navigation_item_number
                }
              >
                {index + 1}
              </span>
            )}
            <p>{getStepName(stepItem)}</p>
          </div>
          {index !== steps.length - 4 && <img src={ArrowLightGray} alt="" />}
        </>

      })
      }

    </div>
  );
};

export default StepsNavigation;
