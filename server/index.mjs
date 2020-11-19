import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import postRoutes from './routes/posts.mjs';
import userRoutes from './routes/user.mjs';
import { MONGODB } from './config/config.mjs';
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use(morgan('tiny'));

const CONNECTION_URL = MONGODB;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server Running on Port: http://localhost:${PORT}`)
		)
	)
	.catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
