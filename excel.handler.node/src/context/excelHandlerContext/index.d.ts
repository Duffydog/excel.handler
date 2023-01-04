interface excel {
  name: string;
  data: dataArr;
}

type dataArr = colArr[];
type colArr = string[];

interface excles {
  [key: string]: excel[];
}

export { excel, dataArr, colArr, excles };
