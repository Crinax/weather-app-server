import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import APIFactory from './api/APIFactory';
import { MethodT } from './api/types';

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(cors());

app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

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

app.use('*', (req, res) => {
  res.send({ code: 404, message: 'Error 404: Not found' });
})

app.listen(port);