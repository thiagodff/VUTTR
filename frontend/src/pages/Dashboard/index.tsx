import React, { useState, useEffect } from 'react';
import { MdSearch, MdAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import AddNewTool from '../../components/AddNewTool';
import RenderTool from '../../components/RenderTool';
import { State } from '../../interface';
import { toolsRequest } from '../../store/modules/tools/actions';

import {
  Container,
  Content,
  Header,
  Form,
  AddTool,
  InteractBar,
  CheckIcon,
  ToolsWrapper,
} from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const tools = useSelector((state: State) => state.tools.tools);

  const [searchText, setSearchText] = useState('');
  const [checked, setChecked] = useState(false);
  const [addTool, setAddTool] = useState(false);

  useEffect(() => {
    dispatch(toolsRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTools(e: any) {
    e.preventDefault();

    if (checked) {
      dispatch(toolsRequest('tags', searchText));
    } else {
      dispatch(toolsRequest('q', searchText));
    }

    setSearchText('');
  }

  return (
    <Container>
      {addTool && <AddNewTool handleClick={() => setAddTool(!addTool)} />}
      <Content>
        <Header>
          <h1>VUTTR</h1>
          <p>Very Useful Tools to Remeber</p>
        </Header>

        <InteractBar>
          <Form onSubmit={handleTools} checked={checked}>
            <button type="submit">
              <MdSearch size={20} color="#B1ADB9" />
            </button>
            <input
              type="text"
              id="searchText"
              value={searchText}
              placeholder="search"
              onChange={e => setSearchText(e.target.value)}
            />
            <input
              type="checkbox"
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
              name="tagsOnly"
              id="tagsOnly"
            />
            <label htmlFor="tagsOnly">
              <CheckIcon checked={checked} />
              search in tags only
            </label>
          </Form>

          <AddTool type="button" onClick={() => setAddTool(!addTool)}>
            <MdAdd size={20} />
            <p>Add</p>
          </AddTool>
        </InteractBar>

        <ToolsWrapper>
          {tools?.map(tool => (
            <RenderTool
              key={tool.id}
              id={tool.id}
              title={tool.title}
              link={tool.link}
              description={tool.description}
              tags={tool.tags}
            />
          ))}
        </ToolsWrapper>
      </Content>
    </Container>
  );
}
