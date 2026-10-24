import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CircleDollarSign, FileText, LayoutDashboard, LogOut, Menu, MessageSquareQuote, Pencil, Plus, Search, Settings, Trash2, Users, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { mapProperty } from '../lib/siteData';
import { useAuth } from '../context/AuthContext';
import { useSiteData } from '../context/SiteDataContext';

const money = value => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0);
const nav = [['overview', 'Overview', LayoutDashboard], ['properties', 'Properties', Building2], ['leads', 'Leads', Users], ['reviews', 'Reviews', MessageSquareQuote], ['partners', 'Partners', Settings], ['billing', 'Billing', FileText]];

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const { refresh } = useSiteData();
  const [tab, setTab] = useState('overview');
  const [menu, setMenu] = useState(false);
  const [state, setState] = useState({ properties: [], leads: [], reviews: [], developers: [], invoices: [] });
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
    ]);
    const error = results.find(result => result.error)?.error;
    if (error) setNotice(error.message);
    else setState({
      properties: (results[0].data || []).map(mapProperty), leads: results[1].data || [], reviews: results[2].data || [],
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
  const title = { overview: `Welcome, ${profile?.full_name || 'Admin'}`, properties: 'Property manager', leads: 'Lead enquiries', reviews: 'Client reviews', partners: 'Developer partners', billing: 'Billing & invoices' }[tab];

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

function Leads({ items, onDone }) {
  const update = async (id, status) => { const { error } = await supabase.from('leads').update({ status }).eq('id', id); onDone(error ? error.message : 'Lead updated.'); };
  return <Table headings={['Client', 'Interest', 'Source', 'Received', 'Status']} rows={items.map(x => [<div><strong className="block">{x.name}</strong><span>{x.phone || x.email}</span></div>, x.property?.title || x.subject || x.inquiry_type, x.source, new Date(x.created_at).toLocaleDateString('en-IN'), <select value={x.status} onChange={e => update(x.id, e.target.value)} className="rounded-lg border px-3 py-2"><option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="visit_booked">Visit booked</option><option value="won">Won</option><option value="lost">Lost</option></select>])}/>;
}

function Reviews({ items, onDone }) {
  const toggle = async item => { const { error } = await supabase.from('testimonials').update({ is_approved: !item.is_approved }).eq('id', item.id); onDone(error ? error.message : 'Review updated.'); };
  return <div className="grid gap-4 lg:grid-cols-2">{items.map(item => <article key={item.id} className="rounded-2xl bg-white p-6"><div className="mb-5 flex justify-between"><div><h3 className="font-serif text-xl">{item.name}</h3><span className="text-xs text-[#8f777d]">{item.role}</span></div><button onClick={() => toggle(item)} className="rounded-full bg-[#f2dce1] px-3 py-1 text-[9px] font-bold">{item.is_approved ? 'Published' : 'Hidden'}</button></div><p className="text-sm leading-6">“{item.content}”</p></article>)}</div>;
}

function Partners({ items, onDone }) {
  const [adding, setAdding] = useState(false);
  return <><div className="mb-6 flex justify-end"><button onClick={() => setAdding(true)} className="flex items-center gap-2 rounded-xl bg-[#4b0617] px-5 py-3 text-xs font-bold text-white"><Plus size={16}/>Add developer</button></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map(item => { const logo = item.developer_assets?.find(x => x.asset_type === 'logo'); const url = logo?.storage_path?.startsWith('/') ? logo.storage_path : logo?.storage_path ? supabase.storage.from('developer-assets').getPublicUrl(logo.storage_path).data.publicUrl : ''; return <div key={item.id} className="flex h-40 items-center justify-center rounded-2xl border bg-white p-6">{url ? <img src={url} alt={item.name} className="max-h-20 max-w-[140px] object-contain"/> : item.name}</div>; })}</div>{adding && <PartnerModal onClose={() => setAdding(false)} onDone={message => { setAdding(false); onDone(message); }}/>}</>;
}

function PartnerModal({ onClose, onDone }) { const [name, setName] = useState(''); const [logo, setLogo] = useState(null); const save = async e => { e.preventDefault(); if (logo?.size > 10 * 1024 * 1024) return onDone('Please choose a logo smaller than 10 MB.'); const developer = await supabase.from('developers').insert({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''), is_featured: true }).select('id').single(); if (developer.error) return onDone(developer.error.message); const path = `${developer.data.id}/${crypto.randomUUID()}.${logo.name.split('.').pop()}`; const upload = await supabase.storage.from('developer-assets').upload(path, logo); if (upload.error) { await supabase.from('developers').delete().eq('id', developer.data.id); return onDone(upload.error.message); } const asset = await supabase.from('developer_assets').insert({ developer_id: developer.data.id, asset_type: 'logo', storage_path: path, file_name: logo.name, mime_type: logo.type, alt_text: name }); if (asset.error) { await supabase.storage.from('developer-assets').remove([path]); await supabase.from('developers').delete().eq('id', developer.data.id); return onDone(asset.error.message); } onDone('Developer added.'); }; return <Modal title="Add developer" onClose={onClose}><form onSubmit={save} className="space-y-4"><Field label="Developer name" value={name} onChange={setName}/><label><span className="label">Logo</span><input required type="file" accept="image/*" onChange={e => setLogo(e.target.files[0])} className="input"/></label><button className="w-full rounded-xl bg-[#4b0617] py-3 text-xs font-bold text-white">Save developer</button></form></Modal>; }

