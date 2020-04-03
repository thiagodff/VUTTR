import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff8ec;
  margin-bottom: 20px;
  padding: 15px;
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 600px;
  border-radius: 5px;
  border: 1px solid #ebeaed;
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  a {
    font-size: 18px;
  }
`;

export const RemoveButton = styled.button`
  box-shadow: none;
  border: none;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;

  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    align-content: center;

    p {
      font-size: 16px;
      margin-bottom: 2px;
    }
  }
`;

export const Description = styled.div`
  margin-top: 5px;
  font-size: 16px;
`;

export const Tags = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;
