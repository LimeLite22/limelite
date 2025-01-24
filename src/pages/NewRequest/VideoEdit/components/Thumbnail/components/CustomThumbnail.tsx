

import { CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";
import { CUSTOM_THUMBNAIL } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";

import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

interface IProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}
const CustomThumbnail = ({ isExpanded, setIsExpanded }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);

  const selection = selectedRequest?.videoSettings.thumbnail;

  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: string) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    handleUpdateField("videoSettings.thumbnail", CUSTOM_THUMBNAIL);
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    handleUpdateField("videoSettings.thumbnail", CUSTOM_THUMBNAIL);
    setIsExpanded(!isExpanded);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div
      className={`
        ${styles.box}
        ${selection === CUSTOM_THUMBNAIL ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
      onClick={handleSelect}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === CUSTOM_THUMBNAIL ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          Yes, a custom thumbnail
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          We'd like LimeLite to create a custom designed thumbnail.
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Standart Add-on:
              <span className={styles.box_content_info_header_addOn}>+$95</span>
            </div>
            <div className={styles.box_content_info_text}>
              Your thumbnail is your video's first impression, and you want to
              make a good one. A custom thumbnail can include graphic elements,
              text, and/or branding that entices viewers to click. Price
              includes design and delivery of custom thumbnail.
            </div>
          </div>
        </div>
        <div className={styles.box_subText}>
          <img src={Note} alt="locationIcon" /> Note: You will have an
          opportunity to enter a discount code for any for a Standard Add-ons
          during check-out
        </div>
      </div>
      <img
        onClick={(e) => handleExpand(e)}
        src={Expand}
        alt="Expand"
        className={styles.box_expand}
      />
    </div>
  );
};

export default CustomThumbnail;
