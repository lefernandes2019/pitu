import baseAPI from './api';

const conexaoAPI = baseAPI('http://localhost:3001/');

async function getLink(code) {
  const result = await conexaoAPI.get(`links/${code}`);

  return result.data;
}

async function getStats(code) {
  const result = await conexaoAPI.get(`links/${code}/estatisticas`);
  return result.data;
}

async function generate(model) {
  const result = await conexaoAPI.post('links', model);

  return result.data;
}

export default { getLink, getStats, generate };
