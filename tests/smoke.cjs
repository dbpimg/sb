const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
for(const id of ['hand','opponent','stock','discard','drop','knock','sort-suit','sort-rank','sort-meld','sound','table-melds','next','restart','score','message'])assert.match(html,new RegExp('id="'+id+'"'));
const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length,1,'expected standalone JS');
new vm.Script(scripts[0][1],{filename:'rummy-inline.js'});
assert.match(html,/SAVE_KEY/);assert.match(html,/function dead\(/);assert.match(html,/function ai\(/);
assert.doesNotMatch(html,/stock=g\.stock\.at\(-1\)/,'computer must not peek at next stock card');
console.log('Rummy smoke checks passed');
