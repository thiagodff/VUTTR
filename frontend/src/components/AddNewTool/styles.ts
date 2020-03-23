import styled from 'styled-components';

export const Container = styled.div`
  appearance: none;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const Content = styled.div`
  flex-direction: column;
  width: 400px;
  margin: auto;
  padding: 30px;
  background-color: #fff8ec;
  border-radius: 5px;
  border: 1px solid #ebeaed;
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 -10px 0 -10px;

  div {
    display: flex;
    flex: 1;
    flex-direction: row;

    p {
      font-size: 24px;
      margin-left: 5px;
    }
  }

  button {
    appearance: none;
    background: transparent;
    border: none;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 10px 10px 0 10px;
  font-size: 16px;

  p {
    margin-bottom: 10px;
  }

  input {
    background-color: #fff8ec;
    border-radius: 4px;
    border: 1px solid #bbb;
    height: 30px;
    font-size: 16px;
    padding: 10px;
    margin-bottom: 10px;
    font-family: 'Source Sans Pro';
    font-size: 16px;
    color: #170c3a;
  }

  textarea {
    background-color: #fff8ec;
    border-radius: 4px;
    border: 1px solid #bbb;
    height: 60px;
    margin-bottom: 10px;
    resize: none;
    padding: 10px;
    font-family: 'Source Sans Pro';
    font-size: 16px;
    color: #170c3a;
  }
`;

export const SubmitNewTool = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff8ec;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    border: 1px solid #170c3a;
    font-family: 'Source Sans Pro';
    color: #170c3a;
    font-size: 16px;
    margin-top: 5px;

    &:hover {
      opacity: 0.8;
    }
  }
`;
