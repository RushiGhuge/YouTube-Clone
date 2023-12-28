async function getData() {

  return await Promise.resolve("Successfully completed!");
  
}

const data = getData();
console.log(data);
