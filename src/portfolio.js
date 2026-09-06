import YAML from 'yaml';
import AdmZip from 'adm-zip';

const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function parseConfig(text, format='json') {
  let data;
  try { data = format === 'yaml' ? YAML.parse(text) : JSON.parse(text); }
  catch { throw new Error(`Arquivo ${format.toUpperCase()} inválido.`); }
  return validateConfig(data);
}

export function validateConfig(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('A configuração deve ser um objeto.');
  const errors = [];
  if (!data.profile?.name) errors.push('profile.name é obrigatório');
  if (!data.profile?.headline) errors.push('profile.headline é obrigatório');
  if (data.projects && !Array.isArray(data.projects)) errors.push('projects deve ser uma lista');
  if (data.skills && !Array.isArray(data.skills)) errors.push('skills deve ser uma lista');
  if (errors.length) throw new Error(errors.join('; '));
  return {
    theme: data.theme === 'light' ? 'light' : 'dark',
    profile: {
      name: String(data.profile.name), headline: String(data.profile.headline),
      bio: String(data.profile.bio ?? ''), location: String(data.profile.location ?? ''),
      email: String(data.profile.email ?? ''), avatar: String(data.profile.avatar ?? '')
    },
    skills: (data.skills ?? []).map(String).slice(0, 30),
    projects: (data.projects ?? []).slice(0, 30).map(p => ({
      name: String(p.name ?? 'Projeto'), description: String(p.description ?? ''),
      url: String(p.url ?? ''), stack: Array.isArray(p.stack) ? p.stack.map(String).slice(0, 12) : []
    })),
    links: Array.isArray(data.links) ? data.links.slice(0, 12).map(l => ({label:String(l.label ?? 'Link'), url:String(l.url ?? '')})) : []
  };
}

function safeUrl(value) {
  try { const u = new URL(value); return ['http:','https:','mailto:'].includes(u.protocol) ? u.toString() : '#'; }
  catch { return '#'; }
}

export function renderPortfolio(config) {
  const c = validateConfig(config);
  const projectCards = c.projects.map(p => `<article class="card"><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="chips">${p.stack.map(s=>`<span>${esc(s)}</span>`).join('')}</div>${p.url ? `<a href="${esc(safeUrl(p.url))}" target="_blank" rel="noreferrer">Ver projeto</a>`:''}</article>`).join('');
  return `<!doctype html><html lang="pt-BR" data-theme="${c.theme}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Portfólio de ${esc(c.profile.name)}"><title>${esc(c.profile.name)} | Portfólio</title><link rel="stylesheet" href="styles.css"></head><body><main><header><p class="eyebrow">PORTFÓLIO</p><h1>${esc(c.profile.name)}</h1><h2>${esc(c.profile.headline)}</h2><p>${esc(c.profile.bio)}</p><small>${esc(c.profile.location)}</small><nav>${c.links.map(l=>`<a href="${esc(safeUrl(l.url))}" target="_blank" rel="noreferrer">${esc(l.label)}</a>`).join('')}</nav></header><section><h2>Habilidades</h2><div class="chips">${c.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div></section><section><h2>Projetos</h2><div class="grid">${projectCards || '<p>Nenhum projeto informado.</p>'}</div></section>${c.profile.email ? `<footer><a href="mailto:${esc(c.profile.email)}">${esc(c.profile.email)}</a></footer>`:''}</main></body></html>`;
}

export function renderStyles() {
  return `:root{font-family:Inter,system-ui,sans-serif;--bg:#0b1020;--panel:#141b31;--text:#f7f8fc;--muted:#a9b2c8;--accent:#8b7cff}html[data-theme=light]{--bg:#f5f7fb;--panel:#fff;--text:#141824;--muted:#5d6577;--accent:#5b4ee8}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text)}main{width:min(1000px,calc(100% - 32px));margin:auto;padding:64px 0}header{padding:48px 0}.eyebrow{color:var(--accent);font-weight:800;letter-spacing:.15em}h1{font-size:clamp(3rem,9vw,6rem);line-height:.9;margin:.2em 0}h2{color:var(--muted)}p{line-height:1.7}nav{display:flex;gap:12px;flex-wrap:wrap;margin-top:22px}a{color:var(--accent);font-weight:700;text-decoration:none}section{margin:52px 0}.chips{display:flex;gap:8px;flex-wrap:wrap}.chips span{padding:7px 10px;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);border-radius:999px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}.card{background:var(--panel);padding:22px;border-radius:18px;border:1px solid color-mix(in srgb,var(--text) 10%,transparent)}footer{padding:32px 0;border-top:1px solid color-mix(in srgb,var(--text) 10%,transparent)}`;
}

export function buildZip(config) {
  const zip = new AdmZip();
  zip.addFile('index.html', Buffer.from(renderPortfolio(config)));
  zip.addFile('styles.css', Buffer.from(renderStyles()));
  zip.addFile('README.txt', Buffer.from('Portfólio gerado pelo Portfolio Generator. Publique estes arquivos em qualquer hospedagem estática.'));
  return zip.toBuffer();
}
