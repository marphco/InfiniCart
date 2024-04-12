const express = require('express');
const apiRoutes = require('./routes/api'); // Adjust the path as necessary

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Turn on routes
app.use('/api', apiRoutes);

// Define a root route for the landing page
app.get('/', (req, res) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-commerce API</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; color: #333; }
            h1 { color: #0275d8; }
            p { font-size: 20px; }
            a { color: #5cb85c; text-decoration: none; font-size: 22px; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <h1>Welcome to the E-commerce API!</h1>
        <p>Use our API to explore products, categories, and tags.</p>
        <a href="/api/categories">View Categories</a> | 
        <a href="/api/products">View Products</a> | 
        <a href="/api/tags">View Tags</a>
    </body>
    </html>
  `;

  res.send(htmlContent);
});

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});
