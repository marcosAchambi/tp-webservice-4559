export enum CATEGORIA_TURISTA {
  MENOR = 1,
  ADULTO = 2,
  JUBILADO = 3
}

export interface Ticket {
  dni: string;
  precio: number;
  categoriaTurista: CATEGORIA_TURISTA;
  fechaCompra: Date;
  email: string;
}
