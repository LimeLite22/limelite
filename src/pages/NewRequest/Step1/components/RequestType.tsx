import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CheckBoxSelectedType2, CheckBoxType2 } from "assets/images";

import { generateUniqueId } from "utils/generateId";

import { optionsList } from "consts/consts";

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
    <div className={`${styles.requestType}`} tabIndex={0} onBlur={() => {}}>
      <div className={styles.typeDropdown_header}> Type of your request*</div>
      <div className={styles.requestTypeContainer}>
        {optionsList.map((option) => {
          return (
            <div
              key={generateUniqueId()}
              className={styles.requestTypeContainer_item}
              style={
                requestType?.value === option.value
                  ? {
                      border: "1px solid var(--green-dark2)",
                      color: "var(--black)",
                    }
                  : {}
              }
              onClick={() => {
                dispatch(
                  updateDraftField({
                    path: "option",
                    value: option,
                  }),
                );
              }}
            >
              {option.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestType;
