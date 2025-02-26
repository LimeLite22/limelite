import { Remove } from "assets/images";
import {
  DEFAULT,
  VIDEO_SQUARE,
  VIDEO_STANDARD,
  VIDEO_STORY,
  VIDEO_VERTICAL,
} from "consts/consts";
import { IAdditionalVideoFormat } from "interfaces/interfaces";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TVideo, TVideoDuration } from "types/types";

import {
  deleteAdditionalVideoFormat,
  selectRequestInfo,
  updateAdditionalVideoFormat,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
import DurationSelector from "../../DurationSelector/DurationSelector";

interface IProps {
  index: number;
  item: IAdditionalVideoFormat;
  isError: boolean,
  isSubmit?: boolean,
  onChange?: (duration: TVideoDuration, format: TVideo) => void,
  onDelete?: (index: number) => void
}
const AdditionalFormatItem = ({ item, index, isError, isSubmit, onChange, onDelete }: IProps) => {
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
  const handleSelect = (value: TVideo) => {
    dispatch(
      updateAdditionalVideoFormat({
        ...item,
        format: value,
      }),
    );
    setFormatError(false);
  }

  return (
    <div className={styles.videoFormat_item} key={item.id} ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.videoFormat_header} style={{ color: formatError || (item.format === DEFAULT && isError) ? "var(--red-dark)" : "" }}>
        Video format{" "}
        <>
          {index > 0 ? (
            <img
              src={Remove}
              alt="Remove"
              onClick={() => {
                if (onDelete) {
                  onDelete(index);
                } else {
                  dispatch(deleteAdditionalVideoFormat(item.id));
                }
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
            if (onChange) {
              onChange(item.duration, VIDEO_STANDARD);
              setFormatError(false);
            } else {
              handleSelect(VIDEO_STANDARD);
            }
          }}
        >
          {VIDEO_STANDARD}<div className={styles.box_videoType_dot}></div> 16:9
        </div>
        <div
          className={`
               ${item.format === VIDEO_STORY ? styles.videoFormat_formatItemSelected : ""}  
               ${styles.videoFormat_formatItem}`}
          style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
          onClick={() => {
            if (onChange) {
              onChange(item.duration, VIDEO_STORY);
              setFormatError(false);
            } else {
              handleSelect(VIDEO_STORY);
            }
          }}
        >
          {VIDEO_STORY} <div className={styles.box_videoType_dot}></div> 9:16
        </div>
        <div
          className={`
                ${item.format === VIDEO_SQUARE ? styles.videoFormat_formatItemSelected : ""}  
                ${styles.videoFormat_formatItem}`}
          style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
          onClick={() => {
            if (onChange) {
              onChange(item.duration, VIDEO_SQUARE);
              setFormatError(false);
            } else {
              handleSelect(VIDEO_SQUARE);
            }
          }}
        >
          {VIDEO_SQUARE} <div className={styles.box_videoType_dot}></div> 1:1
        </div>
        <div
          className={`    
                ${item.format === VIDEO_VERTICAL ? styles.videoFormat_formatItemSelected : ""}  
                ${styles.videoFormat_formatItem}`}
          style={{ border: markFormatError ? "1px solid var(--red-dark)" : "" }}
          onClick={() => {
            if (onChange) {
              onChange(item.duration, VIDEO_VERTICAL);
              setFormatError(false);
            } else {
              handleSelect(VIDEO_VERTICAL);
            }
          }}
        >
          {VIDEO_VERTICAL} <div className={styles.box_videoType_dot}></div> 4:5
        </div>
      </div>

      <div className={styles.videoFormat_header} style={{ color: durationError || (item.duration === DEFAULT && isError) ? "var(--red-dark)" : "" }}>Target duration </div>
      <DurationSelector
        value={item.duration}
        onChange={(duration: TVideoDuration) => {
          if (onChange) {
            onChange(duration, item.format);
            setDurationError(false);
          } else {
            dispatch(
              updateAdditionalVideoFormat({
                ...item,
                duration: duration,
              }),
            );
            setDurationError(false);
          }

        }}
      />
    </div>
  );
};

export default AdditionalFormatItem;
