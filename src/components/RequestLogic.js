import axios from "axios";

export const requestUbication = async () => {
    try{
        const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=22ee42b27060481ba87d67b5ef1ac102', 
        {
            headers: {
                'Accept': 'application/json'
            }
        }
        )
        return response.data.timezone.gmt_offset;
    }
     catch (e){
        alert("error requestUbication");
        console.log(e)
    }
}

export const requestGetPlants = async () => {
    try {
        const response = await axios.get('http://api.plantyit.tech/api/plants_info', 
        {
            headers: {
                'Accept': 'application/json'
            }
        }
        )
        return response.data;
    }
     catch (e){
        alert("error");
        console.log(e)
    }
}