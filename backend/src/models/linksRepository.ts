//Repositório é um módulo que recebe as entidades e realiza as operações daquela entidade no BD
//Arquivo responsável por conter todas as manipulações da entidade/objeto Links no BD

import linkTabela, { ILinkTabela } from './linkModel';
import { Link } from './link';

function findByCode(code: string) {
  return linkTabela.findOne<ILinkTabela>({ where: { code } });
}

function add(link: Link) {
  return linkTabela.create<ILinkTabela>(link);
}

async function addVisiteds(code: string) {
  const link = await findByCode(code); //Procura o link no BD pelo seu code

  //caso não encontre o link
  if (!link) return null;

  //caso encontre aumenta a qtde de visitas
  link.qtdeVisiteds!++; //o !antes dos ++ informa ao TS que eu assumo que qtdeVisiteds já possui um valor

  await link.save();
  //salva a atualização no BD, no SQL é gerado um update neste caso
  //await para só prosseguir na function após de fato salvar

  return link;
}

export default { findByCode, add, addVisiteds };
