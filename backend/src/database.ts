import { Sequelize } from 'sequelize';

const conexaoDatabase = new Sequelize(
  'mysql://root:leandro@localhost:3306/encurtador_url'
); //string de conexão ao BD do MySQL
//mysql://USUARIO:SENHA@ENDEREÇOSERVIDOR:PORTASERVIDOR/NOMEDATABASE

export default conexaoDatabase;
