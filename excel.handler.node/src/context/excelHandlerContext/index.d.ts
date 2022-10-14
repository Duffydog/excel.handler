interface excel {
  name: string;
  data: dataArr;
}

type dataArr = colArr[];
type colArr = string[];

export { excel, dataArr, colArr };
