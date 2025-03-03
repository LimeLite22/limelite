import { APPROVED_TEXT_STATUS, DEFAULT, OTHER, OWN_ADDRESS, OWN_SCRIPT, PROFESSIONAL_SCRIPT, QUESTIONS_AUTHOR_CLIENT, QUESTIONS_AUTHOR_PROFESSIONAL, QUESTIONS_ON_LOCATION, QUESTIONS_VIRTUALLY, RUSH_TIME, SHOOT_EDIT, SHOOT_ONLY, TRACK_AUTHOR_CLIENT, YES } from "consts/consts";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../redux/requests/reducer";

const useIsStepReady = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const projectSettings = selectedRequest?.projectInfoSettings;
    const logisticSettings = selectedRequest?.logisticSettings;
    const scriptSettings = selectedRequest?.scriptSettings;
    const interviewSettings = selectedRequest?.interviewSettings;
    const voiceoverSettings = selectedRequest?.voiceTrackSettings;
    const videoEditSettings = selectedRequest?.videoSettings;

    const isProjectInfoReady = useMemo(() => {
        if (!projectSettings) return false;

        if (projectSettings?.name?.length === 0 ||
            !projectSettings?.projectTone ||
            !projectSettings?.type ||
            !projectSettings?.targetAudience) {
            return false;
        }

        if (!projectSettings?.approachList?.length &&
            projectSettings?.option?.value && [SHOOT_EDIT, SHOOT_ONLY, OTHER].includes(projectSettings?.option?.value)) {
            return false;
        }

        return true;
    }, [projectSettings]);
    const isLogisticReady = useMemo(() => {
        if (
            !logisticSettings?.travel?.selection ||
            (logisticSettings?.travel?.selection === YES &&
                !logisticSettings?.travel?.zoneCode.name)
        ) {
            return false;
        } else if (logisticSettings?.location?.type === DEFAULT) {
            return false;
        } else if (
            logisticSettings?.location?.type === OWN_ADDRESS &&
            (logisticSettings?.location?.street.length === 0 ||
                logisticSettings?.location?.city.length === 0 ||
                logisticSettings?.location?.state.length === 0 ||
                logisticSettings?.location?.zip.length === 0)
        ) {
            return false;
        }
        if (!logisticSettings?.isAlternate) {
            if (
                logisticSettings?.preferredDate?.date === DEFAULT ||
                logisticSettings?.preferredDate?.time === DEFAULT
            ) {
                return false;
            }
        } else {
            if (
                logisticSettings?.preferredDate?.date === DEFAULT ||
                logisticSettings?.preferredDate?.time === DEFAULT ||
                logisticSettings?.alternateDate?.date === DEFAULT ||
                logisticSettings?.alternateDate?.time === DEFAULT
            ) {
                return false;
            }
        }
        return true;

    }, [logisticSettings]);
    const isScriptReady = useMemo(() => {
        if (scriptSettings?.scriptWriter === DEFAULT) {
            return false
        }
        if (
            scriptSettings?.scriptWriter === OWN_SCRIPT &&
            (scriptSettings?.ownText.length === 0
                && scriptSettings?.scriptStatus === APPROVED_TEXT_STATUS)
        ) {
            return false
        }
        if (
            scriptSettings?.scriptWriter === OWN_SCRIPT &&
            scriptSettings?.scriptStatus === DEFAULT) {
            return false
        }
        if (
            scriptSettings?.scriptWriter === PROFESSIONAL_SCRIPT &&
            (scriptSettings?.backgroundInfo.length === 0 ||
                scriptSettings?.name.length === 0 ||
                scriptSettings?.phone === 0 ||
                scriptSettings?.phone === "")
        ) {
            return false
        }
        if (scriptSettings?.teleprompter === DEFAULT) {
            return false
        }
        const persons = scriptSettings?.persons;
        persons?.forEach((person) => {
            if (person.name.length === 0 || person.title.length === 0) {
                return false
            }
        });
        return true
    }, [scriptSettings]);
    const isInterviewReady = useMemo(() => {
        if (interviewSettings?.questionsAuthor === DEFAULT) {
            return false
        }
        if (
            interviewSettings?.questionsAuthor ===
            QUESTIONS_AUTHOR_CLIENT &&
            interviewSettings.questionsAuthorOwnSettings.text
                .length === 0
        ) {
            return false
        }
        if (
            interviewSettings?.questionsAuthor ===
            QUESTIONS_AUTHOR_CLIENT &&
            interviewSettings?.questionsAuthorOwnSettings.text
                .length === 0
            && interviewSettings?.questionsAuthorOwnSettings.scriptStatus === APPROVED_TEXT_STATUS
        ) {
            return false
        }
        if (
            interviewSettings?.questionsAuthor ===
            QUESTIONS_AUTHOR_CLIENT && interviewSettings?.questionsAuthorOwnSettings.scriptStatus === DEFAULT) {
            return false
        }


        const profSettings =
            interviewSettings?.questionsAuthorProfSettings;
        if (
            interviewSettings?.questionsAuthor ===
            QUESTIONS_AUTHOR_PROFESSIONAL &&
            (profSettings?.backgroundInfo.length === 0 ||
                profSettings?.subject.length === 0 ||
                profSettings?.phone === "" ||
                profSettings?.email.length === 0)
        ) {
            return false
        }
        const persons = interviewSettings?.persons;
        persons?.forEach((person) => {
            if (person.name.length === 0 || person.title.length === 0) {
                return false
            }
        });
        const questionSettings =
            interviewSettings?.questionSettings;
        if (questionSettings?.type === DEFAULT) {
            return false
        }
        if (
            questionSettings?.type === QUESTIONS_ON_LOCATION &&
            (questionSettings?.locationSettings.name === "" ||
                questionSettings?.locationSettings.email === "" ||
                questionSettings?.locationSettings.phone === "")
        ) {
            return false
        }
        if (
            questionSettings?.type === QUESTIONS_VIRTUALLY &&
            (questionSettings?.virtualSettings.name === "" ||
                questionSettings?.virtualSettings.email === "" ||
                questionSettings?.virtualSettings.phone === "")
        ) {
            return false
        }

        return true

    }, [interviewSettings]);
    const isVoiceoverReady = useMemo(() => {
        if (voiceoverSettings?.trackAuthor === DEFAULT) {
            return false
        }
        if (
            voiceoverSettings?.trackAuthor === TRACK_AUTHOR_CLIENT &&
            voiceoverSettings?.track === DEFAULT
        ) {
            return false
        }
        const profSettings = voiceoverSettings?.scriptAuthorProfSettings;
        const ownSettings = voiceoverSettings?.scriptAuthorOwnSettings;
        if (
            voiceoverSettings?.scriptAuthor === OWN_SCRIPT && ownSettings?.text.length === 0
        ) {
            return false
        }
        if (
            voiceoverSettings?.scriptAuthor === OWN_SCRIPT &&
            voiceoverSettings?.scriptAuthorOwnSettings?.text.length === 0
            && voiceoverSettings?.scriptAuthorOwnSettings?.scriptStatus === APPROVED_TEXT_STATUS

        ) {
            return false
        }
        if (
            voiceoverSettings?.scriptAuthor === OWN_SCRIPT &&
            voiceoverSettings?.scriptAuthorOwnSettings?.scriptStatus === DEFAULT) {
            return false
        }
        if (
            voiceoverSettings?.scriptAuthor === PROFESSIONAL_SCRIPT &&
            (profSettings?.backgroundInfo.length === 0 ||
                profSettings?.subject.length === 0 ||
                profSettings?.phone === "" ||
                profSettings?.email.length === 0)
        ) {
            return false
        }
        return true
    }, [voiceoverSettings]);
    const isVideoEditReady = useMemo(() => {
        if (videoEditSettings?.format === DEFAULT) {
            return false
        }
        if (videoEditSettings?.targetDuration === DEFAULT) {
            return false
        }
        if (videoEditSettings?.additionalVisualAssets === DEFAULT) {
            return false
        }
        if (videoEditSettings?.additionalVisualAssets === true
            && videoEditSettings?.additionalVisualAssetFile === DEFAULT
            && videoEditSettings?.additionalVisualAssetUrl.length === 0) {
            return false
        }
        if (videoEditSettings?.thumbnail === DEFAULT) {
            return false
        }
        if (videoEditSettings?.additionalFormats === true) {
            const formats = videoEditSettings?.selectedAdditionalFormats;
            formats?.forEach((item) => {
                if (item.format === DEFAULT || item.duration === DEFAULT) {
                    return false
                }
            });
        }
        if (videoEditSettings?.resultTime === DEFAULT) {
            return false
        }
        if (videoEditSettings?.resultTime === RUSH_TIME && videoEditSettings?.time.value === 0) {
            return false
        }
        return true
    }, [videoEditSettings]);



    return { isProjectInfoReady, isLogisticReady, isScriptReady, isInterviewReady, isVoiceoverReady, isVideoEditReady };
};

export default useIsStepReady;

