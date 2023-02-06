import express, { Request, Response } from "express";
import { Growdever } from "./growdever";
import { v4 as uuid } from "uuid";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

const app = express();
app.use(express.json());

const listaGrowdevers: Array<Growdever> = [];

app.get("/", (request: Request, response: Response) =>
  response.status(200).json("API OK")
);

app.listen(8080, () => console.log("API running..."));

app.post("/growdevers", (request: Request, response: Response) => {
  const { nome, dataNascimento, cpf, habilidades } = request.body;

  if (!nome || !dataNascimento || !cpf || !habilidades) {
    return response.status(400).json("Verifique os dados e tente novamente :(");
  }

  if (!cpfValidator.isValid(cpf)) {
    return response.status(400).json("Cpf não valido :(");
  }

  if (listaGrowdevers.some((growdever) => growdever.cpf === cpf)) {
    return response.status(400).json("Este cpf já está cadastrado!");
  }

  const growdever = new Growdever(
    uuid(),
    nome,
    dataNascimento,
    cpf,
    habilidades
  );

  listaGrowdevers.push(growdever);

  return response.status(201).json(growdever.paraDetalheJSON());
});

app.get("/growdevers", (request: Request, response: Response) => {
  const growdevers = listaGrowdevers.map((growdever) =>
    growdever.paraModelJson()
  );
  return response.status(200).json(growdevers);
});

app.get("/growdevers/:id", (request: Request, response: Response) => {
  const  {id } = request.params
  const growdever = listaGrowdevers.find((growdever) => growdever.id === id)
  return response.status(200).json({Growdever: growdever?.paraModelJson()});
});

app.get("/growdevers", (request: Request, response: Response) => {
  const { status, name} = request.query 

  const growdevers = listaGrowdevers.filter((growdever) => {
    if(status && name){
      return growdever.nome === name && growdever.status === status
    }

    if(status || name){
      return growdever.nome === name || growdever.status === status
    }

    return growdever
  })

  return response.status(200).json( growdevers);
});


app.post("/growdevers/:id/skills", (request: Request, response: Response) => {
  const {id} = request.params;
  const {skill} = request.body;

  if(!skill){
    return response.status(404).json({message: "Você precisa mandar uma nova skill"})
  }

  const existeGrowdever = listaGrowdevers.findIndex((growdever) => growdever.id === id)

  if(existeGrowdever === -1) {
    return response.status(400).json({message: "Este growdever não existe"});
  }
  
  listaGrowdevers[existeGrowdever].habilidades.push(skill)


  return response.status(201).json({habilidades : listaGrowdevers[existeGrowdever].habilidades});
});

app.delete("/growdevers/:id/skills/:name", (request: Request, response: Response) => {
  const {id, name} = request.params;
  const {skill} = request.body;

  if(!skill){
    return response.status(404).json({message: "Você precisa mandar uma nova skill"})
  }

  const existeGrowdever = listaGrowdevers.findIndex((growdever) => growdever.id === id)

  if(existeGrowdever === -1) {
    return response.status(400).json({message: "Este growdever não existe"});
  }
  
  const existeSkill = listaGrowdevers[existeGrowdever].habilidades.findIndex((skill) => skill === name)

  if(existeSkill === -1) {
    return response.status(400).json({message: "Esta skill não existe"});
  }

  listaGrowdevers[existeSkill].habilidades.splice(existeSkill, 1)

  return response.status(201).json({habilidades : listaGrowdevers[existeGrowdever].habilidades});
});