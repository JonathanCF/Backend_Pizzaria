"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Recebro o token
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).end();
    }
    // Separar o elemento do token
    const [, token] = authToken.split(" ");
    //Verificar o token
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        // recuperar o id do token e colocar um variavel dentro user_id dentro do rev (typscritp)
        req.user_id = sub;
        return next();
    }
    catch (err) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
