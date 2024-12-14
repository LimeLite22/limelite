
import { CUSTOM_THUMBNAIL, DEFAULT } from "consts/consts";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectRequestInfo,
} from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import BasicThumbnail from "./components/BasicThumbnail";
import NoThumbnail from "./components/NoThumbnail";
import ProffessionalTrack from "./components/CustomThumbnail";

const ThumbnailBox = () => {

  const selectedRequest = useSelector(selectRequestInfo);
  const selection = selectedRequest?.videoSettings.thumbnail;
  const [isProffessionalExpanded, setIsProffessionalExpanded] = useState(false);


  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (selection === CUSTOM_THUMBNAIL) {
      setIsProffessionalExpanded(false);
    }
  };

  useEffect(() => {
    if (selection === DEFAULT) return
    if (selection === CUSTOM_THUMBNAIL) setIsProffessionalExpanded(true);
  }, [selection])


  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onBlur={handleBlur}
    >
      <div className={styles.box_question_header_text}>
        Do you need a thumbnail?*
      </div>
      <LearnMorePopUp />
      <NoThumbnail />
      <BasicThumbnail />
      <ProffessionalTrack
        isExpanded={isProffessionalExpanded}
        setIsExpanded={setIsProffessionalExpanded}
      />
    </div >
  );
};

export default ThumbnailBox;
