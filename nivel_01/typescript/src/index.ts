import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: "Hello wolrd" })
})

app.listen(3333)