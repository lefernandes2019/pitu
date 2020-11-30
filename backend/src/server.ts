//Arquivo responsável por subir a aplicação e subir a conexão com o BD

import app from './app';
import conexaoDatabase from './database';

//sync() realiza a conexão/sincronização com o BD
conexaoDatabase.sync(); //{force:true} como parâmetro força a recriação das tabelas do BD a cada início da aplicação. USAR SOMENTE EM PRODUÇÃO.
console.log('Database rodando na porta 3306');

app.listen(3001); //comando para subir a aplicação e a mesma ficará aguardando (ouvindo) comandos na porta 3000
console.log('Servidor rodando na porta 3001');
