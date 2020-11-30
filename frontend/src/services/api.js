//Arquivo responsável pela criação de uma instância do Axios

import axios from 'axios';

const baseAPI = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  return api;
};

export default baseAPI;
