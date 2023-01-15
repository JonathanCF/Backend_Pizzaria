import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Recebro o token

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  // Separar o elemento do token
  const [, token] = authToken.split(" ");

  //Verificar o token
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad;

    // recuperar o id do token e colocar um variavel dentro user_id dentro do rev (typscritp)
	 req.user_id = sub
	 
    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
