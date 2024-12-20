import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { DEFAULT } from "consts/consts";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import SelectedAdditionalFormats from "./components/AdditionnalAssets";
import NoAdditionalAssets from "./components/NoAdditionalAssets";

const AdditionalVisualAssetsBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    url: false,
    file: false
  });
  const selection = selectedRequest?.videoSettings.additionalVisualAssets;
  const file =
    selectedRequest?.videoSettings.additionalVisualAssetFile;
  const url =
    selectedRequest?.videoSettings.additionalVisualAssetUrl;
  const [isAdditionalExpanded, setIsAdditionalExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      event.relatedTarget &&
      containerRef.current.contains(event.relatedTarget as Node)
    ) {
      return;
    }
    if (selection === true) {
      console.log('556565');
      if(file === DEFAULT  && url?.length === 0){
        setIsAdditionalExpanded(true);
        const errors = {
          url: url?.length === 0,
          file: file === DEFAULT
        };
        setIsError(errors);
        return
      }else{
        setIsAdditionalExpanded(false);
      }
      // if(file === DEFAULT || url?.length === 0){
      //   console.log('099900');
      //   setIsAdditionalExpanded(true);
      //   const errors = {
      //     url: url?.length === 0,
      //     file: file === DEFAULT
      //   };
      //   setIsError(errors);

      // }
      // if (file !== DEFAULT || url?.length !== 0) {
      //   console.log('1');
      //   setIsAdditionalExpanded(true);
      //   const errors = {
      //     url: false,
      //     file: false
      //   };
      //   setIsError(errors);
      //   setIsAdditionalExpanded(true);
      // } else {
      //   console.log('2');
      //   setIsAdditionalExpanded(false);
      // }
    }
    if (selection === false) {
      const errors = {
        url: false,
        file: false
      };
      setIsError(errors);
    } 
  };

  useEffect(() => {
    if (selection === DEFAULT) return;
    if (selection === true) setIsAdditionalExpanded(true);
  }, [selection]);

  useEffect(() => {
    if (selection === false) {
      const errors = {
        url: false,
        file: false
      };
      setIsError(errors);
    }

    if (selection === true) {
      if (file !== DEFAULT || url?.length !== 0) {
        const errors = {
          url: false,
          file: false
        };
        setIsError(errors);
      } else {
        const errors = {
          url: url?.length === 0,
          file: file === DEFAULT
        };
        setIsError(errors);
      }

    }
  }, [url, file]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Do you have additional visual assets?*
      </div>
      <LearnMorePopUp />
      <NoAdditionalAssets />
      <SelectedAdditionalFormats
        isError={{
          url: isError.url,
          file: isError.file
        }}
        isExpanded={isAdditionalExpanded}
        setIsExpanded={setIsAdditionalExpanded}
      />
    </div>
  );
};

export default AdditionalVisualAssetsBox;
