import axios from "axios"
import { apiUrls } from "../utils/constants"

export const loginUser = async (payload) => {

    const { data } = await axios.post(apiUrls.base + apiUrls.login, payload);
    return data;
}

export const signupUser = async (payload) => {
   
    var imgUrl = "";
    if (payload.imgData) {

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dkvpwutkh/image/upload",
        payload.imgData
      );
      imgUrl = data.url;
    } 

    const res = await axios.post(apiUrls.base + apiUrls.signup, {...payload,imgUrl});
    return res;
}
