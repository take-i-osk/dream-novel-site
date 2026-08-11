"use client";

import { type FormEvent, useState } from "react";
import { emptyProfile, type ReaderProfile } from "@/lib/reader-profile";
import { useReaderStore } from "@/store/reader-store";

export function NameSettings() {
  const storedProfile = useReaderStore((state) => state.profile);
  const hasHydrated = useReaderStore((state) => state.hasHydrated);
  const setProfile = useReaderStore((state) => state.setProfile);
  const clearProfile = useReaderStore((state) => state.clearProfile);

  return (
    <NameSettingsForm
      key={hasHydrated ? "hydrated" : "initial"}
      initialProfile={hasHydrated ? storedProfile : emptyProfile}
      setProfile={setProfile}
      clearProfile={clearProfile}
    />
  );
}

type NameSettingsFormProps = {
  initialProfile: ReaderProfile;
  setProfile: (profile: ReaderProfile) => void;
  clearProfile: () => void;
};

function NameSettingsForm({ initialProfile, setProfile, clearProfile }: NameSettingsFormProps) {
  const [message, setMessage] = useState("");
  const [profile, setDraftProfile] = useState<ReaderProfile>(initialProfile);

  function updateField(field: keyof ReaderProfile, value: string) {
    setDraftProfile((current) => ({ ...current, [field]: value }));
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextProfile = trimProfile(profile);
    setDraftProfile(nextProfile);
    setProfile(nextProfile);
    setMessage("保存できました！");
  }

  function clear() {
    setDraftProfile(emptyProfile);
    clearProfile();
    setMessage("削除しました");
  }

  return (
    <form className="name-settings" aria-label="名前設定" onSubmit={save}>
      <div className="name-settings-heading">
        <div>
          <h2>名前設定</h2>
        </div>
        <p className={message ? "name-settings-message is-success" : "name-settings-message"} role="status" aria-live="polite">
          {message || "未入力の項目は、名無し権兵衛・東京で表示されます。"}
        </p>
      </div>
      <div className="name-grid">
        <label>
          <span>姓</span>
          <input type="text" value={profile.lastName} onChange={(event) => updateField("lastName", event.target.value)} autoComplete="family-name" placeholder="例: 夢野" />
        </label>
        <label>
          <span>名</span>
          <input type="text" value={profile.firstName} onChange={(event) => updateField("firstName", event.target.value)} autoComplete="given-name" placeholder="例: ひかり" />
        </label>
        <label>
          <span>せい</span>
          <input type="text" value={profile.lastNameKana} onChange={(event) => updateField("lastNameKana", event.target.value)} autoComplete="off" placeholder="例: ゆめの" />
        </label>
        <label>
          <span>めい</span>
          <input type="text" value={profile.firstNameKana} onChange={(event) => updateField("firstNameKana", event.target.value)} autoComplete="off" placeholder="例: ひかり" />
        </label>
        <label className="wide">
          <span>あだな</span>
          <input type="text" value={profile.nickname} onChange={(event) => updateField("nickname", event.target.value)} autoComplete="off" placeholder="例: ひかり" />
        </label>
        <label>
          <span>出身地</span>
          <input type="text" value={profile.hometown} onChange={(event) => updateField("hometown", event.target.value)} autoComplete="address-level1" placeholder="例: 大阪" />
        </label>
        <label>
          <span>出身地よみ</span>
          <input type="text" value={profile.hometownKana} onChange={(event) => updateField("hometownKana", event.target.value)} autoComplete="off" placeholder="例: おおさか" />
        </label>
      </div>
      <div className="name-actions">
        <button type="submit">保存</button>
        <button type="button" onClick={clear}>
          削除
        </button>
      </div>
    </form>
  );
}

function trimProfile(profile: ReaderProfile): ReaderProfile {
  return {
    lastName: profile.lastName.trim(),
    firstName: profile.firstName.trim(),
    lastNameKana: profile.lastNameKana.trim(),
    firstNameKana: profile.firstNameKana.trim(),
    nickname: profile.nickname.trim(),
    hometown: profile.hometown.trim(),
    hometownKana: profile.hometownKana.trim(),
  };
}
