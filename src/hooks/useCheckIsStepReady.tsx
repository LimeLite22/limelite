import { OTHER, SHOOT_EDIT, SHOOT_ONLY } from "consts/consts";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectRequestInfo } from "../redux/requests/reducer";

const useIsStepReady = () => {
    const selectedRequest = useSelector(selectRequestInfo);
    const projectSettings = selectedRequest?.projectInfoSettings;

    const isProjectInfoReady = useMemo(() => {
        if (!projectSettings) return false;

        if (!projectSettings?.name?.length ||
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

    return { isProjectInfoReady };
};

export default useIsStepReady;

