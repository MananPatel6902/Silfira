import React from 'react';
import { Link } from 'react-router-dom';
export default function NotFound() {
  return <main className="min-h-[70vh] bg-[#fbf7f8] px-5 pb-24 pt-40 text-center text-[#4b0617]"><h1 className="font-serif text-5xl">Page not found</h1><p className="my-6">The page you’re looking for may have moved or no longer exists.</p><div className="flex justify-center gap-6"><Link className="underline" to="/">Go home</Link><Link className="underline" to="/properties">Browse properties</Link><Link className="underline" to="/contact">Contact us</Link></div></main>;
}
