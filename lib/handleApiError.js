import { toast } from "react-toastify"

export function defaultApiHandler(response) {
    if (response?.status === 200) {
        if (response?.data) {
            return response?.data;
        } else {
            toast.error(response?.message)
            throw response?.message;
        }
    }
}
