import express from 'express';
import jwt from 'jsonwebtoken';

const protect = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET || 'fallbackSecret';
      const decoded = jwt.verify(token, secret);
      
      req.user = decoded as jwt.JwtPayload;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };

