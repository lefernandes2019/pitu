import React from 'react';
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Alert,
  Button,
  Spinner,
} from 'react-bootstrap';
import Header from '../../components/Header';
import { ContentContainer, ContentForm } from './style';
import functionsServices from '../../services/functionsServices';

const HomePage = () => {
  const [url, setUrl] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const inputURL = React.useRef();

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(''); //para toda vez que houver um submit limpar possíveis erros já informados

    if (!url) {
      //Se a const url estiver VAZIA, ou seja o usuário não preencheu o FormControl === Input e pressinou o button
      setIsLoading(false);
      setErrorMessage('Informe uma URL para encurtar');
    } else {
      //Se houver uma url para encurtar será executado a function generate(url) que possui o método .post() do Axios
      try {
        const result = await functionsServices.generate({ url });
        setIsLoading(false);
        setCode(result.code);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage('Ops, ocorreu um erro ao tentar encurtar a URL');
      }
    }
  }

  //Copiando o conteúdo do input para a área de transferência (Memória RAM)
  function handleCopy() {
    const elementInputDOM = inputURL.current; //Usando a referência criada pelo React.useRef() para atribuir o input à const element
    elementInputDOM.select(); //select() seleciona todo elemento input para realizar alguma operação com ele
    document.execCommand('copy'); //document do DOM e executar o comando de copy
  }

  return (
    <Container>
      <Row>
        <Col>
          <Header>Seu novo encurtador de URL</Header>
          <ContentContainer>
            <ContentForm onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Digite a URL para encurtar"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  style={{ borderColor: '#fabe58' }}
                />
                <InputGroup.Append>
                  <Button variant="success" type="submit">
                    Encurtar
                  </Button>
                </InputGroup.Append>
              </InputGroup>

              {
                //Se o isLoading for true mostrar o componente Spinner do bootstrap
                //Se for false exibir o input com a url encurtada e o button para copiá-la
              }
              {isLoading ? (
                <Spinner animation="border" variant="warning" />
              ) : (
                code && (
                  <>
                    <InputGroup className="mb-3">
                      <FormControl
                        autoFocus={true}
                        defaultValue={`http://pitu.tk/${code}`}
                        ref={inputURL}
                      />
                      <InputGroup.Append>
                        <Button variant="outline-success" onClick={handleCopy}>
                          Copiar
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                    <h6
                      style={{
                        color: '#d36400',
                      }}
                    >
                      Para acompanhar as estatísticas acesse{' '}
                      <b>
                        http://pitu.tk/
                        {code}
                      </b>
                    </h6>
                  </>
                )
              )}

              {
                //exibição do erro caso exista
              }
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </ContentForm>
          </ContentContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
