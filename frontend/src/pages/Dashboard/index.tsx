import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { State } from '../../interface';
import { toolsRequest } from '../../store/modules/tools/actions';

import { Container } from './styles';

export default function Dashboard() {
  const dispatch = useDispatch();
  const tools = useSelector((state: State) => state.tools.tools);
  const loading = useSelector((state: State) => state.loading);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(toolsRequest());
    toast.success('Ola');
  }, []);

  return (
    <Container>
      <h1>Tools</h1>
      {tools?.map(tool => (
        <h1>{tool.title}</h1>
      ))}
    </Container>
  );
}
