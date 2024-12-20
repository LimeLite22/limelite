import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { BASIC_THUMBNAIL, CUSTOM_THUMBNAIL, DEFAULT, OWN_SCRIPT, PROFESSIONAL_SCRIPT } from "consts/consts";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import NoFormats from "./components/NoFormats";
import SelectedAdditionalFormats from "./components/SelectedAdditionalFormats";

const AdditionalFormatsBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    formats: false
  });
  const selection = selectedRequest?.videoSettings.additionalFormats;
  const [isAddFormatsExpanded, setIsAddFormatsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    const formats = selectedRequest?.videoSettings.selectedAdditionalFormats;
    if (selection === true) {
      formats?.forEach((item) => {
        if (item.format === DEFAULT || item.duration === DEFAULT) {
          setIsError({
            formats: true
          });
          setIsAddFormatsExpanded(true);
        }
      });
    }
  };

  useEffect(() => {
    if (selection === DEFAULT) return;
    if (selection === true) setIsAddFormatsExpanded(true);
  }, [selection]);
  useEffect(() => {
    setIsError({
      formats: false
    })
  }, [selection]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Do you need additional/social formats?*
      </div>
      <LearnMorePopUp />
      <NoFormats />
      <SelectedAdditionalFormats
        isError={{
          formats: isError.formats
        }}
        isExpanded={isAddFormatsExpanded}
        setIsExpanded={setIsAddFormatsExpanded}
      />
    </div>
  );
};

export default AdditionalFormatsBox;
