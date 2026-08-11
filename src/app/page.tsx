import { AdSlot } from "@/components/AdSlot";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NameSettings } from "@/components/NameSettings";
import { NovelList } from "@/components/NovelList";
import { ResumeReading } from "@/components/ResumeReading";

export default function HomePage() {
  return (
    <>
      <Header showGreeting />
      <main>
        <section className="hero" aria-label="小説検索">
          <div className="hero-inner">
            <div className="hero-topline">
              <AdSlot placement="homeTop" className="hero-ad" />
            </div>

            <section className="author-message" aria-label="作者からのメッセージ">
              <p>こういう夢小説サイト、最近あまり見かけない気がしたので、趣味でそっと作っています。</p>
            </section>

            <ResumeReading />
            <NameSettings />
            <NovelList />
          </div>
        </section>

        <section className="bottom-ad-section" aria-label="広告">
          <AdSlot placement="homeBottom" className="bottom-ad-slot" />
        </section>
      </main>
      <Footer />
    </>
  );
}
