const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("../models/home");
const Home = mongoose.model("Home");

require("../models/budget")
const Budget = mongoose.model("Budget")

const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE")
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
    app.use(cors())
    next();
})

mongoose
  .connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o BD MongoDB realizada com sucesso!");
  })
  .catch((error) => {
    console.log("Falha ao conectar com o BD MongoDB");
  });

app.get("/home", async (req, res) => {
  await Home.findOne({}).then((home) => {
    return res.json({
      error: false,
      home: home,
    });
  }).catch((error) => {
      return res.status(404).json({
          error: true,
          message: `${error.message} Erro ao acessar informações no banco de dados `
      })
  })

});

//Cadastrar informações da Home em db
app.post("/home", async (req, res) => {
  const dados = {
    topTitle: "Temos a solução para sua empresa",
    topSubTitle: "Aqui vc vai encontrar o que precisa",
  };

  // Verificar se já existe dados da Home na db
  const homeExist = await Home.findOne({});
  if (homeExist) {
    return res.status(400).json({
      error: true,
      message: "Erro ao cadastrar, página já existe registro na db!",
    });
  }

  // Salvar os dados na db
  await Home.create(dados, (error) => {
    if (error) {
      return res.status(400).json({
        error: true,
        message: "Erro ao tentar cadastrar",
      });
    }
    return res.json({
      error: false,
      message: "Cadastrado com sucesso!",
    });
  });
});


//Cadastrar informações do orçamento em db
app.post("/budget", async (req, res) => {
  
    // Salvar os dados na db
    await Budget.create(req.body, (error) => {
      if (error) {
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar enviar orçamento!",
        });
      }
      return res.json({
        error: false,
        message: "Solicitação de orçamento enviada com sucesso!",
      });
    });
  });


//**************************************************//
app.listen(8080, function () {
  console.log("Servidor rodando na porta 8080");
});
