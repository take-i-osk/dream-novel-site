import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="novel-document">
        <div>
          <span className="novel-status">404</span>
          <h1>ページが見つかりません</h1>
          <p>指定されたページは存在しないか、移動した可能性があります。</p>
          <p>
            <Link href="/">トップへ戻る</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
