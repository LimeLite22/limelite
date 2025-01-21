import { CANCELED_REQUEST_STATUS, COMPLETE_REQUEST_STATUS, IN_EDITING_REQUEST_STATUS, ON_HOLD_REQUEST_STATUS, REQUESTED_REQUEST_STATUS, SCHEDULED_REQUEST_STATUS } from "consts/consts";



export const statusColor = (status: string) => {
    if (status === COMPLETE_REQUEST_STATUS) return `var(--green-dark2)`;
    if (status === IN_EDITING_REQUEST_STATUS) return `var(--pink-dark2)`;
    if (status === SCHEDULED_REQUEST_STATUS) return `var(--yellow-light)`;
    if (status === REQUESTED_REQUEST_STATUS) return `var(--blue)`;
    if (status === ON_HOLD_REQUEST_STATUS) return `var(--orange-light2)`;
    if (status === CANCELED_REQUEST_STATUS) return `var(--red)`;
}