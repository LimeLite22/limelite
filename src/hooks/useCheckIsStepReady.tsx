import { APPROVED_TEXT_STATUS, DEFAULT, OTHER, OWN_ADDRESS, OWN_SCRIPT, PROFESSIONAL_SCRIPT, SHOOT_EDIT, SHOOT_ONLY, YES } from "consts/consts";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import { selectRequestInfo } from "../redux/requests/reducer";

const useIsStepReady = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const projectSettings = selectedRequest?.projectInfoSettings;
    const logisticSettings = selectedRequest?.logisticSettings;
    const scriptSettings = selectedRequest?.scriptSettings;

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



    return { isProjectInfoReady, isLogisticReady, isScriptReady };
};

export default useIsStepReady;

