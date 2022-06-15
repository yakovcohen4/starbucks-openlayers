const option = [
  [
    [1, 2],
    [3, 4],
  ],
  [
    [5, 6],
    [7, 8],
  ],
];

const option2 = [
  [145.397978, -40.792549],
  [146.364121, -41.137695],
  [146.908584, -41.000546],
];

const myFunction = (arr: any, index: number = 0) => {
  console.log(arr[index]);

  console.log(index === arr?.length);
  console.log(!arr[index]?.length);
  console.log(index);

  if (index === arr?.length || !arr[index]?.length) return;
  console.log(arr[index]);

  if (typeof arr[index][0] === 'number') {
    arr[index] = [11, 12];
    myFunction(arr, index + 1);
  } else {
    console.log(arr[index]);
    myFunction(arr[index], 0);
  }
};
myFunction(option);
console.log(option);
