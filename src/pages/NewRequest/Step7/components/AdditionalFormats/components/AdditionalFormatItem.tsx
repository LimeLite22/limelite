import { useDispatch } from "react-redux";

import { IAdditionalVideoFormat, IVideoDuration } from "interfaces/interfaces";

import { Remove } from "assets/images";

import {
  VIDEO_SQUARE,
  VIDEO_STANDARD,
  VIDEO_STORY,
  VIDEO_VERTICAL,
} from "consts/consts";

import {
  deleteAdditionalVideoFormat,
  updateAdditionalVideoFormat,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

interface IProps {
  index: number;
  item: IAdditionalVideoFormat;
}
const AdditionalFormatItem = ({ item, index }: IProps) => {
  const dispatch = useDispatch();

  return (
    <div key={item.id}>
      <div className={styles.videoFormat_header}>
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
          onClick={() => {
            dispatch(
              updateAdditionalVideoFormat({
                ...item,
                format: VIDEO_STANDARD,
              }),
            );
          }}
        >
          Standard <div className={styles.box_videoType_dot}></div> 16:9
        </div>
        <div className={styles.box_videoTypeContainer}>
          <div
            className={`
               ${item.format === VIDEO_STORY ? styles.videoFormat_formatItemSelected : ""}  
               ${styles.videoFormat_formatItem}`}
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_STORY,
                }),
              );
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
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_SQUARE,
                }),
              );
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
            onClick={() => {
              dispatch(
                updateAdditionalVideoFormat({
                  ...item,
                  format: VIDEO_VERTICAL,
                }),
              );
            }}
          >
            Vertical <div className={styles.box_videoType_dot}></div> 4:5
          </div>
        </div>
      </div>

      <div className={styles.videoFormat_header}>Target duration </div>
    </div>
  );
};

export default AdditionalFormatItem;
