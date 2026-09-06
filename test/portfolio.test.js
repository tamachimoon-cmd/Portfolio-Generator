import test from 'node:test';import assert from 'node:assert/strict';import AdmZip from 'adm-zip';import {parseConfig,validateConfig,renderPortfolio,buildZip} from '../src/portfolio.js';
const cfg={profile:{name:'Ada',headline:'Engenheira'},skills:['JS'],projects:[{name:'X',description:'Teste',url:'https://example.com',stack:['Node']}],links:[]};
test('valida configuração mínima',()=>assert.equal(validateConfig(cfg).profile.name,'Ada'));
test('rejeita perfil incompleto',()=>assert.throws(()=>validateConfig({profile:{name:'Ada'}}),/headline/));
test('interpreta JSON',()=>assert.equal(parseConfig(JSON.stringify(cfg),'json').skills[0],'JS'));
test('interpreta YAML',()=>assert.equal(parseConfig('profile:\n  name: Ada\n  headline: Engenheira\nskills:\n  - JS','yaml').profile.name,'Ada'));
test('escapa HTML fornecido pelo usuário',()=>{const html=renderPortfolio({...cfg,profile:{name:'<script>',headline:'Eng'}});assert.ok(!html.includes('<script>'))});
test('gera ZIP publicável',()=>{const zip=new AdmZip(buildZip(cfg));const names=zip.getEntries().map(e=>e.entryName);assert.deepEqual(names.sort(),['README.txt','index.html','styles.css'].sort())});
