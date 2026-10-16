import {test} from 'node:test'
import assert from 'node:assert/strict'
import {prompts,filterPrompts,nextPrompt,parseSaved,exportPrompts} from '../src/library.ts'
test('unique stable identifiers',()=>assert.equal(new Set(prompts.map(p=>p.id)).size,12))
test('case insensitive search and trim',()=>assert.equal(filterPrompts('  ATTENTION ', 'All',false,[]).length,2))
test('topic only',()=>assert.equal(filterPrompts('','Rest',false,[]).length,3))
test('saved scope',()=>assert.deepEqual(filterPrompts('','All',true,['work-1']).map(p=>p.id),['work-1']))
test('combined filters',()=>assert.equal(filterPrompts('step','Work',true,['work-1']).length,1))
test('empty results',()=>assert.equal(filterPrompts('<script>','All',false,[]).length,0))
test('next never repeats in a larger pool',()=>{for(let i=0;i<100;i++)assert.notEqual(nextPrompt(prompts,prompts[0].id)?.id,prompts[0].id)})
test('single item remains available',()=>assert.equal(nextPrompt([prompts[0]],prompts[0].id)?.id,prompts[0].id))
test('empty pool safe',()=>assert.equal(nextPrompt([],''),undefined))
test('malformed storage safe',()=>{for(const s of [null,'oops','{}','42'])assert.deepEqual(parseSaved(s),[])})
test('storage dedupes and drops stale ids',()=>assert.deepEqual(parseSaved('["work-1","work-1",99,"unknown"]'),['work-1']))
test('export is plain text, only saved items',()=>{const text=exportPrompts(['work-1']);assert.ok(text.includes(prompts[1].text));assert.ok(text.includes('original prompt'));assert.ok(!text.includes(prompts[0].text));assert.equal(exportPrompts([]),'')})
