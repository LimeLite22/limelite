import { optionsList } from "consts/consts";
import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOption } from "types/types";
import { generateUniqueId } from "utils/generateId";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../../NewRequest.module.scss";

const RequestType: FC = () => {
  const dispatch = useDispatch();

  const selectedRequest = useSelector(selectRequestInfo);
  const requestType = selectedRequest?.projectInfoSettings?.option;
  const handleSelectOption = (option: TOption) => {
    dispatch(
      updateDraftField({
        path: "projectInfoSettings.option",
        value: option,
      }),
    );
  }
  return (
    <div className={styles.requestType}>
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
                    boxShadow: "0 0 0 1px var(--green-dark2)",
                    color: "var(--black)",
                  }
                  : {}
              }
              onClick={() => handleSelectOption(option)}
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
