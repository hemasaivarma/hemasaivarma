const fs =require("fs");
const { Command } = require('commander');
const program = new Command();

program
  .name('counter')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

  program.command('count')
  .description('count the no of words in file')
  .argument('<file>', 'file to count')
  .action((file)=>{
    fs.readFile(file,'utf8',function (err,data){
    
        if(err){
            console.log("error in directory");    }
            else{
                let num=0;
                for(let i=0;i<data.length;i++){
                    if(data[i] === " "){
                        num++;
                    }
                }
                console.log(`words are ${num+1}`);
            }
            
        })
  }
)


program.parse()