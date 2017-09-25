import axios from 'axios';

const ERROR_MSG = 'Something happened. Please try again.';
const BASE_URL = 'http://localhost:5000';
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
    form.append('file', file);

    return axios.post(`${BASE_URL}/recognize`, form, CONFIG_HEADERS)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return handleError(error, ERROR_MSG);
        });
};

var searchPolitician = (name) => {
    return axios.get(`${BASE_URL}/search/${name}?size=10`)
        .then(response => {
            return response.data.hits.hits;
        })
        .catch(error => {
            return handleError(error, ERROR_MSG);
        });
};

var getPoliticianInfo = (name) => {
    var sentiment = axios.get(`${BASE_URL}/sentiment/${name}`);
    var info = axios.get(`${BASE_URL}/search/${name}?size=1`);

    return Promise.all([sentiment, info])
        .then(response => {
            return [response[0].data, response[1].data.hits.hits[0]._source];
        })
        .catch(error => {
            return handleError(error, ERROR_MSG);
        });
}

export {
    getPoliticianSentiment,
    recognizePolitician,
    searchPolitician,
    getPoliticianInfo
};
