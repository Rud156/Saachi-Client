import axios from 'axios';

const ERROR_MSG = 'Something happened. Please try again.';
const BASE_URL = 'http://localhost:5050';
const CONFIG_HEADERS = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
};

var handleError = (error, message) => {
    console.log(error);
    return {
        error: message
    };
};

var getPoliticianSentiment = (politicianName) => {
    return axios.get(`${BASE_URL}/sentiment/${politicianName}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return handleError(error, ERROR_MSG);
        });
};

var recognizePolitician = (file) => {
    var form = new FormData();
    form.append('politician', file);

    return axios.post(`${BASE_URL}/recognize`, form, CONFIG_HEADERS)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return handleError(error, ERROR_MSG);
        });
};

export {
    getPoliticianSentiment,
    recognizePolitician
};
