import styled from 'styled-components';

export const StatsContainer = styled.div`
  display: block;
`;

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

export const StatsBox = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding: 2rem;
  border: solid 1px #fabe58;
  border-radius: 0.25rem;
  text-align: center;
  margin: 1rem;
`;

export const StatsBoxTitle = styled.div`
  display: block;
  font-weight: 500;
  padding: 0.25rem;
`;
