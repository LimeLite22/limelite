import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../redux/requests/reducer";
import styles from "../ProjectInfo.module.scss";

interface IProps {
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectNameBox = ({ isError, setIsError }: IProps) => {
  const dispatch = useDispatch();
  const selectedRequest = useSelector(selectRequestInfo);
  const name = selectedRequest?.projectInfoSettings?.name;
  return (
    <div
      className={styles.nR_inputContainer}
      id="nameInput"
      tabIndex={0}
      onBlur={() => {
        if (!name) {
          setIsError(true);
        }
      }}
    >
      <div className={styles.nR_inputContainer_header}>
        {" "}
        What is the name of this project?*
      </div>
      <input
        style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        value={name}
        onChange={(e) => {
          setIsError(false);
          dispatch(
            updateDraftField({
              path: "projectInfoSettings.name",
              value: e.target.value,
            }),
          );
        }}
        className={styles.nR_inputContainer_input}
        placeholder="Please provide the project name..."
        type="text"
      />
      {isError && (
        <div className={styles.nR_inputContainer_error}>
          Please fill out all required fields to submit the form
        </div>
      )}
    </div>
  );
};

export default ProjectNameBox;
