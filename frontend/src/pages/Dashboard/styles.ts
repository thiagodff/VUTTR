import { MdCheck } from 'react-icons/md';
import styled from 'styled-components';

interface Props {
  checked: boolean;
}

export const Container = styled.div`
  height: 100%;
  background: #ffdda1;
  font-family: 'Source Sans Pro';
  color: #170c3a;
`;

export const Content = styled.div`
  width: 600px;
  flex-direction: column;
  margin: auto;
`;

export const Header = styled.div`
  padding-top: 60px;

  h1 {
    font-size: 42px;
  }

  p {
    font-size: 30px;
    margin-top: 5px;
  }
`;

export const InteractBar = styled.div`
  margin-top: 30px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  input#searchText {
    background-color: #fff8ec;
    border-radius: 0 5px 5px 0;
    border: 1px solid #ebeaed;
    border-left: none;
    height: 30px;
    width: 150px;
    font-size: 16px;

    &::placeholder {
      color: #b1adb9;
      font-size: 16px;
    }
  }

  button {
    display: flex;
    align-items: center;
    padding: 0 5px 0 5px;
    background-color: #fff8ec;
    height: 30px;
    border-radius: 5px 0 0 5px;
    border: 1px solid #ebeaed;
    border-right: none;
  }

  input#tagsOnly {
    appearance: none;
    margin-left: 10px;
    height: 18px;
    width: 18px;
    background-color: #fff8ec;
    border: 1px solid #ebeaed;
    border-radius: 5px;
    box-shadow: none;
    display: ${(props: Props) => (props.checked ? 'none' : 'visible')};
  }

  label {
    padding-left: ${(props: Props) => (props.checked ? '0' : '5px')};
    margin-left: ${(props: Props) => (props.checked ? '10px' : '0')};
    font-size: 18px;
    display: flex;
    flex: 1;
    align-items: center;
  }
`;

export const CheckIcon = styled(MdCheck).attrs({
  size: 18,
})`
  margin-right: 5px;
  height: 18px;
  width: 18px;
  background-color: #fff8ec;
  border: 1px solid #ebeaed;
  border-radius: 5px;
  box-shadow: none;
  display: ${(props: Props) => (props.checked ? 'visible' : 'none')};
`;

export const AddTool = styled.button`
  display: flex;
  width: 100px;
  height: 30px;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-family: 'Source Sans Pro';
  color: #170c3a;

  border-radius: 5px;
  background-color: #fff8ec;
  border: 1px solid #ebeaed;

  &:hover {
    opacity: 0.8;
  }

  p {
    margin-left: 3px;
  }
`;

export const ToolsWrapper = styled.div`
  margin-top: 15px;
`;
