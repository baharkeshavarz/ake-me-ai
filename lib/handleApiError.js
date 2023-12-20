import { toast } from "react-toastify"

export function defaultApiHandler(response) {
    if (response?.status === 200) {
        if (response?.data?.succeed) {
            return (response?.data?.value)
        } else {
            toast.error(response?.data?.message)
            throw response?.data?.message
        }
    }
}
export function getApiValOrErr(response) {
    if (response?.status === 200) {
        if (response?.data?.succeed) {
            return (response?.data?.value)
        } else {
            throw response?.data?.message
        }
    }
}