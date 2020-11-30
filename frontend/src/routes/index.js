//Arquivo responsável por controlar o roteamento da aplicação
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

/* Rotas
pitu.tk/ -> HomePage
pitu.tk/:code -> RedirectPage
pitu.tk/:code/estatisticas -> StatsPage
*/

import HomePage from '../pages/HomePage';
import RedirectPage from '../pages/RedirectPage';
import StatsPage from '../pages/StatsPage';
import NotFoundPage from '../pages/NotFoundPage';

//function responsável por retornar uma instância do BrowserRouter contendo um Switch e dentro todas as rotas de navegação da aplicação
function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:code" component={RedirectPage} />
        <Route exact path="/:code/estatisticas" component={StatsPage} />
        <Route path="/*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
