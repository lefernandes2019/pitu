//Arquivo responsável pela criação da entidade, do objeto em relação ao JS

export type Link = {
  id?: number; //O ? define a propriedade como OPCIONAL
  url: string;
  code?: string;
  qtdeVisiteds?: number;
};
