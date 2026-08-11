"use client";

import { useState } from "react";
import Link from "next/link";
import { Greeting } from "@/components/Greeting";

type HeaderProps = {
  showGreeting?: boolean;
};

export function Header({ showGreeting = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="俺の夢 トップ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand-logo" src="/assets/logo-transparent.png" alt="俺の夢" />
      </Link>
      {showGreeting ? (
        <>
          <button className="menu-toggle" type="button" aria-label="メニューを開閉" aria-expanded={isMenuOpen} onClick={() => setIsMenuOpen((current) => !current)}>
            <span />
            <span />
            <span />
          </button>
          <nav className={`site-nav ${isMenuOpen ? "is-open" : ""}`} aria-label="主要ナビゲーション">
            <Greeting />
            <a href="#novels" onClick={() => setIsMenuOpen(false)}>
              作品一覧
            </a>
          </nav>
        </>
      ) : null}
    </header>
  );
}
