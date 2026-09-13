const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const file=path.resolve(__dirname,'../../无名杯自动模拟器/controller.js');
let src=fs.readFileSync(file,'utf8');
const hook="const {game,lib,get,_status,ui}=await import('./noname.js');";
if(src.split(hook).length!==2)throw Error('fixture hook mismatch');
src=src.replace(hook,()=>hook+fs.readFileSync(path.join(__dirname,'wind-runtime.js'),'utf8'));
src=src.replace('if (require.main === module) {','if (true) {');
const runner=new Module(file,module);runner.filename=file;runner.paths=Module._nodeModulePaths(path.dirname(file));runner._compile(src,file);
