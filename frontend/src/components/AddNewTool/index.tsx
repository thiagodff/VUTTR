import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import api from '../../services/api';
import { toolsRequest } from '../../store/modules/tools/actions';

import { Container, Content, Header, Form, SubmitNewTool } from './styles';

interface Props {
  handleClick: Function;
}

const AddNewTool: React.FC<Props> = ({ handleClick }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  async function handleAddNewTool(e: any) {
    e.preventDefault();
    setTags(tagInput.split(' '));

    await api.post(`/tools`, {
      title,
      link,
      description,
      tags,
    });
    dispatch(toolsRequest(''));
    handleClick();
  }

  return (
    <Container>
      <Content>
        <Header>
          <div>
            <MdAdd size={24} />
            <p>Add new tool</p>
          </div>
          <button type="button" onClick={() => handleClick()}>
            <MdClose size={20} />
          </button>
        </Header>

        <Form onSubmit={e => handleAddNewTool(e)}>
          <p>Tool Name</p>
          <input
            type="text"
            id="toolName"
            value={title}
            placeholder="tool name"
            onChange={e => setTitle(e.target.value)}
          />
          <p>Tool Link</p>
          <input
            type="text"
            id="toolLink"
            value={link}
            placeholder="tool link"
            onChange={e => setLink(e.target.value)}
          />
          <p>Tool description</p>
          <textarea
            value={description}
            placeholder="tool description"
            onChange={e => setDescription(e.target.value)}
          />
          <p>Tags</p>
          <input
            type="text"
            id="toolTags"
            value={tagInput}
            placeholder="tool tags"
            onChange={e => setTagInput(e.target.value)}
          />

          <SubmitNewTool>
            <button type="submit">Add tool</button>
          </SubmitNewTool>
        </Form>
      </Content>
    </Container>
  );
};

export default AddNewTool;
