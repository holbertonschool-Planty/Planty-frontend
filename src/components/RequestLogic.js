import axios from "axios";
export const requestLocation = async () => {
	try {
		const response = await axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=22ee42b27060481ba87d67b5ef1ac102',
			{
				headers: {
					'Accept': 'application/json'
				}
			}
		)
		return response.data.timezone.gmt_offset;
	}
	catch (e) {
		alert("error requestLocation");
		console.log(e)
	}
};

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
    catch (e) {
        alert("error");
        console.log(e)
    }
}

export const requestCreatePlanty = async (user_id, planty_id, dataJson, imageJson) => {
    try {
        const formData = new FormData();
        // Añadir la imagen
        formData.append('file', {
            uri: imageJson.uri,
            type: 'image/jpeg',
            name: imageJson.name
        });
        // Añadir los otros campos como un único objeto JSON bajo la clave "data"
        formData.append('data', JSON.stringify(dataJson));
        const response = await axios.post(
            `http://api.plantyit.tech/api/users_planty/${user_id}/planty/${planty_id}`,
            formData,
            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        // Si hay un error en la solicitud
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango de 2xx
            console.log("Data:", error.response.data);
            console.log("Status:", error.response.status);
            console.log("Headers:", error.response.headers);
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió ninguna respuesta
            console.log("Request was made but no response was received:", error.request);
        } else {
            // Algo sucedió en la configuración de la solicitud y se desencadenó un error
            console.log("Error", error.message);
        }
    }
};

export const requestGetAllPlantyes = async (user_id) => {
    try {
		const response = await axios.get(`http://api.plantyit.tech/api/users_planty/${user_id}`,
			{
				headers: {
					'Accept': 'application/json'
				}
			}
		)
        return response.data;
    } catch(error) {
        console.log(error);
    }

}

export const requestPostToken = async (user_id, token) => {
    const form = new FormData();
    form.append('token', token);

    try {
        const response = await axios.post(
            `http://api.plantyit.tech/api/users/${user_id}/token?users_id=${user_id}`,
            {
                "token": token
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        if (error.response) {
            // Si es una respuesta HTTP con estado de error, puedes acceder a sus datos
            console.log(error.response.data);
        } else {
            alert("error");
            console.error(error);
        }
    }
}


export const requestCheckToken = async (token_id) => {
    try {
        const response = await axios.post(
            `http://api.plantyit.tech/api/users/login/${token_id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );
        return response;
    } catch (error) {
        if (error.response) {
            // Si es una respuesta HTTP con estado de error, puedes acceder a sus datos
            console.log(error.response.data);
        } else {
            alert("error");
            console.error(error);
        }
    }
}