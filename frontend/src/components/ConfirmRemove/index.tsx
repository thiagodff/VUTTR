import React from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import api from '../../services/api';
import { toolsRequest } from '../../store/modules/tools/actions';

import {
  Container,
  Content,
  Header,
  Options,
  CancelButton,
  ConfirmButton,
} from './styles';

interface Props {
  handleClick: Function;
  id?: number;
  title?: string;
}

const ConfirmRemoveTool: React.FC<Props> = ({ handleClick, id, title }) => {
  const dispatch = useDispatch();

  async function handleConfirmRemoveTool(e: any) {
    e.preventDefault();

    await api.delete(`/tools/${id}`);
    dispatch(toolsRequest(''));
    handleClick();
  }

  return (
    <Container>
      <Content>
        <Header>
          <MdClose size={18} />
          <p>Remove tool</p>
        </Header>

        <p>
          Are you sure you want to remove <strong>{title}</strong>
        </p>

        <Options>
          <CancelButton onClick={() => handleClick()}>Cancel</CancelButton>
          <ConfirmButton onClick={handleConfirmRemoveTool}>
            Yes, remove
          </ConfirmButton>
        </Options>
      </Content>
    </Container>
  );
};

export default ConfirmRemoveTool;
