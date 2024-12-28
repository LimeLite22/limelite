import { useRef } from "react";
import { FileDrop } from "react-file-drop";
import { useDispatch, useSelector } from "react-redux";

import {
  CheckBox,
  CheckBoxSelected,
  DeleteAudio,
  Drop,
  Expand,
  PNG,
} from "assets/images";


import {
  selectRequestInfo,
  updateDraftField,
} from "../../../../../../redux/requests/reducer";
import styles from "../../../../NewRequest.module.scss";
import { DEFAULT } from "consts/consts";

interface IProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isError: {
    url: boolean;
    file: boolean;
  };
}
const AdditionalAsset = ({ isExpanded, setIsExpanded, isError }: IProps) => {
  const selectedRequest = useSelector(selectRequestInfo);
  const file = selectedRequest?.videoSettings.additionalVisualAssetFile;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selection = selectedRequest?.videoSettings.additionalVisualAssets;

  const dispatch = useDispatch();
  const handleUpdateField = (path: string, value: boolean | string | File) => {
    dispatch(
      updateDraftField({
        path,
        value,
      }),
    );
  };

  const handleSelect = () => {
    handleUpdateField("videoSettings.additionalVisualAssets", true);
    setIsExpanded(true);
  };
  const handleExpand = (e: React.MouseEvent) => {
    handleUpdateField("videoSettings.additionalVisualAssets", true);
    setIsExpanded(!isExpanded);
    e.stopPropagation();
    e.preventDefault();
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];

    if (uploadedFile) {
      handleUpdateField("videoSettings.additionalVisualAssetFile", uploadedFile);
    }
  };
  const handleDivClick = () => {
    fileInputRef.current?.click();
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
          We would like to upload additional visual assets
        </div>
      </div>
      <div className={styles.box_container}>
        <div className={styles.box_title} style={{ marginTop: '6px' }}>Visual asset upload</div>
        <div className={styles.box_drop_header}>
          Use the upload tool below to share high quality vector formatted
          logos, brand standards, typefaces, or images.
        </div>
        <div>
          <FileDrop
            className={`${styles.box_drop} ${isError.file ? styles.box_drop_error : ""}`}
            onDrop={(files, event) => {
              if (files && files[0]) {
                handleUpdateField("videoSettings.additionalVisualAssetFile", files[0]);
              }
            }}
          >
            <img src={Drop} alt="Drop" />
            <div className={styles.box_drop_text}>
              Drag & Drop or <span onClick={handleDivClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                Choose file </span>to upload
            </div>
            <div className={styles.box_drop_text2}>AI, SVG or PNG </div>
          </FileDrop>
        </div>
        <div className={styles.box_drop_divider}>
          <div className={styles.box_drop_dividerLine}></div>
          or
          <div className={styles.box_drop_dividerLine}></div>
        </div>
        <div className={styles.box_drop_title}>Import from URL</div>
        <input type="text" className={styles.box_drop_input} onChange={(e) => handleUpdateField("videoSettings.additionalVisualAssetUrl", e.target.value)} style={{ border: isError.url ? "1px solid var(--red-dark)" : "" }} placeholder="Add file URL" />
        {file && file !== DEFAULT && <div className={styles.box_file}>
          <div className={styles.box_file_content}>
            <img src={PNG} alt="PNG" />
            <div >
              <div className={styles.box_file_header}>{file?.name}</div>
              <div className={styles.box_file_text}>{Number(file.size / 1000000).toFixed(2)} mb</div>
            </div>
          </div>
          <img onClick={() => handleUpdateField("videoSettings.additionalVisualAssetFile", DEFAULT)} src={DeleteAudio} alt="Delete" />
        </div>}
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

export default AdditionalAsset;
