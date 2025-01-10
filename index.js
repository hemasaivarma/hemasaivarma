const express =require("express");
const app=express();
app.use(express.json());

let todos=[{id:getId(),title:"go to gym",completed:false,description:"for the skinny body"}];

function getId(){
    return Math.floor(Math.random() * (100) + 100);
}

app.get("/todos",(req,res)=>{
    res.status(200).json(todos);
})

app.get("todos/:id",(req,res)=>{
    const id=req.params.id;
    for(let i=0;i<todos.length;i++){
        if(id == todos[i].id){
            res.status(200).json(todos[i]);
        }
    }
    res.status(404).json({err : "id not found"});
})


app.post("/todos",(req,res)=>{
    const id=getId();
    const title1=req.body.title;
    const completed1=req.body.completed;
    const description1=req.body.description;
    todos.push({id:id,title:title1,completed:completed1,description:description1});
    res.status(200).send("created with todo of id:"+id+"title"+title1);
})

app.put("/todos/:id",(req,res)=>{
    const id=req.params.id;
    const title=req.body.title;
    const completed=req.body.completed;
    for(let i=0;i<todos.length;i++){
        if(id == todos[i].id){
            todos[i].title=title;
            todos[i].completed=completed;
            res.status(200).json(todos[i]);
        }
    }
    res.status(404).json({err:"id not found"});
})

app.delete("/todos/:id",(req,res)=>{
    const id =req.params.id;
    for(let i=0;i<todos.length;i++){
        if(id == todos[i].id){
            todos.splice(i,1);
            res.status(200).json({id:id,msg:"removed form list of todos"})
        }
    }
    res.status(404).send("id not found");
})
app.listen(3000);