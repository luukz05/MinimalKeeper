const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123321",
    database: "tcc"
});

const secretKey = crypto.randomBytes(16).toString("hex");

app.use(express.json());

const TABLE_NAME = "senhas";
const COLUMN_CONTENT = "CONTENT";

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ?";
    
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Erro ao fazer login: " + err.stack);
            res.status(500).json({ error: "Erro na autenticação" });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: "Usuário ou senha incorretos" });
            return;
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (bcryptErr, match) => {
            if (bcryptErr || !match) {
                res.status(401).json({ error: "Usuário ou senha incorretos" });
            } else {
                const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
                res.json({ token });
            }
        });
    });
});

app.post("/api/register", (req, res) => {
    const { username, password } = req.body;
    const checkQuery = "SELECT username FROM users WHERE username = ?";
    
    db.query(checkQuery, [username], (checkErr, checkResults) => {
        if (checkErr) {
            console.error("Erro no banco de dados: " + checkErr.stack);
            return res.status(500).json({ error: "Ocorreu um erro ao verificar o usuário" });
        }

        if (checkResults.length > 0) {
            return res.status(400).json({ error: "Usuário já existe" });
        }

        bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
                console.error("Erro ao criptografar a senha: " + hashErr);
                return res.status(500).json({ error: "Erro ao criptografar a senha" });
            }

            const insertQuery = "INSERT INTO users (username, password) VALUES (?, ?)";

            db.query(insertQuery, [username, hashedPassword], (insertError, insertResults) => {
                if (insertError) {
                    console.error("Erro no banco de dados: " + insertError.stack);
                    return res.status(500).json({ error: "Erro ao registrar o usuário" });
                }

                res.json({ message: "Cadastro bem-sucedido" });
            });
        });
    });
});

app.get("/api/register", (req, res) => {
    const query = `SELECT * FROM users`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro no registro: " + err.stack);
            res.status(500).json({ error: "Um erro ocorreu ao pegar os registros" });
            return;
        }
        res.json(results);
    });
});

app.post("/api/post", (req, res) => {
    const { Content } = req.body;
    const checkDuplicateQuery = `SELECT ${COLUMN_CONTENT} FROM ${TABLE_NAME} WHERE ${COLUMN_CONTENT} = ?`;

    db.query(checkDuplicateQuery, [Content], (checkErr, checkResult) => {
        if (checkErr) {
            console.error("Erro na verificação de senha duplicada: " + checkErr.stack);
            res.status(500).json({ error: "Ocorreu um erro ao verificar a duplicidade da senha" });
            return;
        }

        if (checkResult.length > 0) {
            res.status(400).json({ error: "A senha já existe no banco de dados" });
            console.error("Essa senha já foi salva no banco de dados")
        } else {

            const insertQuery = `INSERT INTO ${TABLE_NAME} (${COLUMN_CONTENT}) VALUES(?)`;

            db.query(insertQuery, [Content], (insertErr, result) => {
                if (insertErr) {
                    console.error("Erro na criação do post: " + insertErr.stack);
                    res.status(500).json({ error: "Ocorreu um erro ao criar o post" });
                    return;
                }
                res.json({ message: "Post criado com sucesso", postId: result.insertId });
            });
        }
    });
});

app.get("/api/post", (req, res) => {
    const query = `SELECT * FROM ${TABLE_NAME}`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Erro no banco de dados: " + err.stack);
            res.status(500).json({ error: "Um erro ocorreu ao pegar a query" });
            return;
        }
        res.json(results);
    });
});

app.delete("/api/post", (req, res) => {
    const query = `TRUNCATE TABLE ${TABLE_NAME}`;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Erro deletando todos os posts: " + err.stack);
            res.status(500).json({ error: "Ocorreu um erro ao deletar todos os posts" });
            return;
        }
        res.json({ message: "Todos os posts foram deletados com sucesso", rowsAffected: result.affectedRows });
    });
});

app.delete("/api/post/:id", (req, res) => {
    const postId = req.params.id;

    if (!postId) {
        res.status(400).json({ error: "ID de post inválido" });
        return;
    }

    const query = `DELETE FROM ${TABLE_NAME} WHERE id = ?`;

    db.query(query, [postId], (err, result) => {
        if (err) {
            console.error("Erro deletando post: " + err.stack);
            res.status(500).json({ error: "Um erro ocorreu ao deletar o post" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "Post não encontrado" });
            return;
        }

        res.json({ message: "Post deletado com sucesso", rowsAffected: result.affectedRows });
    });
});

db.connect((err) => {
    if (err) {
        console.error("Conexão ao banco de dados falhou: " + err.stack);
        return;
    }
    console.log("Conectou ao banco de dados");
});

app.listen(port, () => {
    console.log(`Server está na porta ${port}`);
});
