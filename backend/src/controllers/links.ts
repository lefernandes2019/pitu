//O Controllers é responsável por processar a requisição e enviar/receber info para o BD
//Controller é um intermediário entre o Routes e o BD

import { Request, Response } from 'express';
//importando o tipo Requst e Response para atribuir aos parâmetros das functions devido ao TS

import { Link } from '../models/link';

import linksRepository from '../models/linksRepository';

//Funtion que irá gerar o código que representará a URL encurtada
function generateCode() {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVXZWYabcdefghijklmnopqrstuvxzwy0123456789';

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length)); //.charAt() pega o caractere de acordo com a posição informada na string
  }

  return text;
}

async function postLink(req: Request, res: Response) {
  const newLink = req.body as Link; //definindo que o corpo da requisição a ser recebido será do tipo Link (pasta models)
  newLink.code = generateCode();
  newLink.qtdeVisiteds = 0;
  const result = await linksRepository.add(newLink); //await para aguardar o retorno do BD para prosseguir

  if (!result.id) return res.sendStatus(400); //se o retorno do BD for vazio ou nulo não terpa valor em id deve-se informar que houve algum erro

  newLink.id = result.id;

  res.status(201).json(newLink); //devolvendo como resposta à requisição um status 201 e o link encurtado gerado
}

async function getStatsLink(req: Request, res: Response) {
  const codigo = req.params.codigo as string; //pegando o código passado como parâmetro na URL /links/:codigo
  const linkProcurado = await linksRepository.findByCode(codigo);

  //se o resultado do .find() atribuído ao linkProcurado for nulo ou vazio
  if (!linkProcurado) {
    res.sendStatus(404); //reportar erro 404 ao usuário (Não encontrado)
  } else {
    res.json(linkProcurado); //exibir o linkProcurado e todas as suas propriedades ao usuário
  }
}

async function visitedLink(req: Request, res: Response) {
  const codigo = req.params.codigo as string;
  const linkAcessado = await linksRepository.addVisiteds(codigo);

  if (!linkAcessado) {
    res.sendStatus(404); //reportar erro 404 ao usuário (Não encontrado)
  } else {
    res.json(linkAcessado);
  }
}

export default {
  postLink,
  getStatsLink,
  visitedLink,
};