function Billing({ items, profile, onDone }) {
  const [form, setForm] = useState({ client: '', phone: '', project: '', amount: '', received: '', mode: 'UPI' });
  const save = async e => { e.preventDefault(); const total = Number(form.amount); const received = Number(form.received) || 0; if (received > total) return onDone('Amount received cannot be greater than the invoice total.'); const client = await supabase.from('clients').insert({ name: form.client, phone: form.phone || 'Not provided' }).select('id').single(); if (client.error) return onDone(client.error.message); const invoice = await supabase.from('invoices').insert({ invoice_number: `SLF-${Date.now().toString(36).toUpperCase()}`, client_id: client.data.id, created_by: profile.id, billing_name: form.client, billing_phone: form.phone || 'Not provided', notes: form.project || null, status: received >= total ? 'paid' : received > 0 ? 'partially_paid' : 'issued' }).select('id').single(); if (invoice.error) { await supabase.from('clients').delete().eq('id', client.data.id); return onDone(invoice.error.message); } const item = await supabase.from('invoice_items').insert({ invoice_id: invoice.data.id, particulars: form.project || 'Property services', unit_amount: total, sort_order: 0 }); if (item.error) { await supabase.from('invoices').delete().eq('id', invoice.data.id); await supabase.from('clients').delete().eq('id', client.data.id); return onDone(item.error.message); } if (received > 0) { const payment = await supabase.from('payments').insert({ invoice_id: invoice.data.id, amount: received, payment_mode: form.mode.toLowerCase().replace(' ', '_'), recorded_by: profile.id }); if (payment.error) { await supabase.from('invoices').delete().eq('id', invoice.data.id); await supabase.from('clients').delete().eq('id', client.data.id); return onDone(payment.error.message); } } setForm({ client: '', phone: '', project: '', amount: '', received: '', mode: 'UPI' }); onDone('Invoice saved.'); };
  return <div className="grid items-start gap-6 xl:grid-cols-[.8fr_1.2fr]"><form onSubmit={save} className="space-y-4 rounded-2xl bg-white p-6"><h2 className="font-serif text-2xl">New invoice</h2><Field label="Client" value={form.client} onChange={v => setForm({ ...form, client: v })}/><Field label="Phone" value={form.phone} onChange={v => setForm({ ...form, phone: v })}/><Field label="Project" value={form.project} onChange={v => setForm({ ...form, project: v })}/><Field label="Total amount" type="number" value={form.amount} onChange={v => setForm({ ...form, amount: v })}/><Field label="Amount received" type="number" value={form.received} onChange={v => setForm({ ...form, received: v })}/><Select label="Payment mode" value={form.mode} options={['Cash','UPI','Bank Transfer','Cheque']} onChange={v => setForm({ ...form, mode: v })}/><button className="w-full rounded-xl bg-[#4b0617] py-3 text-xs font-bold text-white">Save invoice</button></form><Table headings={['Invoice', 'Client', 'Project', 'Total', 'Balance']} rows={items.map(x => [x.invoice_number, x.client?.name || '—', x.notes || '—', money(x.total), money(x.balance_due)])}/></div>;
}

function Toolbar({ query, setQuery, action, label }) { return <div className="mb-6 flex flex-col gap-4 sm:flex-row"><div className="relative flex-1"><Search className="absolute left-4 top-1/2 -translate-y-1/2" size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search" className="input pl-11"/></div><button onClick={action} className="flex items-center justify-center gap-2 rounded-xl bg-[#4b0617] px-5 py-3 text-xs font-bold text-white"><Plus size={17}/>{label}</button></div>; }
function Table({ headings, rows }) { return <div className="overflow-hidden rounded-2xl border bg-white"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-[#fcf9fa] text-[9px] uppercase tracking-[.15em] text-[#8f777d]"><tr>{headings.map(x => <th key={x} className="px-5 py-4">{x}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i} className="border-t">{row.map((cell, j) => <td key={j} className="px-5 py-4 text-xs">{cell}</td>)}</tr>)}</tbody></table></div></div>; }
function Modal({ title, onClose, children }) { return <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 sm:items-center sm:p-5"><div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 sm:rounded-3xl sm:p-8"><div className="mb-7 flex justify-between"><h2 className="font-serif text-3xl">{title}</h2><button onClick={onClose}><X/></button></div>{children}</div></div>; }
function Field({ label, value, onChange, type = 'text', required = label !== 'Phone' }) { return <label className="block"><span className="label">{label}</span><input required={required} type={type} value={value} onChange={e => onChange(e.target.value)} className="input"/></label>; }
function Select({ label, value, onChange, options }) { return <label className="block"><span className="label">{label}</span><select value={value} onChange={e => onChange(e.target.value)} className="input"><option value="">Select</option>{options.map(item => { const option = typeof item === 'string' ? { value: item, label: item } : item; return <option key={option.value} value={option.value}>{option.label}</option>; })}</select></label>; }
