export interface ITarefa {
  id?: string;
  nome?: string;
  feito?: boolean;
}

export class Tarefa implements ITarefa {
  constructor(
    public id?: string,
    public nome?: string,
    public feito?: boolean
  ) {}
}
