'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/kids', label: 'Kids Practice' },
    { href: '/adults', label: 'Adults Practice' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xl font-bold hover:text-blue-200 transition-colors"
          >
            📚 Phonics Learning
          </Link>
          <ul className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-blue-700 font-semibold'
                      : 'hover:bg-blue-500'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

