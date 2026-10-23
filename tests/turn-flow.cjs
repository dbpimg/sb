const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8'),source=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(source);
const nodes=new Map(),pending=new Map();let timer=0;
function node(id=''){const n={id,children:[],style:{setProperty(){}},classList:{add(){}},disabled:false,
replaceWith(v){v.id=id;nodes.set(id,v)},replaceChildren(...a){this.children=a},setAttribute(k,v){this[k]=v},onclick:null};
if(id)nodes.set(id,n);return n}
for(const id of ['hand','opponent','stock','discard','drop','knock','next','restart','score','message','dw','count','end','title','detail','hint','sort-suit','sort-rank','sort-meld','sound','table-melds'])node(id);
const store=new Map(),sandbox={document:{getElementById:id=>nodes.get(id),createElement:()=>node()},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},
setTimeout(fn,delay){const id=++timer;pending.set(id,{fn,delay});return id},clearTimeout(id){pending.delete(id)},Math,console};
vm.createContext(sandbox);
vm.runInContext(source.replace(/\}\)\(\);\s*$/,';globalThis.__qa={state:()=>g,draw,drop,ai,finish};})();'),sandbox);
const q=sandbox.__qa,save=()=>JSON.parse(store.get('jack-of-spades-quick-rummy-v2'));
assert.equal(q.state().phase,'draw');
nodes.get('stock').onclick();
assert.equal(q.state().phase,'drop','draw should allow discard selection');
const picked=q.state().you[0].id;
nodes.get('hand').children.find(n=>n['aria-label']===undefined)?.onclick?.();
assert.equal(q.state().you.length,8);
q.state().selected=picked;
nodes.get('drop').onclick();
assert.equal(q.state().phase,'knock','discard starts automatic-turn window');
assert.ok([...pending.values()].some(t=>t.delay===400||t.delay===6000),'computer turn queued');
const first=[...pending.entries()][0];pending.delete(first[0]);first[1].fn();
assert.equal(q.state().phase,'ai','scheduled handoff starts computer');
const second=[...pending.entries()][0];pending.delete(second[0]);second[1].fn();
assert.ok(['draw','over'].includes(q.state().phase),'computer advances round');
assert.equal(q.state().you.length,7);assert.equal(q.state().ai.length,7);
const st=save();assert.equal(st.phase,q.state().phase,'turn progress saved');
nodes.get('restart').onclick();assert.equal(q.state().round,1,'new match restarts rounds');
assert.deepEqual(Array.from(q.state().score),[0,0],'new match resets score');
assert.equal(q.state().you.length,7);
console.log('Turn-flow QA passed: draw, discard, automatic AI, persistence, restart');
