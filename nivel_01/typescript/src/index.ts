import express from 'express';

import { helloWorld } from './routes.ts'
const app = express();

app.get('/', helloWorld)

app.listen(3333)