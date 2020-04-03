import './bootstrap';

import 'reflect-metadata';
import './database';

import app from './app';

app.listen(process.env.PORT || 3000);
