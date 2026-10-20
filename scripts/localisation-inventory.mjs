import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const base = path.resolve('apps/web/src');
const rows=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(tsx|ts)$/.test(file)){
  const text=fs.readFileSync(file,'utf8');const ast=ts.createSourceFile(file,text,ts.ScriptTarget.Latest,true);
  function visit(node){if(ts.isJsxText(node)||ts.isStringLiteral(node)||ts.isNoSubstitutionTemplateLiteral(node)){
    const content=ts.isJsxText(node)?node.text.replace(/\s+/g,' ').trim():node.text;
    if(content&&/[A-Za-z]{3}/.test(content))rows.push({file:path.relative(process.cwd(),file),line:ast.getLineAndCharacterOfPosition(node.getStart(ast)).line+1,kind:ts.isJsxText(node)?'jsx_text':'literal_requires_classification',text:content,sha256:crypto.createHash('sha256').update(content).digest('hex')});
  }ts.forEachChild(node,visit)}visit(ast);
}}}
walk(base);
const report={generated_at:new Date().toISOString().slice(0,10),scope:'AST inventory of JSX text and string literals, including technical literals requiring human classification. Catalogue keys are inventoried separately. Extraction is not translation or approval.',literal_count:rows.length,rows};
fs.writeFileSync('docs/evidence/localisation-inventory.json',JSON.stringify(report,null,2)+'\n');
console.log(`${rows.length} public-source UI/technical literals inventoried for review; no private runtime content.`);
