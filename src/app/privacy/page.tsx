import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項",
  description: "俺の夢のプライバシーポリシー、広告表示、免責事項、問い合わせ先について。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-document">
        <span className="novel-status">Policy</span>
        <h1>プライバシーポリシー・免責事項</h1>

        <section>
          <h2>このサイトについて</h2>
          <p>俺の夢は、個人が趣味の範囲で運営している夢小説アーカイブサイトです。</p>
        </section>

        <section>
          <h2>広告について</h2>
          <p>
            当サイトでは、第三者配信の広告サービスやアフィリエイトプログラムを利用する場合があります。広告配信事業者は、ユーザーの興味に応じた広告を表示するため、Cookieなどの情報を使用することがあります。
          </p>
          <p>広告リンク先の商品・サービスに関する問い合わせ、購入、契約などは、リンク先の事業者との間で行ってください。</p>
        </section>

        <section>
          <h2>アクセス解析について</h2>
          <p>当サイトでは、今後アクセス解析ツールを利用する場合があります。取得した情報は、サイト改善のための参考として利用します。</p>
        </section>

        <section>
          <h2>免責事項</h2>
          <p>
            当サイトの掲載内容について、できる限り適切な情報となるよう努めますが、正確性や安全性を保証するものではありません。当サイトの情報やリンク先の利用によって生じた損害について、運営者は責任を負いかねます。
          </p>
        </section>

        <section>
          <h2>問い合わせについて</h2>
          <p>
            問い合わせ、削除依頼、権利関係の連絡などは、
            <a href="https://github.com/take-i-osk/dream-novel-site" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            からお願いします。
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
