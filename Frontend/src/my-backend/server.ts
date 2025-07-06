import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    return res.json({ token: 'faketoken-' });
  }
  return res.status(401).json({ message: '用户名或密码错误' });
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
