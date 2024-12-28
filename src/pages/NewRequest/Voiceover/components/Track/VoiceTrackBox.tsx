import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
  DEFAULT,
  TRACK_AUTHOR_CLIENT,
  TRACK_AUTHOR_PROFESSIONAL,
} from "consts/consts";

import { selectRequestInfo } from "../../../../../redux/requests/reducer";
import styles from "../../../NewRequest.module.scss";
import LearnMorePopUp from "../LearnMorePopUp";
import OwnTrack from "./components/OwnTrack";
import ProffessionalTrack from "./components/ProfessionalTrack";

const VoiceTrackBox = () => {
  const selectedRequest = useSelector(selectRequestInfo);
  const [isError, setIsError] = useState({
    track: false,
  });
  const selection = selectedRequest?.voiceTrackSettings.trackAuthor;
  const track = selectedRequest?.voiceTrackSettings.track;
  const [isOwnExpanded, setIsOwnExpanded] = useState(false);
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
    if (selection === TRACK_AUTHOR_CLIENT) {
      if (track === DEFAULT) {
        setIsOwnExpanded(true);
        const errors = {
          track: true,
        };
        setIsError(errors);
      } else {
        setIsProffessionalExpanded(false);
        setIsOwnExpanded(false);
      }
    }
    if (selection === TRACK_AUTHOR_PROFESSIONAL) {
      setIsError({ track: false });
      setIsProffessionalExpanded(false);
      setIsOwnExpanded(false);
    }
  };

  useEffect(() => {
    if (selection === DEFAULT) return;
    if (selection === TRACK_AUTHOR_CLIENT) setIsOwnExpanded(true);
    if (selection === TRACK_AUTHOR_PROFESSIONAL)
      setIsProffessionalExpanded(true);
    setIsError({
      track: false,
    });
  }, [selection]);
  useEffect(() => {
    if (selection === TRACK_AUTHOR_CLIENT) {
      const errors = {
        track: !track,
      };
      setIsError(errors);
    }
    if (selection === TRACK_AUTHOR_PROFESSIONAL) {
      const errors = {
        track: false,
      };
      setIsError(errors);
    }
  }, [selection, track]);

  return (
    <div ref={containerRef} tabIndex={-1} onBlur={handleBlur}>
      <div className={styles.box_question_header_text}>
        Who will provide the voice track?*
      </div>
      <LearnMorePopUp />
      <OwnTrack
        isError={{ track: isError.track }}
        isExpanded={isOwnExpanded}
        setIsExpanded={setIsOwnExpanded}
      />
      <ProffessionalTrack
        isExpanded={isProffessionalExpanded}
        setIsExpanded={setIsProffessionalExpanded}
      />
    </div>
  );
};

export default VoiceTrackBox;
