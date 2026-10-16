export const topics = ['All', 'Focus', 'Work', 'Rest', 'Perspective'] as const
export type Prompt = { id: string; topic: string; text: string; note: string }
export const prompts: Prompt[] = [
  {id:'focus-1',topic:'Focus',text:'Make room for the one thing that deserves your attention.',note:'What would you remove from today to give that thing more space?'},
  {id:'work-1',topic:'Work',text:'A small finished step can teach you more than a perfect plan.',note:'Choose a step small enough to finish before your next break.'},
  {id:'rest-1',topic:'Rest',text:'You can pause without having to earn the pause.',note:'Look away from the screen. Notice something that is not asking anything of you.'},
  {id:'perspective-1',topic:'Perspective',text:'A difficult moment is a moment, not a whole identity.',note:'Describe what happened without making it a statement about who you are.'},
  {id:'focus-2',topic:'Focus',text:'An open tab is not always an open possibility.',note:'Which unfinished thing can you close, park or deliberately choose?'},
  {id:'work-2',topic:'Work',text:'Leave a clear next step for the person you will be tomorrow.',note:'Write one sentence that makes restarting easier.'},
  {id:'rest-2',topic:'Rest',text:'Not every quiet interval needs to become useful.',note:'Let the next minute be unmeasured.'},
  {id:'perspective-2',topic:'Perspective',text:'Try a smaller question when the big one stops you moving.',note:'What do you need to know next, rather than all at once?'},
  {id:'focus-3',topic:'Focus',text:'Attention grows where you stop asking it to be everywhere.',note:'Choose one place to begin. Put the other choices somewhere safe.'},
  {id:'work-3',topic:'Work',text:'Progress can look like making the problem easier to explain.',note:'Tell the story of the problem in two plain sentences.'},
  {id:'rest-3',topic:'Rest',text:'A slower pace can still be a chosen direction.',note:'What pace would let you return to this tomorrow?'},
  {id:'perspective-3',topic:'Perspective',text:'Keep a little space between a first thought and a final answer.',note:'What else might be true here?'}
]
export function filterPrompts(query: string, topic: string, savedOnly: boolean, ids: string[]) {
  const q = query.trim().toLowerCase()
  return prompts.filter(p => (topic === 'All' || p.topic === topic) && (!savedOnly || ids.includes(p.id)) && `${p.text} ${p.note} ${p.topic}`.toLowerCase().includes(q))
}
export function nextPrompt(items: Prompt[], current: string, random = Math.random): Prompt | undefined {
  const options = items.filter(p => p.id !== current)
  if (!options.length) return items[0]
  return options[Math.min(options.length - 1, Math.max(0, Math.floor(random() * options.length)))]
}
export function parseSaved(raw: string | null): string[] {
  try { const value: unknown = JSON.parse(raw || '[]'); return Array.isArray(value) ? [...new Set(value.filter((x): x is string => typeof x === 'string' && prompts.some(p => p.id === x)))] : [] } catch { return [] }
}
export function exportPrompts(ids: string[]) { return prompts.filter(p => ids.includes(p.id)).map(p => `${p.text}\n\n${p.note}\n[${p.topic} | Stillroom original prompt]`).join('\n\n---\n\n') }
