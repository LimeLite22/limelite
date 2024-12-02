import { CheckBoxSelectedType2, CheckBoxType2 } from "assets/images";
import { optionsList } from "pages/NewRequest/consts";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../NewRequestStep1.module.scss";


const RequestType: FC = () => {
  const dispatch = useDispatch();

  const selectedRequest = useSelector(selectRequestInfo);
  const requestType = selectedRequest?.option;
  return (
    <div
      className={`${styles.requestType}`}
      tabIndex={0}
      onBlur={() => {
      }}
    >
      <div className={styles.typeDropdown_header}>
        {" "}
        Type of your request*
      </div>
      <div className={styles.requestTypeContainer}>
        {optionsList.map((option) => {
          return (
            <div
              key={generateUniqueId()}
              className={styles.requestTypeContainer_item}
              onClick={() => {
                dispatch(
                  updateDraftField({
                      path: "option",
                      value: option,
                  })
              );
              }}
            >
              <img src={requestType?.value === option.value ? CheckBoxSelectedType2 : CheckBoxType2} />{option.value}
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

export default RequestType;
