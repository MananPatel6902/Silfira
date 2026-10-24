import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CircleDollarSign, FileText, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Pencil, Plus, Search, Settings, Trash2, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { mapProperty } from '../lib/siteData';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteDataContext';

const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
const nav = [['overview', 'Overview', LayoutDashboard], ['properties', 'Properties', Building2], ['clients', 'Clients', Users], ['leads', 'Leads', Users], ['reviews', 'Reviews', MessageSquareQuote], ['partners', 'Partners', Settings], ['billing', 'Billing', FileText]];

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const { refresh } = useSiteData();
  const [tab, setTab] = useState('overview');
  const [menu, setMenu] = useState(false);
  const [state, setState] = useState({ properties: [], clients: [], leads: [], reviews: [], developers: [], invoices: [] });
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const results = await Promise.all([
      supabase.from('properties').select('*, developer:developers(*), manager:profiles!properties_managed_by_fkey(*), property_assets(*), property_features(*)').order('created_at', { ascending: false }),
      supabase.from('leads').select('*, property:properties(title)').order('created_at', { ascending: false }),
      supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('developers').select('*, developer_assets(*)').order('sort_order'),
      supabase.from('invoices').select('*, client:clients(name), invoice_items(*), payments(*)').order('created_at', { ascending: false }),
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
    ]);
    const error = results.find(result => result.error)?.error;
    if (error) setNotice(error.message);
    else setState({
      clients: results[5].data || [], properties: (results[0].data || []).map(mapProperty), leads: results[1].data || [], reviews: results[2].data || [],
      developers: results[3].data || [], invoices: (results[4].data || []).map(invoice => {
        const total = (invoice.invoice_items || []).reduce((sum, item) => sum + Number(item.quantity) * Number(item.unit_amount), 0);
        const received = (invoice.payments || []).reduce((sum, payment) => sum + Number(payment.amount), 0);
        return { ...invoice, total, balance_due: Math.max(0, total - received) };
      }),
    });
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);
  const done = async message => { await load(); await refresh(); setNotice(message); };
  const title = { overview: `Welcome, ${profile?.full_name || 'Admin'}`, properties: 'Property manager', clients: 'Clients', leads: 'Lead enquiries', reviews: 'Client reviews', partners: 'Developer partners', billing: 'Billing & invoices' }[tab];

  return <div className="min-h-screen bg-[#f7f4f4] text-[#34131b]">
    <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#4b0617] p-6 text-white transition-transform lg:translate-x-0 ${menu ? 'translate-x-0' : '-translate-x-full'}`}>
      <button onClick={() => setMenu(false)} className="absolute right-5 top-5 lg:hidden"><X /></button>
      <div className="mb-12 flex items-center gap-3"><img src="/images/Silfira_logo.svg" alt="" className="h-12 w-12 brightness-0 invert"/><div><strong className="block font-serif text-xl tracking-[.15em]">SILFIRA</strong><span className="text-[8px] uppercase tracking-[.3em] text-[#f0c5ce]">Admin studio</span></div></div>
      <nav className="space-y-2">{nav.map(([id, label, Icon]) => <button key={id} onClick={() => { setTab(id); setMenu(false); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm ${tab === id ? 'bg-white text-[#4b0617]' : 'text-white/65 hover:bg-white/10'}`}><Icon size={18}/>{label}{id === 'leads' && <span className="ml-auto rounded-full bg-[#a63852] px-2 py-0.5 text-[9px] text-white">{state.leads.filter(x => x.status === 'new').length}</span>}</button>)}</nav>
      <div className="absolute bottom-6 left-6 right-6 border-t border-white/15 pt-5"><strong className="block text-xs">{profile?.full_name}</strong><span className="text-[10px] text-white/45">{profile?.role}</span><button onClick={signOut} className="mt-5 flex items-center gap-3 text-xs text-white/60"><LogOut size={15}/>Sign out</button></div>
    </aside>
    <main className="min-h-screen lg:ml-72"><header className="flex h-20 items-center gap-4 border-b border-[#4b0617]/10 bg-white px-5 sm:px-8"><button onClick={() => setMenu(true)} className="lg:hidden"><Menu/></button><h1 className="font-serif text-2xl sm:text-3xl">{title}</h1><a href="/" className="ml-auto rounded-full border px-4 py-2 text-xs">View website</a></header>
      <div className="p-5 sm:p-8 lg:p-10">{notice && <button onClick={() => setNotice('')} className="mb-5 w-full rounded-xl bg-[#f2dce1] px-4 py-3 text-left text-sm text-[#6f1730]">{notice}</button>}{loading ? <p>Loading your data…</p> : <>
        {tab === 'overview' && <Overview state={state} setTab={setTab}/>} 
        {tab === 'properties' && <Properties items={state.properties} developers={state.developers} onDone={done}/>} 
        {tab === 'clients' && <Clients items={state.clients} onDone={done}/>}
        {tab === 'leads' && <Leads items={state.leads} onDone={done}/>} 
        {tab === 'reviews' && <Reviews items={state.reviews} onDone={done}/>} 
        {tab === 'partners' && <Partners items={state.developers} onDone={done}/>} 
        {tab === 'billing' && <Billing items={state.invoices} profile={profile} onDone={done}/>} 
      </>}</div>
    </main>
  </div>;
}

function Overview({ state, setTab }) {
  const value = state.properties.reduce((sum, p) => sum + Number(p.price || 0), 0);
  const cards = [['Properties', state.properties.length, 'Manage listings', Building2, 'properties'], ['Open leads', state.leads.filter(x => !['won', 'lost'].includes(x.status)).length, 'Follow up now', Users, 'leads'], ['Portfolio value', money(value), 'Published and draft', CircleDollarSign, 'properties'], ['Invoices', state.invoices.length, 'Payments & receipts', FileText, 'billing']];
  return <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, number, note, Icon, target]) => <button key={label} onClick={() => setTab(target)} className="rounded-2xl border bg-white p-5 text-left shadow-sm"><div className="mb-7 flex justify-between"><span className="text-xs text-[#8f777d]">{label}</span><Icon size={18} className="text-[#9d3a52]"/></div><strong className="font-serif text-3xl font-medium">{number}</strong><p className="mt-1 text-[10px] text-[#9d3a52]">{note}</p></button>)}</motion.div>;
}

function Properties({ items, developers, onDone }) {
  const [query, setQuery] = useState(''); const [editing, setEditing] = useState(null);
  const shown = items.filter(p => `${p.title} ${p.location}`.toLowerCase().includes(query.toLowerCase()));
  const remove = async p => {
    if (!window.confirm(`Delete ${p.title}?`)) return;
    const assets = await supabase.from('property_assets').select('storage_path').eq('property_id', p.id);
    if (assets.error) return onDone(assets.error.message);
    const stored = (assets.data || []).map(x => x.storage_path).filter(x => x && !x.startsWith('/') && !x.startsWith('./'));
    if (stored.length) { const result = await supabase.storage.from('property-assets').remove(stored); if (result.error) return onDone(result.error.message); }
    const { error } = await supabase.from('properties').delete().eq('id', p.id);
    error ? onDone(error.message) : onDone('Property and its uploaded files were deleted.');
  };
  return <><Toolbar query={query} setQuery={setQuery} action={() => setEditing({})} label="Add property"/><Table headings={['Property', 'Location', 'Configuration', 'Price', 'Status', 'Actions']} rows={shown.map(p => [<div className="flex items-center gap-3"><img src={p.image} alt="" className="h-12 w-16 rounded-lg object-cover"/><strong>{p.title}</strong></div>, p.location, `${p.bedroomsMin || '—'} BHK · ${p.areaMin || '—'} ft²`, money(p.price), p.listingStatus, <div className="flex gap-2"><button aria-label={`Edit ${p.title}`} onClick={() => setEditing(p)} className="rounded-lg border p-2"><Pencil size={15}/></button><button aria-label={`Delete ${p.title}`} onClick={() => remove(p)} className="rounded-lg border p-2 text-red-700"><Trash2 size={15}/></button></div>])}/>{editing && <PropertyModal value={editing} developers={developers} onClose={() => setEditing(null)} onDone={message => { setEditing(null); onDone(message); }}/>}</>;
}

function PropertyModal({ value, developers, onClose, onDone }) {
  const [form, setForm] = useState({ title: '', slug: '', locationKey: 'sargasan', location: 'Sargasan, Gandhinagar', type: 'Apartment', priceMin: '', priceMax: '', bedroomsMin: '', bedroomsMax: '', bathrooms: '', areaMin: '', areaMax: '', description: '', listingStatus: 'draft', developerId: '', featured: false, ...value });
  const [image, setImage] = useState(null); const [saving, setSaving] = useState(false);
  const save = async e => { e.preventDefault(); if (image?.size > 15 * 1024 * 1024) { onDone('Please choose a property image smaller than 15 MB.'); return; } setSaving(true); const payload = { title: form.title, slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), location_key: form.locationKey, location_label: form.location, property_type: form.type, price_min: Number(form.priceMin) || null, price_max: Number(form.priceMax || form.priceMin) || null, bedrooms_min: Number(form.bedroomsMin) || null, bedrooms_max: Number(form.bedroomsMax || form.bedroomsMin) || null, bathrooms: Number(form.bathrooms) || null, area_min_sqft: Number(form.areaMin) || null, area_max_sqft: Number(form.areaMax || form.areaMin) || null, description: form.description, listing_status: form.listingStatus, developer_id: form.developerId || null, is_featured: form.featured };
    const result = form.id ? await supabase.from('properties').update(payload).eq('id', form.id).select('id').single() : await supabase.from('properties').insert(payload).select('id').single();
    if (result.error) { setSaving(false); onDone(result.error.message); return; }
    if (image) { const ext = image.name.split('.').pop(); const path = `${result.data.id}/${crypto.randomUUID()}.${ext}`; const upload = await supabase.storage.from('property-assets').upload(path, image); if (upload.error) { setSaving(false); onDone(upload.error.message); return; } const asset = await supabase.from('property_assets').insert({ property_id: result.data.id, asset_type: 'landscape_image', storage_path: path, file_name: image.name, mime_type: image.type, alt_text: form.title, is_cover: true }); if (asset.error) { await supabase.storage.from('property-assets').remove([path]); setSaving(false); onDone(asset.error.message); return; } }
    setSaving(false); onDone('Property saved to Supabase.'); };
  return <Modal title={form.id ? 'Edit property' : 'Add property'} onClose={onClose}><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><Field label="Title" value={form.title} onChange={v => setForm({ ...form, title: v })}/><Field label="Slug" required={false} value={form.slug} onChange={v => setForm({ ...form, slug: v })}/><Select label="Location" value={form.locationKey} options={['sargasan','kudasan','raysan','gift_city','pdeu_palm_road']} onChange={v => setForm({ ...form, locationKey: v, location: `${v.replaceAll('_', ' ')}, Gandhinagar` })}/><Field label="Display location" value={form.location} onChange={v => setForm({ ...form, location: v })}/><Field label="Minimum price (₹)" type="number" value={form.priceMin || ''} onChange={v => setForm({ ...form, priceMin: v })}/><Field label="Maximum price (₹)" required={false} type="number" value={form.priceMax || ''} onChange={v => setForm({ ...form, priceMax: v })}/><Field label="Minimum BHK" type="number" value={form.bedroomsMin || ''} onChange={v => setForm({ ...form, bedroomsMin: v })}/><Field label="Maximum BHK" required={false} type="number" value={form.bedroomsMax || ''} onChange={v => setForm({ ...form, bedroomsMax: v })}/><Field label="Bathrooms" type="number" value={form.bathrooms || ''} onChange={v => setForm({ ...form, bathrooms: v })}/><Field label="Minimum area (sq ft)" type="number" value={form.areaMin || ''} onChange={v => setForm({ ...form, areaMin: v })}/><Field label="Maximum area (sq ft)" required={false} type="number" value={form.areaMax || ''} onChange={v => setForm({ ...form, areaMax: v })}/><Select label="Developer" value={form.developerId || ''} options={developers.map(x => ({ value: x.id, label: x.name }))} onChange={v => setForm({ ...form, developerId: v })}/><Select label="Status" value={form.listingStatus} options={['draft','published','sold','archived']} onChange={v => setForm({ ...form, listingStatus: v })}/><label className="sm:col-span-2"><span className="label">Description</span><textarea value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="input min-h-28"/></label><label className="sm:col-span-2"><span className="label">Main image</span><input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="input"/></label><button disabled={saving} className="sm:col-span-2 rounded-xl bg-[#4b0617] px-6 py-3 text-xs font-bold text-white">{saving ? 'Saving…' : 'Save property'}</button></form></Modal>;
}

function Clients({ items, onDone }) {
  const [query, setQuery] = useState(''); const [adding, setAdding] = useState(false);
  const shown = items.filter(x => `${x.name} ${x.phone} ${x.email || ''}`.toLowerCase().includes(query.toLowerCase()));
  return <><Toolbar query={query} setQuery={setQuery} action={() => setAdding(true)} label="Add client"/><Table headings={['Name', 'Phone', 'Email', 'Billing address']} rows={shown.map(x => [x.name, x.phone, x.email || '—', x.billing_address || '—'])}/>{adding && <RecordModal kind="client" onClose={() => setAdding(false)} onDone={message => { setAdding(false); onDone(message); }}/>}</>;
}

function RecordModal({ kind, onClose, onDone }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '', billing_address: '', subject: '', message: '', role: '', content: '', rating: '5', is_approved: false });
  const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  const field = (key, label, required = false, type = 'text') => <Field label={label} required={required} type={type} value={form[key]} onChange={value => setForm({ ...form, [key]: value })}/>;
  const save = async e => {
    e.preventDefault(); setError('');
    if (kind === 'lead' && !form.phone.trim() && !form.email.trim()) { setError('Enter a phone number or email address.'); return; }
    setSaving(true);
    try {
      const payload = kind === 'client' ? { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || null, billing_address: form.billing_address.trim() || null }
        : kind === 'lead' ? { name: form.name.trim(), phone: form.phone.trim() || null, email: form.email.trim() || null, subject: form.subject.trim() || null, message: form.message.trim() || null, inquiry_type: 'contact', source: 'admin', status: 'new' }
        : { name: form.name.trim(), role: form.role.trim() || null, content: form.content.trim(), rating: Number(form.rating), is_approved: form.is_approved };
      const result = await supabase.from({ client: 'clients', lead: 'leads', review: 'testimonials' }[kind]).insert(payload);
      if (result.error) throw result.error;
      onDone(`${kind[0].toUpperCase() + kind.slice(1)} added.`);
    } catch (err) { setError(err.message || 'Unable to save. Please try again.'); } finally { setSaving(false); }
  };
  return <Modal title={`Add ${kind}`} onClose={onClose}><form onSubmit={save} className="space-y-4">{error && <p role="alert" className="text-sm text-red-700">{error}</p>}{field('name', 'Name', true)}{kind !== 'review' && <>{field('phone', 'Phone', kind === 'client', 'tel')}{field('email', 'Email', false, 'email')}</>}{kind === 'client' && field('billing_address', 'Billing address')}{kind === 'lead' && <>{field('subject', 'Interest / subject')}{field('message', 'Message')}</>}{kind === 'review' && <>{field('role', 'Role / project')}<label className="block"><span className="label">Review</span><textarea required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="input min-h-28"/></label><Select label="Rating" value={form.rating} options={['5', '4', '3', '2', '1']} onChange={rating => setForm({ ...form, rating })}/><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.is_approved} onChange={e => setForm({ ...form, is_approved: e.target.checked })}/>Publish on website</label></>}<button disabled={saving} className="w-full rounded-xl bg-[#4b0617] py-3 text-xs font-bold text-white">{saving ? 'Saving…' : `Save ${kind}`}</button></form></Modal>;
}

function Leads({ items, onDone }) {
  const [query, setQuery] = useState(''); const [adding, setAdding] = useState(false);
  const shown = items.filter(x => `${x.name} ${x.phone || ''} ${x.email || ''} ${x.subject || ''}`.toLowerCase().includes(query.toLowerCase()));
  const update = async (id, status) => { const { error } = await supabase.from('leads').update({ status }).eq('id', id); onDone(error ? error.message : 'Lead updated.'); };
  return <><Toolbar query={query} setQuery={setQuery} action={() => setAdding(true)} label="Add lead"/><Table headings={['Client', 'Interest', 'Source', 'Received', 'Status']} rows={shown.map(x => [<div><strong className="block">{x.name}</strong><span>{x.phone || x.email}</span></div>, x.property?.title || x.subject || x.inquiry_type, x.source, new Date(x.created_at).toLocaleDateString('en-IN'), <select value={x.status} onChange={e => update(x.id, e.target.value)} className="rounded-lg border px-3 py-2"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="visit_booked">Visit booked</option><option value="won">Won</option><option value="lost">Lost</option></select>])}/>{adding && <RecordModal kind="lead" onClose={() => setAdding(false)} onDone={message => { setAdding(false); onDone(message); }}/>}</>;
}

function Reviews({ items, onDone }) {
  const [query, setQuery] = useState(''); const [adding, setAdding] = useState(false);
  const shown = items.filter(x => `${x.name} ${x.content}`.toLowerCase().includes(query.toLowerCase()));
  const toggle = async item => { const { error } = await supabase.from('testimonials').update({ is_approved: !item.is_approved }).eq('id', item.id); onDone(error ? error.message : 'Review updated.'); };
  return <><Toolbar query={query} setQuery={setQuery} action={() => setAdding(true)} label="Add review"/><div className="grid gap-4 lg:grid-cols-2">{shown.map(item => <article key={item.id} className="rounded-2xl bg-white p-6"><div className="mb-5 flex justify-between"><div><h3 className="font-serif text-xl">{item.name}</h3><span className="text-xs text-[#8f777d]">{item.role}</span></div><button onClick={() => toggle(item)} className="rounded-full bg-[#f2dce1] px-3 py-1 text-[9px] font-bold">{item.is_approved ? 'Published' : 'Hidden'}</button></div><p className="text-sm leading-6">“{item.content}”</p></article>)}</div>{shown.length === 0 && <p className="text-sm">No reviews found.</p>}{adding && <RecordModal kind="review" onClose={() => setAdding(false)} onDone={message => { setAdding(false); onDone(message); }}/>}</>;
}

function Partners({ items, onDone }) {
  const [adding, setAdding] = useState(false);
  return <><div className="mb-6 flex justify-end"><button onClick={() => setAdding(true)} className="flex items-center gap-2 rounded-xl bg-[#4b0617] px-5 py-3 text-xs font-bold text-white"><Plus size={16}/>Add developer</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map(item => { const logo = item.developer_assets?.find(x => x.asset_type === 'logo'); const url = logo?.storage_path?.startsWith('/') ? logo.storage_path : logo?.storage_path ? supabase.storage.from('developer-assets').getPublicUrl(logo.storage_path).data.publicUrl : ''; return <div key={item.id} className="flex h-40 items-center justify-center rounded-2xl border bg-white p-6">{url ? <img src={url} alt={item.name} className="max-h-20 max-w-[140px] object-contain"/> : item.name}</div>; })}</div>{adding && <PartnerModal onClose={() => setAdding(false)} onDone={message => { setAdding(false); onDone(message); }}/>}</>;
}

function PartnerModal({ onClose, onDone }) { const [name, setName] = useState(''); const [logo, setLogo] = useState(null); const save = async e => { e.preventDefault(); if (logo?.size > 10 * 1024 * 1024) return onDone('Please choose a logo smaller than 10 MB.'); const developer = await supabase.from('developers').insert({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), is_featured: true }).select('id').single(); if (developer.error) return onDone(developer.error.message); const path = `${developer.data.id}/${crypto.randomUUID()}.${logo.name.split('.').pop()}`; const upload = await supabase.storage.from('developer-assets').upload(path, logo); if (upload.error) { await supabase.from('developers').delete().eq('id', developer.data.id); return onDone(upload.error.message); } const asset = await supabase.from('developer_assets').insert({ developer_id: developer.data.id, asset_type: 'logo', storage_path: path, file_name: logo.name, mime_type: logo.type, alt_text: name }); if (asset.error) { await supabase.storage.from('developer-assets').remove([path]); await supabase.from('developers').delete().eq('id', developer.data.id); return onDone(asset.error.message); } onDone('Developer added.'); }; return <Modal title="Add developer" onClose={onClose}><form onSubmit={save} className="space-y-4"><Field label="Developer name" value={name} onChange={setName}/><label><span className="label">Logo</span><input required type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} className="input"/></label><button className="w-full rounded-xl bg-[#4b0617] py-3 text-xs font-bold text-white">Save developer</button></form></Modal>; }

function Billing({ items, profile, onDone }) {
  const [query, setQuery] = useState(''); const [viewing, setViewing] = useState(null);
  const shown = items.filter(x => `${x.invoice_number} ${x.billing_name} ${x.client?.name || ''} ${x.notes || ''}`.toLowerCase().includes(query.toLowerCase()));
  const [form, setForm] = useState({ client: '', phone: '', project: '', amount: '', received: '', mode: 'UPI' });
  const save = async e => { e.preventDefault(); const total = Number(form.amount); const received = Number(form.received) || 0; if (received > total) return onDone('Amount received cannot be greater than the invoice total.'); const client = await supabase.from('clients').insert({ name: form.client, phone: form.phone || 'Not provided' }).select('id').single(); if (client.error) return onDone(client.error.message); const invoice = await supabase.from('invoices').insert({ invoice_number: `SLF-${Date.now().toString(36).toUpperCase()}`, client_id: client.data.id, created_by: profile.id, billing_name: form.client, billing_phone: form.phone || 'Not provided', notes: form.project || null, status: received >= total ? 'paid' : received > 0 ? 'partially_paid' : 'issued' }).select('id').single(); if (invoice.error) { await supabase.from('clients').delete().eq('id', client.data.id); return onDone(invoice.error.message); } const item = await supabase.from('invoice_items').insert({ invoice_id: invoice.data.id, particulars: form.project || 'Property services', unit_amount: total, sort_order: 0 }); if (item.error) { await supabase.from('invoices').delete().eq('id', invoice.data.id); await supabase.from('clients').delete().eq('id', client.data.id); return onDone(item.error.message); } if (received > 0) { const payment = await supabase.from('payments').insert({ invoice_id: invoice.data.id, amount: received, payment_mode: form.mode.toLowerCase().replace(' ', '_'), recorded_by: profile.id }); if (payment.error) { await supabase.from('invoices').delete().eq('id', invoice.data.id); await supabase.from('clients').delete().eq('id', client.data.id); return onDone(payment.error.message); } } setForm({ client: '', phone: '', project: '', amount: '', received: '', mode: 'UPI' }); onDone('Invoice saved.'); };
  return <div className="grid items-start gap-6 xl:grid-cols-[.8fr_1.2fr]"><form onSubmit={save} className="space-y-4 rounded-2xl bg-white p-6"><h2 className="font-serif text-2xl">New invoice</h2><Field label="Client" value={form.client} onChange={v => setForm({ ...form, client: v })}/><Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })}/><Field label="Project" value={form.project} onChange={v => setForm({ ...form, project: v })}/><Field label="Total amount" type="number" value={form.amount} onChange={v => setForm({ ...form, amount: v })}/><Field label="Amount received" type="number" value={form.received} onChange={v => setForm({ ...form, received: v })}/><Select label="Payment mode" value={form.mode} options={['Cash','UPI','Bank Transfer','Cheque']} onChange={v => setForm({ ...form, mode: v })}/><button className="w-full rounded-xl bg-[#4b0617] py-3 text-xs font-bold text-white">Save invoice</button></form><section className="min-w-0 space-y-4"><h2 className="font-serif text-2xl">Past bills</h2><input aria-label="Search past bills" placeholder="Search invoice number, client or project" value={query} onChange={e => setQuery(e.target.value)} className="input"/><Table headings={['Invoice', 'Date', 'Client', 'Total', 'Balance', 'Status', 'Actions']} rows={shown.map(x => [x.invoice_number, x.issue_date, x.billing_name || x.client?.name || '—', money(x.total), money(x.balance_due), x.status.replaceAll('_', ' '), <button onClick={() => setViewing(x)} className="rounded-lg border px-3 py-2">View bill</button>])}/></section>{viewing && <Modal title={viewing.invoice_number} onClose={() => setViewing(null)}><div className="space-y-5 text-sm"><p><strong>{viewing.billing_name}</strong><br/>{viewing.billing_phone}<br/>{viewing.billing_address}</p><p>Issued: {viewing.issue_date} · Due: {viewing.due_date || '—'}<br/>Status: {viewing.status.replaceAll('_', ' ')}</p><Table headings={['Particulars', 'Quantity', 'Rate', 'Amount']} rows={[...(viewing.invoice_items || [])].sort((a, b) => a.sort_order - b.sort_order).map(item => [<div>{item.particulars}<p>{item.details}</p></div>, item.quantity, money(item.unit_amount), money(Number(item.quantity) * Number(item.unit_amount))])}/><p className="font-bold">Total: {money(viewing.total)} · Received: {money(viewing.total - viewing.balance_due)} · Balance: {money(viewing.balance_due)}</p><h3 className="font-serif text-xl">Payment history</h3>{(viewing.payments || []).length ? viewing.payments.map(payment => <p key={payment.id}>{new Date(payment.paid_at).toLocaleDateString('en-IN')} · {payment.payment_mode.replaceAll('_', ' ')} · {money(payment.amount)}{payment.reference_number && ` · ${payment.reference_number}`}</p>) : <p>No payments recorded.</p>}{viewing.notes && <p>{viewing.notes}</p>}</div></Modal>}</div>;

}

function Toolbar({ query, setQuery, action, label }) { return <div className="mb-6 flex flex-col gap-4 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2" size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="input pl-11"/></div><button onClick={action} className="flex items-center justify-center gap-2 rounded-xl bg-[#4b0617] px-5 py-3 text-xs font-bold text-white"><Plus size={17}/>{label}</button></div>; }
function Table({ headings, rows }) { return <div className="overflow-hidden rounded-2xl border bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-[#fcf9fa] text-[9px] uppercase tracking-[.15em] text-[#8f777d]"><tr>{headings.map(x => <th key={x} className="px-5 py-4">{x}</th>)}</tr></thead><tbody>{rows.length === 0 && <tr><td colSpan={headings.length} className="px-5 py-8 text-sm text-[#8f777d]">No records found.</td></tr>}{rows.map((row, i) => <tr key={i} className="border-t">{row.map((cell, j) => <td key={j} className="px-5 py-4 text-xs">{cell}</td>)}</tr>)}</tbody></table></div></div>; }
function Modal({ title, onClose, children }) { return <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 sm:items-center sm:p-5"><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl sm:p-8"><div className="mb-7 flex justify-between"><h2 className="font-serif text-3xl">{title}</h2><button onClick={onClose}><X/></button></div>{children}</div></div>; }
function Field({ label, value, onChange, type = 'text', required = label !== 'Phone' }) { return <label className="block"><span className="label">{label}</span><input required={required} type={type} value={value} onChange={e => onChange(e.target.value)} className="input"/></label>; }
function Select({ label, value, onChange, options }) { return <label className="block"><span className="label">{label}</span><select value={value} onChange={e => onChange(e.target.value)} className="input"><option value="">Select</option>{options.map(item => { const option = typeof item === 'string' ? { value: item, label: item } : item; return <option key={option.value} value={option.value}>{option.label}</option>; })}</select></label>; }
