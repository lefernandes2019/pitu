import express from 'express'; //lib para construção do backend
import cors from 'cors';

import linksRouter from './routes/links';

const app = express(); //app recebendo uma nova instância de express() para criação de uma aplicação express
app.use(express.json()); //para que se possa interpretar e trabalhar com arquivos JSON

app.use(cors()); //permite que o backend se comunique com o frontend devido a serem portas diferentes

app.use(linksRouter);

export default app;
