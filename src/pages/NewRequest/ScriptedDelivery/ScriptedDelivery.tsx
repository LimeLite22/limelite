import { ArrowGray3, ArrowGray4 } from "assets/images";
import { Link } from "react-router-dom";
import FormFooter from "../components/FormFooter";
import styles from "../NewRequest.module.scss";
import IsScriptRequired from "../Script/IsScriptRequiredBox";
import ScriptPersons from "./components/ScriptPersons";
import Teleprompter from "./components/Teleprompter";

const ScriptedDelivery = () => {

  return (
    <div
      style={{
        paddingBottom: 0,
      }}
    >
      <Link to="/new-request/start">
        <div className={styles.nR_backButton}>
          <img src={ArrowGray3} alt="" /> Back to New Request{" "}
        </div>
      </Link>
      <div className={styles.nR_subContainer}>
        <div className={styles.nR_header}>
          <div className={styles.nR_header_text}>
            <Link to="/new-request/start">
              <div className={styles.nR_header_text_button}>
                <img src={ArrowGray4} alt="" />
              </div>
            </Link>
            Scripted Delivery
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your video
            script
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <IsScriptRequired />
          <Teleprompter />
          <ScriptPersons />
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default ScriptedDelivery;
