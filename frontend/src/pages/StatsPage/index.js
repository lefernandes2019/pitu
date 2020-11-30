import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import functionsServices from '../../services/functionsServices';
import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './style';

import { useParams } from 'react-router-dom';

import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const StatsPage = () => {
  const [UrlPronta, setUrlPronta] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const paramUrl = useParams(); //coletando o parâmetro que foi passado em /:code na URL dinâmica

  React.useEffect(() => {
    async function stats() {
      try {
        const objUrlCurta = await functionsServices.getStats(paramUrl.code); //paramUrl.code pois o useParams() retorna em obj o conteúdo da URL dinâmica {code:hUQf6}

        //convertendo em data e formatando a string contida na coluna updateAt no BD (é gerado automatic. pelo MySQL e possui a data e hora em STRING da última atualização naquele registro.)
        const parsedDate = parseISO(objUrlCurta.updatedAt);

        //criando uma instância de Date, uma data completa com dia da semana, hora etc
        const currentDate = new Date();

        //formata uma data em frase de acordo com uma data de referência  - formatRelative(date, baseDate, [options])
        //Ex: último domingo às 04:30, hoje às 04:30
        const relativeDate = formatRelative(parsedDate, currentDate, {
          locale: ptBR,
        });

        objUrlCurta.dataAtualFormatada = relativeDate; //criando e add a propriedade dataAtualFormatada ao objeto objUrlCurta

        setUrlPronta(objUrlCurta);
      } catch (error) {
        setErrorMessage('Ops, a URL solicitada não existe');
      }
    }

    stats();
  }, []);

  return (
    <Container>
      <Header>Estatísticas</Header>

      {errorMessage ? (
        <StatsContainer className="text-center">
          <FontAwesomeIcon
            icon="exclamation-triangle"
            size="3x"
            color="#d91e18"
          />
          <p className="m-3">{errorMessage}</p>
          <a className="btn btn-success" href="/">
            Encurtar nova URL
          </a>
        </StatsContainer>
      ) : (
        <StatsContainer className="text-center">
          <p>
            <b>https://pitu.tk/{UrlPronta.code}</b>
          </p>

          <h6 style={{ color: '#d35400' }}> Redireciona para: </h6>
          <p>
            <b>{UrlPronta.url}</b>
          </p>

          <StatsRow>
            <StatsBox>
              <b>{UrlPronta.qtdeVisiteds}</b>
              <StatsBoxTitle>Visitas</StatsBoxTitle>
            </StatsBox>

            <StatsBox>
              <b>{UrlPronta.dataAtualFormatada}</b>
              <StatsBoxTitle>Última visitas</StatsBoxTitle>
            </StatsBox>
          </StatsRow>

          <a className="btn btn-success" href="/">
            Encurtar nova URL
          </a>
        </StatsContainer>
      )}
    </Container>
  );
};

export default StatsPage;
