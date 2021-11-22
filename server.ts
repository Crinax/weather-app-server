import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import APIFactory from './api/APIFactory';
import { MethodT } from './api/types';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());

app.use('/api/:version/:method', async (req, res) => {
  const method = req.params.method as MethodT;
  const api = APIFactory.get(req.params.version, [
    method,
    req.query
  ]);
  if (api.response.code !== 200) {
    res.send(api.response);
  } else {
    res.send(await api.init())
  }
});

app.listen(port);