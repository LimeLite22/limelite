import { Link } from "react-router-dom";

import { ArrowGray3, ArrowGray4 } from "assets/images";


import FormFooter from "../components/FormFooter";
import styles from "../NewRequest.module.scss";

import VoiceTrackBox from "./components/Track/VoiceTrackBox";
import IsScriptRequired from "../Script/IsScriptRequiredBox";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../../../redux/requests/reducer";
import { SCRIPTED_APPROACH } from "consts/consts";


const Voiceover = () => {
  const narrationList = useSelector(selectRequestInfo)?.projectInfoSettings.approachList;
  return (
    <div
      className={styles.nR_container}
      style={{
        paddingBottom: 0,
      }}
    >
      {!narrationList?.includes(SCRIPTED_APPROACH) &&
        <Link to="/new-request/start">
          <div className={styles.nR_backButton}>
            <img src={ArrowGray3} alt="" /> Back to New Request{" "}
          </div>
        </Link>}
      <div className={styles.nR_subContainer}>
        <div className={styles.nR_header}>
          <div className={styles.nR_header_text}>
            {!narrationList?.includes(SCRIPTED_APPROACH) &&
              <Link to="/new-request/start">
                <div className={styles.nR_header_text_button}>
                  <img src={ArrowGray4} alt="" />
                </div>
              </Link>
            }
            About Your Voiceover
          </div>
          <div className={styles.nR_header_subText}>
            Please provide important information below regarding your video
            shoot
          </div>
        </div>
        <div className={styles.nR_formContainer}>
          <VoiceTrackBox />
          {!narrationList?.includes(SCRIPTED_APPROACH) && <IsScriptRequired />}
        </div>
      </div>
      <FormFooter />
    </div>
  );
};

export default Voiceover;
