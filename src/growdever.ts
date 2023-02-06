interface GrowdeverDetalheDTO {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  status: string;
  habilidades: Array<string>;
}

// DTO = DATA TRANSFER OBJECT
interface GrowdeverModelDTO {
  id: string;
  nome: string;
  status: string;
  habilidades: Array<string>;
}

export class Growdever {
  private _id: string;

  public get id() {
    return this._id;
  }

  private _nome: string;

  public get nome() {
    return this._nome;
  }

  private _dataNascimento: string;

  public get dataNascimento() {
    return this._dataNascimento;
  }

  private _cpf: string;

  public get cpf() {
    return this._cpf;
  }

  private _status: "estudando" | "cancelado" | "formado";

  public get status() {
    return this._status;
  }

  private _habilidades: Array<string>;

  public get habilidades() {
    return this._habilidades;
  }

  set habilidades(habilidades : Array<string>) {
    this._habilidades = habilidades;
  }

  constructor(
    id: string,
    nome: string,
    dataNascimento: string,
    cpf: string,
    habilidades: Array<string>
  ) {
    this._id = id;
    this._nome = nome;
    this._dataNascimento = dataNascimento;
    this._cpf = cpf;
    this._status = "estudando";
    this._habilidades = habilidades;
  }

  paraDetalheJSON(): GrowdeverDetalheDTO {
    return {
      id: this._id,
      nome: this._nome,
      dataNascimento: this._dataNascimento,
      cpf: this._cpf,
      status: this._status,
      habilidades: this._habilidades,
    };
  }

  paraModelJson(): GrowdeverModelDTO {
    return {
      id: this._id,
      nome: this._nome,
      status: this._status,
      habilidades: this._habilidades,
    };
  }
}
