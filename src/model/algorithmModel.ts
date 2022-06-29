enum Engine {
  pythoch,
}

export interface AlgorithmModelPublic {
  serialNo: string;
  modelName: string;
  kind: number;
  kindName: string;
  engine: Engine;
  field: number;
  description: string;
  maker: string;
  exprience: number;
  createDate: Date;
}

export interface AlgorithmModel extends AlgorithmModelPublic {
  id: number;
}
