import { Add2, CheckBox, CheckBoxSelected, Expand, Note } from "assets/images";
import { DEFAULT } from "consts/consts";
import DefaultSlider from "pages/NewRequest/components/DefaultSlider";
import { useDispatch, useSelector } from "react-redux";
import { generateUniqueId } from "utils/generateId";

import AdditionalFormatItem from "./AdditionalFormatItem";
import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";

interface IProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isError: {
    formats: boolean;
  };
}
const SelectedAdditionalFormats = ({ isExpanded, setIsExpanded, isError }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);

  const selection = selectedRequest?.videoSettings.additionalFormats;

  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: boolean) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    handleUpdateField("videoSettings.additionalFormats", true);
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    handleUpdateField("videoSettings.additionalFormats", true);
    setIsExpanded(!isExpanded);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleAddNewFormat = () => {
    const selectedFormats = [
      ...(selectedRequest?.videoSettings?.selectedAdditionalFormats ?? []),
    ];
    selectedFormats?.push({
      id: generateUniqueId(),
      format: DEFAULT,
      duration: DEFAULT,
    });
    dispatch(
      updateDraftField({
        path: "videoSettings.selectedAdditionalFormats",
        value: selectedFormats,
      }),
    );
  };



  return (
    <div
      className={`
        ${styles.box}
        ${selection === true ? styles.box_selected : ""} 
        ${isExpanded ? styles.box_expanded : ""}`}
      onClick={handleSelect}
    >
      <div className={styles.box_header}>
        <img
          className={styles.box_circle}
          src={selection === true ? CheckBoxSelected : CheckBox}
          alt="CheckBox"
        />
        <span className={styles.box_title}>
          Yes
          <div className={styles.box_title_addOn}>Add-on</div>
        </span>
        <div className={styles.box_title2}>
          We'd like LimeLite to create additional/social formats of this video.
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_content}>
          <DefaultSlider />
          <div className={styles.box_content_info}>
            <div className={styles.box_content_info_header}>
              Standard Add-on:
              <span className={styles.box_content_info_header_addOn}>+$75</span>
            </div>
            <div className={styles.box_content_info_text}>
              Diam fringilla et nisi enim sed enim cum. Est lacus commodo
              egestas tortor sit tempus aenean sollicitudin. Ornare rhoncus
              tortor tincidunt pharetra ut dapibus id aliquam in.
            </div>
            <div className={styles.box_zone}></div>
          </div>
        </div>
        <div className={styles.box_subText}>
          <img src={Note} alt="locationIcon" /> Note: You will have an
          opportunity to enter a discount code for any for a Standard Add-ons
          during check-out
        </div>
        <div className={styles.videoFormat}>
          {selectedRequest?.videoSettings.selectedAdditionalFormats.map(
            (item, index) => {
              return (
                <AdditionalFormatItem key={item.id} item={item} index={index} isError={isError.formats} />
              );
            },
          )}
        </div>
        <div
          className={styles.videoFormat_addFormat}
          onClick={handleAddNewFormat}
        >
          <img src={Add2} alt="locationIcon" /> Add an additional format
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

export default SelectedAdditionalFormats;
