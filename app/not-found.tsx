import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <div className="wrap flex flex-col items-start gap-7">
        <p className="eyebrow">404</p>
        <h1 className="serif text-[clamp(44px,6vw,88px)] leading-none">This page has drifted<br /><em className="text-gold">off the map.</em></h1>
        <Link href="/" className="btn btn-gold">Return Home</Link>
      </div>
    </section>
  );
}
