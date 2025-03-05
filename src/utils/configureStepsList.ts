import { NARRATION_STEP } from './../consts/consts';
import { ADD_ONS_STEP, EDIT_ONLY, FINAL_STEP, LOGISTICS_STEP, OTHER, PROJECT_STEP, SHOOT_EDIT, SHOOT_ONLY, SUBMIT_STEP, VIDEO_EDIT_STEP } from "consts/consts";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStep } from "types/types";

import { selectRequestInfo, updateStepsList } from '../redux/requests/reducer';


export const useConfigureStepsList = () => {
    const request = useSelector(selectRequestInfo)?.projectInfoSettings;
    const dispatch = useDispatch();

    useEffect(() => {
        const uS: TStep[] = []
        if (request?.option?.value === SHOOT_EDIT || request?.option?.value === OTHER) {
            uS.push(PROJECT_STEP);
            uS.push(LOGISTICS_STEP);
            uS.push(NARRATION_STEP);
            uS.push(VIDEO_EDIT_STEP);
            uS.push(ADD_ONS_STEP);
            uS.push(SUBMIT_STEP);
            uS.push(FINAL_STEP);
            dispatch(updateStepsList(uS));
        }
        if (request?.option?.value === SHOOT_ONLY) {
            uS.push(PROJECT_STEP);
            uS.push(LOGISTICS_STEP);
            uS.push(NARRATION_STEP);
            uS.push(ADD_ONS_STEP);
            uS.push(SUBMIT_STEP);
            uS.push(FINAL_STEP);
            dispatch(updateStepsList(uS));
        }
        if (request?.option?.value === EDIT_ONLY) {
            uS.push(PROJECT_STEP);
            uS.push(VIDEO_EDIT_STEP);
            uS.push(ADD_ONS_STEP);
            uS.push(SUBMIT_STEP);
            uS.push(FINAL_STEP);
            dispatch(updateStepsList(uS));
        }
    }, [request])

};