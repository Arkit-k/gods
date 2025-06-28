import express from 'express';
import cors from 'cors'
import bodyparser from 'body-parser';
import routes from './routes/gods';

const app = express();

app.use(express.json());
app.use(cors())
app.use('/api', routes);



app.listen(3000, () => {
  console.log('Server started on port 3000');
});