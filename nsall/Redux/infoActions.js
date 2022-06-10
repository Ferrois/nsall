import { MODIFY_INFO, RESET_INFO } from "./infoTypes";

export const modifyInfo = ({key,info}) => {
    return {type: MODIFY_INFO, payload: [key,info]};
}

export const resetInfo = (key) => {
    return {type: MODIFY_INFO, payload: key};
}