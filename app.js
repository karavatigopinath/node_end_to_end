import express from 'express'
import 'dotenv/config'
const app = express();
app.use(express.json())
const port = process.env.PORT || 3002;
app.get('/',(req,res)=>{
  return res.send('this is response from express..!')
})

let teaData = [];
let nextIndex = 1;
app.post('/teas',(req,res)=>{
    const {name, price} = req.body;
    const newTea = {id:nextIndex++,name,price};
    teaData.push(newTea);
    return res.status(201).send(teaData);
})
app.get('/teas',(req,res)=>{
  return res.status(200).send(teaData)
})
app.get('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("404 Not found");
    }
    res.status(200).send(tea);
})
app.put('/teas/:id',(req,res)=>{
    const tea = teaData.find(t=>t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("Index  404 Not found.!");
    }
    const {name,price} = req.body;
    tea.name = name;
    tea.price = price;
   return res.status(201).send(tea);
})
app.delete('/teas/:id',(req,res)=>{
    const index = teaData.findIndex(t=>t.id === parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send("Not found.!");
    }
    teaData.splice(index,1);
     res.status(201).send("Data deleted..!")
})
app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})