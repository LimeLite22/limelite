import { useDispatch, useSelector } from "react-redux";

import { IAdditionalVideoFormat, IVideoDuration } from "interfaces/interfaces";

import { Remove } from "assets/images";

import {
  DEFAULT,
  VIDEO_SQUARE,
  VIDEO_STANDARD,
  VIDEO_STORY,
  VIDEO_VERTICAL,
} from "consts/consts";

import {
  deleteAdditionalVideoFormat,
  selectRequestInfo,
  updateAdditionalVideoFormat,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
import DurationSelector from "../../DurationSelector/DurationSelector";
import { useEffect, useRef, useState } from "react";
import { RootStateSelectors } from "reselect";

interface IProps {
  index: number;
  item: IAdditionalVideoFormat;
  isError: boolean
}
const AdditionalFormatItem = ({ item, index, isError }: IProps) => {
  const dispatch = useDispatch();
  const selection = useSelector(selectRequestInfo)?.videoSettings.additionalFormats;
  const [formatError, setFormatError] = useState(false);
  const [markFormatError, setMarkFormatError] = useState(false);
  const [durationError, setDurationError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    setFormatError(item.format === DEFAULT);
    setDurationError(item.duration === DEFAULT);
    setMarkFormatError(item.format === DEFAULT);
    setTimeout(() => {
      setMarkFormatError(false);
    }, 1500)
  };
  useEffect(() => {
    if (selection === false) {
      setFormatError(false);
      setDurationError(false);
      setMarkFormatError(false);
    }
  }, [selection])

  return (
    <div key={item.id} ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.videoFormat_header} style={{ color: formatError || (item.format === DEFAULT && isError) ? "var(--red-dark)" : "" }}>
        Video format{" "}
        <>
          {index > 0 ? (
            <img
              src={Remove}
              alt="Remove"
              onClick={() => {
                dispatch(deleteAdditionalVideoFormat(item.id));
              }}
            />
          ) : (
            ""
          )}
        </>
      </div>
      <div className={styles.videoFormat_formats}>
        <div
          className={`
               ${item.format === VIDEO_STANDARD ? styles.videoFormat_formatItemSelected : ""} 
               ${styles.videoFormat_formatItem}`}
          style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
          onClick={() => {
            dispatch(
              updateAdditionalVideoFormat({
                ...item,
                format: VIDEO_STANDARD,
              }),
            );
            setFormatError(false);
          }}
        >
          Standard <div className={styles.box_videoType_dot}></div> 16:9
        </div>
        <div className={styles.box_videoTypeContainer}>
          <div
            className={`
               ${item.format === VIDEO_STORY ? styles.videoFormat_formatItemSelected : ""}  
               ${styles.videoFormat_formatItem}`}
            style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_STORY,
                }),
              );
              setFormatError(false);
            }}
          >
            Story <div className={styles.box_videoType_dot}></div> 9:16
          </div>
        </div>
        <div className={styles.box_videoTypeContainer}>
          <div
            className={`
                ${item.format === VIDEO_SQUARE ? styles.videoFormat_formatItemSelected : ""}  
                ${styles.videoFormat_formatItem}`}
            style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_SQUARE,
                }),
              );
              setFormatError(false);
            }}
          >
            Square <div className={styles.box_videoType_dot}></div> 1:1
          </div>
        </div>
        <div className={styles.box_videoTypeContainer}>
          <div
            className={`    
                ${item.format === VIDEO_VERTICAL ? styles.videoFormat_formatItemSelected : ""}  
                ${styles.videoFormat_formatItem}`}
            style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_VERTICAL,
                }),
              );
              setFormatError(false);
            }}
          >
            Vertical <div className={styles.box_videoType_dot}></div> 4:5
          </div>
        </div>
      </div>

      <div className={styles.videoFormat_header} style={{ color: durationError || (item.duration === DEFAULT && isError) ? "var(--red-dark)" : "" }}>Target duration </div>
      <DurationSelector
        value={item.duration}
        onChange={(duration: IVideoDuration) => {
          dispatch(
            updateAdditionalVideoFormat({
              ...item,
              duration: duration,
            }),
          );
          setDurationError(false);
        }}
      />
    </div>
  );
};

export default AdditionalFormatItem;
