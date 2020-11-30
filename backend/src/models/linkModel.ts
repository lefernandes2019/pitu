//Arquivo responsavél pela criação das tabelas no BD usando JS pelo Sequelize

import Sequelize, { Optional, Model } from 'sequelize';
import { Link } from './link'; //para que o Sequelize respeite as regras do tipo criado pelo TS
import conexaoDatabase from '../database';

//Config para uso do Sequelize com o TS
interface ILinkCreationAttributes extends Optional<Link, 'id'> {} //ao criar um novo Link o id é opcional

export interface ILinkTabela
  extends Model<Link, ILinkCreationAttributes>,
    Link {}
//fim configurações

//.define('nomeTABELA', {nomeCOLUNAS}) cria a definição de uma tabela
const linkTabela = conexaoDatabase.define<ILinkTabela>('link', {
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  url: { type: Sequelize.STRING(255), allowNull: false },
  code: { type: Sequelize.STRING(20), unique: true, allowNull: false },
  qtdeVisiteds: {
    type: Sequelize.INTEGER.UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  },
});

export default linkTabela;
