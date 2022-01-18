import { PlantPayload } from 'api/apiModels';

export const validatePlant = (userInp: PlantPayload) => {
    if (userInp.humidity_min && userInp.humidity_max) {
        if (userInp.humidity_min >= userInp.humidity_max) {
            return ['The maximum humidity threshold must be greater than the minimum threshold'];
        }
    }
    if (userInp.soil_moisture_min && userInp.soil_moisture_max) {
        if (userInp.soil_moisture_min >= userInp.soil_moisture_max) {
            return ['The maximum soil moisture threshold must be greater than the minimum threshold'];
        }
    }
    if (userInp.temperature_min && userInp.temperature_max) {
        if (userInp.temperature_min >= userInp.temperature_max) {
            return ['The maximum temperature threshold must be greater than the minimum threshold'];
        }
    }
    return [];
}