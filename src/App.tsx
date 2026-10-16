import { useMemo, useState } from 'react'
import { Bookmark, Check, Copy, Download, Moon, Search, Shuffle, Sparkles, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { exportPrompts, filterPrompts, nextPrompt, parseSaved, prompts, topics } from './library'
function stored(key: string) { try { return localStorage.getItem(key) } catch { return null } }
export default function App() {
  const [saved, setSaved] = useState(() => parseSaved(stored('stillroom-saved')))
  const [light, setLight] = useState(() => stored('stillroom-theme') === 'light')
  const [topic, setTopic] = useState('All'), [query, setQuery] = useState(''), [savedOnly, setSavedOnly] = useState(false)
  const [active, setActive] = useState(prompts[0].id), [status, setStatus] = useState('')
  const visible = useMemo(() => filterPrompts(query, topic, savedOnly, saved), [query, topic, savedOnly, saved])
  const current = visible.find(p => p.id === active) || visible[0]
  function toggle(id: string) {
    const next = saved.includes(id) ? saved.filter(x => x !== id) : [...saved, id]
    setSaved(next)
    try { localStorage.setItem('stillroom-saved', JSON.stringify(next)); setStatus(next.includes(id) ? 'Saved on this device.' : 'Removed from saved prompts.') } catch { setStatus('Storage is unavailable. Saved for this session only.') }
  }
  async function copy() { if (!current) return; try { await navigator.clipboard.writeText(`${current.text}\n\n${current.note}\nStillroom original prompt`); setStatus('Prompt copied.') } catch { setStatus('Copy unavailable. Select the prompt text to copy it.') } }
  function download() { const blob = new Blob([exportPrompts(saved)], {type:'text/plain;charset=utf-8'}); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'stillroom-saved.txt'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); setStatus('Saved prompts exported.') }
  function theme() { setLight(!light); try { localStorage.setItem('stillroom-theme', light ? 'dark' : 'light') } catch { setStatus('Theme applies to this session only.') } }
  return <div className={light ? 'app light' : 'app dark'}>
    <a className="skip" href="#collection">Skip to collection</a>
    <header><a className="brand" href="#"><span className="brand-icon"><Sparkles size={19}/></span>stillroom<span className="version">01</span></a><div className="header-tools"><span className="local-dot">A little space to think</span><Button variant="ghost" size="icon" aria-label={light ? 'Use dark theme' : 'Use light theme'} onClick={theme}>{light ? <Moon/> : <Sun/>}</Button></div></header>
    <main>
      <section className="intro"><span className="eyebrow">LESS NOISE. MORE ROOM.</span><h1>A thought worth<br/>staying with.</h1><p>Small prompts for a clearer day.<br className="mobile-break"/> Find one. Keep it. Come back to it.</p><span className="original-label"><span/>12 original prompts · no borrowed attributions</span></section>
      <div className="workspace" id="collection">
        <div className="toolbar"><div className="tabs" aria-label="Collection"><Button variant="ghost" aria-pressed={!savedOnly} onClick={() => setSavedOnly(false)}>Explore <span>{prompts.length}</span></Button><Button variant="ghost" aria-pressed={savedOnly} onClick={() => setSavedOnly(true)}><Bookmark size={14}/> Saved <span>{saved.length}</span></Button></div><label className="search"><Search size={16}/><input aria-label="Search prompts" value={query} onChange={e => setQuery(e.target.value)} placeholder="Find a thought..."/>{query && <button aria-label="Clear search" onClick={() => setQuery('')}>×</button>}</label></div>
        <div className="topics" aria-label="Filter by topic">{topics.map(t => <Button variant="ghost" key={t} aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</Button>)}</div>
        <div className="reading-grid"><section className="featured-frame" aria-label="Selected prompt">{current ? <article className="featured" key={current.id}><div className="card-top"><span className="eyebrow">{current.topic} / A MOMENT TO REFLECT</span><span className="quote-mark" aria-hidden="true">“</span></div><blockquote>{current.text}</blockquote><p className="reflection">{current.note}</p><div className="byline"><span className="mini-mark"><Sparkles size={14}/></span><div>Stillroom originals<small>Written for this collection, not a quotation</small></div></div><div className="card-actions"><Button onClick={() => { const p = nextPrompt(visible, current.id); if (p) setActive(p.id) }} disabled={visible.length < 2}><Shuffle/> Another thought</Button><div><Button variant="ghost" size="icon" aria-label="Copy prompt" onClick={copy}><Copy/></Button><Button variant="ghost" size="icon" aria-label={saved.includes(current.id) ? 'Unsave prompt' : 'Save prompt'} aria-pressed={saved.includes(current.id)} onClick={() => toggle(current.id)}>{saved.includes(current.id) ? <Check/> : <Bookmark/>}</Button></div></div></article> : <div className="featured empty"><Search size={28}/><h2>{savedOnly && !saved.length ? 'Your quiet collection starts here.' : 'No matching thoughts.'}</h2><p>{savedOnly && !saved.length ? 'Save a prompt from Explore to keep it here.' : 'Try another topic or a shorter search.'}</p><Button onClick={() => {setQuery('');setTopic('All');setSavedOnly(false)}}>Reset collection</Button></div>}</section>
          <aside className="side-note"><div className="note-icon"><Bookmark size={22}/></div><span className="eyebrow">MAKE IT YOURS</span><h2>Keep what<br/>stays with you.</h2><p>Your saved prompts live in this browser. No account, no sync, no inbox to check.</p><div className="save-count"><strong>{String(saved.length).padStart(2,'0')}</strong><span>of 12 thoughts<br/>in your collection</span></div><Button variant="outline" onClick={download} disabled={!saved.length}><Download/> Export saved</Button><small>Plain text. Yours to take with you.<br/>Clearing browser data removes saved items.</small></aside>
        </div>
        <div className="list-heading"><h2>{savedOnly ? 'Your saved thoughts' : 'The collection'}</h2><span>{visible.length} {visible.length === 1 ? 'prompt' : 'prompts'}</span></div><div className="prompt-grid">{visible.map((p,i) => <button className={`prompt-card ${current?.id === p.id ? 'selected' : ''}`} key={p.id} onClick={() => setActive(p.id)} aria-pressed={current?.id === p.id}><span className="card-number">{String(i+1).padStart(2,'0')}<span>{p.topic}</span></span><p>{p.text}</p><span className="card-bottom">{saved.includes(p.id) ? <><Bookmark size={13}/> Saved</> : 'Take a moment'}<span className="round-arrow" aria-hidden="true">↗</span></span></button>)}</div>
        <p role="status" className="status">{status}</p>
      </div>
    </main><div className="strip"/><footer><span>stillroom <small> / a small pause, on purpose.</small></span><div><a href="https://github.com/DipanNama/FileModifier">Source on GitHub</a><span>No trackers or external APIs in the app.</span></div></footer>
  </div>
}
