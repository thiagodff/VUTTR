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
  padding: 20px;
  background-color: #fff8ec;
  border-radius: 5px;
  border: 1px solid #ebeaed;

  font-size: 18px;
  font-family: 'Source Sans Pro';
  color: #170c3a;

  & > p {
    font-size: 16px;
    margin-top: 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;

  p {
    font-size: 18px;
    margin-left: 10px;
  }
`;

export const Options = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

export const CancelButton = styled.button`
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

  &:hover {
    opacity: 0.8;
  }
`;

export const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff8ec;
  height: 30px;
  width: 120px;
  border-radius: 5px;
  border: 1px solid #170c3a;
  font-family: 'Source Sans Pro';
  color: #170c3a;
  font-size: 16px;
  margin-left: 10px;

  &:hover {
    opacity: 0.8;
  }
`;
