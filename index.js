import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let garmentList = [];
let gID = 1;

app.post("/garments", (req, res) => {
  const { name, price } = req.body;
  const garment = { id: gID++, name, price };
  garmentList.push(garment);
  res.status(201).send(garment);
});

app.get("/garments", (req, res) => {
  res.status(202).send(garmentList);
});

app.get("/garments/:id", (req, res) => {
  const garmentFind = garmentList.find(t => t.id === parseInt(req.params.id))
  if(!garmentFind){
    res.status(404).send("id not Found!")
  }
  res.status(203).send(garmentFind)
});

app.put("/garments/:id",(req,res) => {
  const garmentFind = garmentList.find(t => t.id === parseInt(req.params.id))
  if(!garmentFind){
    res.status(404).send("id not Found!")
  }
  garmentFind.name = req.body.name
  garmentFind.price = req.body.price
  res.status(205).send(garmentFind)
})
 
app.delete("/garments/:id",(req,res) => {
  const garmentindex = garmentList.findIndex(t => t.id === parseInt(req.params.id))
  if(garmentindex === -1){
    res.status(404).send("id not Found!")
  }
  garmentList.splice(garmentindex,1)
  res.status(206).send("deleted")
})

app.listen(port, () => {
  console.log(`server is listening at port: ${port}`);
});
