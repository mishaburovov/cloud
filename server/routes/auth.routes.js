const express = require('express');
const { check, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require("jsonwebtoken");

const router = express.Router();

const connectionPool = mysql.createPool({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database'),
  port: config.get('db.port'),
});

const authMiddleware = require('../middleware/auth.middleware')


router.post('/registration', [
  check('email', 'Uncorrect email').isEmail(),
  check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 }),
], async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Uncorrect request', errors: errors.array() });
    }

    const { email, password } = req.body;

    const connection = await connectionPool.getConnection();

    try {
      // Проверяем, существует ли пользователь с таким email в базе данных
      const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length > 0) {
        return res.status(400).json({ message: `User with email ${email} already exists` });
      }

      // Хэшируем пароль
      const hashPassword = await bcrypt.hash(password, 15);

      // Создаем запись нового пользователя в базе данных
      await connection.execute('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashPassword]);

      // return res.json({ message: 'User was created' });


      const [userRow] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      const user = userRow[0];
  
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      });


    } finally {
      connection.release();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const connection = await connectionPool.getConnection();

    try {
      // Проверяем, существует ли пользователь с таким email в базе данных
      const [rows] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const user = rows[0];

      // Сравниваем введенный пароль сохраненному зашифрованному паролю
      const isPassValid = await bcrypt.compare(password, user.password);
      if (!isPassValid) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Генерируем токен аутентификации
      const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: '1h' });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      });
    } finally {
      connection.release();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/auth', authMiddleware,
  async (req, res) => {
    try {
      const connection = await connectionPool.getConnection();
      const [raws] = await connection.execute(`SELECT * FROM user WHERE user.id = ?`, [req.user.id])
      const user = raws[0];

      console.log(user)
      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar
        }
      })
    } catch (e) {
      console.log(e)
      res.send({ message: "Server error" })
    }
  })

module.exports = router;