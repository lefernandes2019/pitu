import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsContainer } from './style';
import functionsServices from '../../services/functionsServices';

import { useParams } from 'react-router-dom';

const RedirectPage = () => {
  const [errorMessage, setErrorMessage] = React.useState('');

  const paramUrl = useParams(); //coletando o parâmetro que foi passado em /:code na URL dinâmica

  React.useEffect(() => {
    async function link() {
      try {
        const objUrl = await functionsServices.getLink(paramUrl.code); //paramUrl.code pois o useParams() retorna em obj o conteúdo da URL dinâmica {codigo:hUQf6}

        window.location = objUrl.url;
      } catch (error) {
        setErrorMessage('Ops, a URL solicitada não existe');
      }
    }

    link();
  }, []);

  return (
    <Container>
      {errorMessage ? (
        <>
          <Header>Seu novo encurtador de URL</Header>
          <StatsContainer className="text-center">
            <FontAwesomeIcon
              icon="exclamation-triangle"
              size="3x"
              color="#d91e18"
            />
            <h4 className="m-3">{errorMessage}</h4>
            <a
              className="btn btn-success"
              href="/"
              style={{ marginTop: '20px' }}
            >
              Encurtar nova URL
            </a>
          </StatsContainer>
        </>
      ) : (
        <StatsContainer className="text-center">
          <Spinner animation="border" variant="warning" role="status"></Spinner>
          <span style={{ marginLeft: '10px' }}>Redirecionando...</span>
        </StatsContainer>
      )}
    </Container>
  );
};

export default RedirectPage;
