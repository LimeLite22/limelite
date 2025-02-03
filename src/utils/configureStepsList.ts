import { ADD_ONS_STEP, CANDID_APPROACH, EDIT_ONLY, FINAL_STEP, INTERVIEW_STEP, LOGISTICS_STEP, OTHER,PROJECT_STEP, SCRIPT_STEP, SCRIPTED_APPROACH, SHOOT_EDIT, SHOOT_ONLY, SUBMIT_STEP, VIDEO_EDIT_STEP, VOICEOVER_APPROACH, VOICEOVER_STEP } from "consts/consts";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TStep } from "types/types";

import { selectRequestInfo, updateStepsList } from '../redux/requests/reducer';


export const useConfigureStepsList = () => {
    const request = useSelector(selectRequestInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        const uS: TStep[] = []
        if (request?.option?.value === SHOOT_EDIT || request?.option?.value === OTHER) {
            uS.push(PROJECT_STEP);
            uS.push(LOGISTICS_STEP);
            if (request?.approachList?.includes(SCRIPTED_APPROACH)) {
                uS.push(SCRIPT_STEP);
            }
            if (request?.approachList?.includes(CANDID_APPROACH)) {
                uS.push(INTERVIEW_STEP);
            }
            if (request?.approachList?.includes(VOICEOVER_APPROACH)) {
                uS.push(VOICEOVER_STEP);
            }
            uS.push(VIDEO_EDIT_STEP);
            uS.push(ADD_ONS_STEP);
            uS.push(SUBMIT_STEP);
            uS.push(FINAL_STEP);
            dispatch(updateStepsList(uS));
        }
        if (request?.option?.value === SHOOT_ONLY) {
            uS.push(PROJECT_STEP);
            uS.push(LOGISTICS_STEP);
            if (request?.approachList?.includes(SCRIPTED_APPROACH)) {
                uS.push(SCRIPT_STEP);
            }
            if (request?.approachList?.includes(CANDID_APPROACH)) {
                uS.push(INTERVIEW_STEP);
            }
            if (request?.approachList?.includes(VOICEOVER_APPROACH)) {
                uS.push(VOICEOVER_STEP);
            }
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