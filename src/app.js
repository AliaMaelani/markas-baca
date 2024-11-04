require('dotenv').config(); // Memuat dotenv di bagian atas file
const express = require('express');
const routes = require('./routes');
const connectDB = require('./config/mongodb');
const app = express();
require('dotenv').config({ path: './src/.env' });
const authorRoutes = require('./routes/author_routes'); 



const port = process.env.PORT || 3000; 

connectDB(); // Memanggil fungsi connectDB

app.use(express.json());
app.use("/api/v1", routes);
app.post("/api/v1/borrows/book", (req, res) => {
  res.status(200).json({ message: "Endpoint POST /api/v1/borrows/book berhasil diakses" });
});
app.post("/api/v1/borrows/book/return", (req, res) => {
  res.status(200).json({ message: "Endpoint POST /api/v1/borrows/book berhasil diakses" });
});

app.post('/api/v1/author', authorRoutes); 
app.post('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
