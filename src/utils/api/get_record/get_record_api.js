import axios from "axios";
import ApiRoute from "../../../config/apiroute";

export const getCovidRecordAll = (props) =>{
    const currentDate = props.currentDate;
    const url = `${ApiRoute.main_url}${ApiRoute.port}${ApiRoute.get_url.get_covid_record_all_url}`; 
    return axios
    .get(url,{
        params: {
          date: currentDate
        }
      })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    })
    .finally();
}
