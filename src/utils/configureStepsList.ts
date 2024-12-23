import { useEffect } from 'react';
import { stepType } from "types/types";
import { ADD_ONS_STEP, CANDID_APPROACH, EDIT_ONLY, INTERVIEW_STEP, LOGISTICS_STEP, PROJECT_STEP, SCRIPTED_APPROACH, SCRIPT_STEP, SHOOT_EDIT, SHOOT_ONLY, VIDEO_EDIT_STEP, VOICEOVER_APPROACH, VOICEOVER_STEP, SUBMIT_STEP, FINAL_STEP, OTHER } from "consts/consts";
import { useDispatch, useSelector } from 'react-redux';
import { selectRequestInfo, updateStepsList } from '../redux/requests/reducer';


export const useConfigureStepsList = () => {
    const request = useSelector(selectRequestInfo);
    const dispatch = useDispatch();

    useEffect(() => {
        let uS: stepType[] = []
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