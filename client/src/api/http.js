import axios from "axios";
import { useAlertPopupStore } from "../stores/alertPopupStore";
 

 

export default class Http{
     async get (url){
        const alertPopupStore = useAlertPopupStore();
        try {
            const resp = await axios.get(url)
            return resp.data;
        } catch (error) {
            alertPopupStore.displayAlert(error.message,'warning')
            return null
        }
    }

    async post (url,body){
        const alertPopupStore = useAlertPopupStore();
        try {
            const resp = await axios.post(url,body)
            return resp.data;
        } catch (error) {
            alertPopupStore.displayAlert(error.message,'warning')
            return null
        }
    }
}