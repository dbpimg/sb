const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'standalone game script');
const nodes=new Map();
function node(id=''){
  const n={id,children:[],className:'',textContent:'',disabled:false,style:{setProperty(){}},classList:{add(){}},
    replaceWith(other){nodes.set(id,other);other.id=id;},
    replaceChildren(...kids){this.children=kids;},append(...kids){this.children.push(...kids);},
    setAttribute(){},addEventListener(){},onclick:null};
  if(id)nodes.set(id,n);return n;
}
for(const id of ['hand','opponent','stock','discard','drop','knock','continue','next','restart','score','message','dw','count','end','title','detail','hint','sort-suit','sort-rank','sort-meld','sound','table-melds','share-game','share-status'])node(id);
const memory=new Map();
const sandbox={document:{getElementById:id=>nodes.get(id),createElement:()=>node()},localStorage:{
 getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)},setTimeout:()=>1,clearTimeout:()=>{},
 Math,console};
vm.createContext(sandbox);
vm.runInContext(script.replace(/\}\)\(\);\s*$/, ';globalThis.__test={meld,dead,choice};})();'),sandbox);
const {meld,dead,choice}=sandbox.__test;
const c=(s,r)=>({s,r,id:s*13+r-1});
assert.equal(meld([c(0,1),c(0,2),c(0,3)]),true,'low ace run');
assert.equal(meld([c(0,12),c(0,13),c(0,1)]),false,'ace cannot wrap');
assert.equal(meld([c(0,7),c(1,7),c(2,7)]),true,'3 of a kind');
assert.equal(meld([c(0,7),c(1,7),c(2,7),c(3,7)]),true,'4 of a kind');
assert.equal(meld([c(0,7),c(0,7),c(1,7)]),false,'duplicate ranks invalid');
assert.equal(dead([c(0,1),c(0,2),c(0,3),c(1,13)]),10,'ace run + king deadwood');
assert.equal(dead([c(3,7),c(1,7),c(2,7),c(0,8),c(0,9),c(0,10)]),0,'overlapping melds correctly partitioned');
assert.equal(dead([c(0,1),c(1,1),c(2,1),c(3,13)]),10,'ace set');
const hand=[c(0,1),c(0,2),c(0,3),c(1,8),c(1,9),c(2,4),c(3,13),c(2,12)];
assert.equal(hand.length,8);
const discard=choice(hand,null);
assert.equal(discard.i,6,'computer prefers discarding unmatched king');
const forbidden=choice(hand,hand[6].id);
assert.notEqual(forbidden.i,6,'computer respects top-discard restriction');
const initial=JSON.parse(memory.get('jack-of-spades-quick-rummy-v2'));
assert.equal(initial.you.length,7);assert.equal(initial.ai.length,7);
assert.equal(initial.you.length+initial.ai.length+initial.stock.length+initial.discard.length,52);
assert.equal(new Set([...initial.you,...initial.ai,...initial.stock,...initial.discard].map(c=>c.id)).size,52);
assert.equal(nodes.get('hand').children.length,7,'seven visible human cards');
assert.equal(nodes.get('opponent').children.length,7,'seven computer backs');
console.log('Quick Rummy rules and initial game tests passed (14 assertions)');
