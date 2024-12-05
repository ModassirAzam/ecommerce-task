import express from "express";
import cors from 'cors';
import productRoute from './routes/products.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.send("Hello from server");
});

app.use('/products', productRoute);
app.use('/auth', authRoute);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
