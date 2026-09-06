import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildZip, parseConfig, renderPortfolio, renderStyles } from './portfolio.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'};
const send = (res, code, body, type='application/json; charset=utf-8') => {res.writeHead(code, {'content-type':type,'cache-control':'no-store'});res.end(body)};
async function body(req){const chunks=[];let size=0;for await(const c of req){size+=c.length;if(size>1_000_000)throw new Error('Payload acima de 1 MB.');chunks.push(c)}return Buffer.concat(chunks).toString('utf8')}

const server = http.createServer(async (req,res)=>{
  try {
    const url = new URL(req.url,'http://localhost');
    if(req.method==='GET'&&url.pathname==='/api/health') return send(res,200,JSON.stringify({status:'ok',version:'0.1.0'}));
    if(req.method==='POST'&&(url.pathname==='/api/preview'||url.pathname==='/api/export')){
      const raw=JSON.parse(await body(req));
      const config=parseConfig(String(raw.content??''), raw.format==='yaml'?'yaml':'json');
      if(url.pathname==='/api/preview') return send(res,200,JSON.stringify({html:renderPortfolio(config),css:renderStyles()}));
      const zip=buildZip(config);res.writeHead(200,{'content-type':'application/zip','content-disposition':'attachment; filename="portfolio.zip"'});return res.end(zip);
    }
    if(req.method==='GET'){
      const rel=url.pathname==='/'?'index.html':url.pathname.slice(1);const safe=path.normalize(rel).replace(/^(\.\.(\/|\\|$))+/,'');const file=path.join(root,safe);
      if(!file.startsWith(root)) return send(res,403,JSON.stringify({error:'Acesso negado'}));
      try{return send(res,200,await fs.readFile(file),types[path.extname(file)]??'application/octet-stream')}catch(e){if(e.code!=='ENOENT')throw e}
    }
    send(res,404,JSON.stringify({error:'Rota não encontrada'}));
  } catch(e){send(res,400,JSON.stringify({error:e.message||'Falha inesperada'}))}
});
const port=Number(process.env.PORT||3000);server.listen(port,process.env.HOST||'0.0.0.0',()=>console.log(`Portfolio Generator em http://localhost:${port}`));
