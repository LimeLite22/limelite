

import { Audio, Delete, Download } from "assets/images";
import { DEFAULT, TRACK_AUTHOR_CLIENT } from "consts/consts";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateVoiceoverSettings } from "../../../../../redux/requests/reducer";
import { IRootState } from "../../../../../redux/rootReducer";
import styles from "../../../NewRequest.module.scss";
const OwnTrack = () => {
  const eVIS = useSelector((state: IRootState) => state.request.editDraft)?.voiceTrackSettings;
  // const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile) {
      const allowedExtensions = ["audio/mpeg", "audio/wav", "audio/aiff"];
      if (allowedExtensions.includes(uploadedFile.type)) {
        // setError(null);
        dispatch(updateVoiceoverSettings({
          voiceTrackSettings: {
            ...eVIS,
            trackAuthor: TRACK_AUTHOR_CLIENT,
            track: uploadedFile
          },
          isEdit: true
        }))
      } else {
        // setError("Файл повинен бути формату MP3, WAV або AIFF");
      }
    }
  };
  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`
      ${styles.box}
      ${styles.box_submit}
      ${styles.box_xl}
      ${styles.box_expanded}`}
    >
      <div className={`${styles.box_container} ${styles.box_containerSubmit} `}>
        <div className={styles.box_title}>
          Upload a high quality voice track:
        </div>
        <div className={styles.box_title2} style={{ whiteSpace: "wrap" }}>
          Please upload high quality, uncompressed audio files (e.g., WAV or
          AIFF). MP3 files are acceptable but are lower quality.
        </div>
        <div>
          <input
            type="file"
            accept=".mp3, .wav, .aiff"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {eVIS?.track !== DEFAULT && (
            <div className={styles.box_audioFile}>
              <img src={Audio} alt="" />
              <div style={{ flex: 1 }}>
                <div>{eVIS.track?.name}</div>
                <div>{Number(eVIS.track?.size / 1000000).toFixed(2)} mb</div>
              </div>
              <img
                onClick={() => {
                  dispatch(updateVoiceoverSettings({
                    voiceTrackSettings: {
                      ...eVIS,
                      trackAuthor: TRACK_AUTHOR_CLIENT,
                      track: DEFAULT
                    },
                    isEdit: true
                  }))

                }}
                src={Delete}
                alt=""
              />
            </div>
          )}
          {eVIS?.track === DEFAULT &&
            <div onClick={handleDivClick} className={styles.box_audioFileButton}>
              <img
                src={Download}
                alt="Download icon"
                style={{ width: "24px", height: "24px" }}
              />
              <span >
                Upload WAV or MP3 file
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default OwnTrack;
