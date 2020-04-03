import React from 'react';
import { MdClear } from 'react-icons/md';

import { Tool } from '../../interface';

import { Container, Header, RemoveButton, Description, Tags } from './styles';

const RenderTool: React.FC<Tool> = ({
  id,
  title,
  link,
  description,
  tags,
  handleRemoveClick,
}) => {
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
