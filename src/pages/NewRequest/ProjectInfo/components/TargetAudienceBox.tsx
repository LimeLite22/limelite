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

const TargetAudienceBox = ({ isError, setIsError }: IProps) => {
  const dispatch = useDispatch();

  const selectedRequest = useSelector(selectRequestInfo);
  const targetAudience = selectedRequest?.projectInfoSettings?.targetAudience;

  const handleSelectAudience = (audience: string) => {
    setIsError(false);
    dispatch(
      updateDraftField({
        path: "projectInfoSettings.targetAudience",
        value: audience,
      }),
    );
  }
  const handleBlur = () => {
    if (!targetAudience) {
      setIsError(true);
    }
  }
  return (
    <div
      className={styles.nR_inputContainer}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className={styles.nR_inputContainer_header}>
        {" "}
        Who is the target audience?*
      </div>
      <input
        style={{ borderColor: isError ? "var(--red-dark)" : "" }}
        value={targetAudience}
        onChange={(e) => {
          handleSelectAudience(e.target.value);
        }}
        className={styles.nR_inputContainer_input}
        type="text"
        placeholder="Please provide the target audience..."
      />
      {isError && (
        <div className={styles.nR_inputContainer_error}>
          Please fill out all required fields to submit the form
        </div>
      )}
    </div>
  );
};

export default TargetAudienceBox;
