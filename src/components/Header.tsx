import Link from "next/link";
import { Greeting } from "@/components/Greeting";

type HeaderProps = {
  showGreeting?: boolean;
};

export function Header({ showGreeting = false }: HeaderProps) {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="俺の夢 トップ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand-logo" src="/assets/logo-transparent.png" alt="俺の夢" />
      </Link>
      {showGreeting ? (
        <nav className="site-nav" aria-label="主要ナビゲーション">
          <Greeting />
          <a href="#novels">作品一覧</a>
        </nav>
      ) : null}
    </header>
  );
}
