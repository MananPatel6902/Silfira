import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Printer, FileDown, X } from 'lucide-react';
import { invoiceDocument } from '../lib/invoice';
import './InvoiceViewer.css';

export default function InvoiceViewer({ invoice, onClose }) {
  const frame = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const document = useMemo(() => invoiceDocument(invoice, window.location.origin), [invoice]);
  useEffect(() => {
    const previous = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';
    const onKey = event => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.document.body.style.overflow = previous; window.removeEventListener('keydown', onKey); };
  }, [onClose]);
  const print = async () => {
    setError('');
    try {
      const target = frame.current?.contentWindow;
      if (!target) throw new Error('Invoice is still loading');
      await Promise.all([...target.document.images].map(img => img.decode().catch(() => {})));
      await target.document.fonts?.ready;
      target.focus();
      target.print();
    } catch { setError('Unable to open printing. Please try again in a desktop browser.'); }
  };
  return <div className="invoice-overlay" role="dialog" aria-modal="true" aria-label={`Invoice ${invoice.invoice_number}`} data-lenis-prevent>
    <div className="invoice-viewer">
      <div className="invoice-toolbar"><div><h2>{invoice.invoice_number}</h2><p>Print or choose “Save as PDF”. Keep “Headers and footers” off in print settings.</p></div><div className="invoice-actions"><button type="button" disabled={!ready} onClick={print}><Printer size={16}/>Print</button><button type="button" className="invoice-pdf" disabled={!ready} onClick={print}><FileDown size={16}/>Save as PDF</button><button type="button" aria-label="Close invoice" onClick={onClose} autoFocus><X size={20}/></button></div></div>
      {error && <p role="alert" className="invoice-error">{error}</p>}
      <iframe ref={frame} title={`Bill ${invoice.invoice_number}`} srcDoc={document} onLoad={() => setReady(true)} className="invoice-frame"/>
    </div>
  </div>;
}
