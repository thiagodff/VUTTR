import React from 'react';
import { MdClear } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { Tool } from '../../interface';
import api from '../../services/api';
import { toolsRequest } from '../../store/modules/tools/actions';

import { Container, Header, RemoveButton, Description, Tags } from './styles';

const RenderTool: React.FC<Tool> = ({
  id,
  title,
  link,
  description,
  tags,
  handleRemoveClick,
}) => {
  const dispatch = useDispatch();

  async function handleRemove() {
    await api.delete(`/tools/${id}`);
    dispatch(toolsRequest(''));
  }

  return (
    <Container>
      <Header>
        <a href={link}>{title}</a>
        <RemoveButton onClick={() => handleRemoveClick(id, title)}>
          <div>
            <MdClear size={16} />
            <p>remove</p>
          </div>
        </RemoveButton>
      </Header>

      <Description>{description}</Description>

      <Tags>
        {tags.map(tag => (
          <strong key={tag}>#{tag} </strong>
        ))}
      </Tags>
    </Container>
  );
};

export default RenderTool;
