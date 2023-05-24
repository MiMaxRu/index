const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Конфигурация подключения к базе данных MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

// Подключение к базе данных MySQL
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    return;
  }
  console.log('Подключение к базе данных успешно установлено');
});

// Middleware для обработки JSON-данных
app.use(bodyParser.json());

// Middleware для обработки CORS
app.use(cors());

// Обработчик POST-запроса на адрес '/send_phone'
app.post('/send_phone', (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  // Вставка номера телефона в таблицу базы данных
  const query = 'INSERT INTO phone_numbers (phone_number) VALUES (?)';
  connection.query(query, [phoneNumber], (err, results) => {
    if (err) {
      console.error('Ошибка при вставке номера телефона:', err);
      res.status(500).send('Произошла ошибка');
      return;
    }
    console.log('Номер телефона успешно вставлен в базу данных');
    res.send('Номер телефона успешно получен и сохранен');
  });
});

// Запуск сервера на порту 3000
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
