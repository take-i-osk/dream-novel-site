const state = {
  novels: [],
  selectedTags: new Set(),
  lastReadNovel: null,
  readerProfile: {
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    nickname: "",
    hometown: "",
    hometownKana: "",
  },
  sort: "updatedDesc",
};

const elements = {
  resumeReading: document.querySelector("#resumeReading"),
  resumeReadingMeta: document.querySelector("#resumeReadingMeta"),
  resumeReadingLink: document.querySelector("#resumeReadingLink"),
  nameSettings: document.querySelector("#nameSettings"),
  nameSettingsStatus: document.querySelector("#nameSettingsStatus"),
  readerLastName: document.querySelector("#readerLastName"),
  readerFirstName: document.querySelector("#readerFirstName"),
  readerLastNameKana: document.querySelector("#readerLastNameKana"),
  readerFirstNameKana: document.querySelector("#readerFirstNameKana"),
  readerNickname: document.querySelector("#readerNickname"),
  readerHometown: document.querySelector("#readerHometown"),
  readerHometownKana: document.querySelector("#readerHometownKana"),
  readerGreeting: document.querySelector("#readerGreeting"),
  clearNameSettings: document.querySelector("#clearNameSettings"),
  resetFilters: document.querySelector("#resetFilters"),
  sortSelect: document.querySelector("#sortSelect"),
  tagList: document.querySelector("#tagList"),
  novelList: document.querySelector("#novelList"),
  resultCount: document.querySelector("#resultCount"),
  emptyMessage: document.querySelector("#emptyMessage"),
};

const fallbackNovels = [];

const readerProfileKey = "ore-no-yume:reader-profile";
const lastReadNovelKey = "ore-no-yume:last-read-novel";

async function loadNovels() {
  try {
    const response = await fetch("novels.json");
    if (!response.ok) {
      throw new Error("novels.json could not be loaded");
    }
    state.novels = await response.json();
  } catch {
    state.novels = fallbackNovels;
  }

  renderTags();
  renderNovels();
}

function loadReaderProfile() {
  const savedProfile = localStorage.getItem(readerProfileKey);

  if (!savedProfile) {
    renderReaderProfile();
    return;
  }

  try {
    const profile = JSON.parse(savedProfile);
    state.readerProfile.lastName = typeof profile.lastName === "string" ? profile.lastName : "";
    state.readerProfile.firstName = typeof profile.firstName === "string" ? profile.firstName : "";
    state.readerProfile.lastNameKana = typeof profile.lastNameKana === "string" ? profile.lastNameKana : "";
    state.readerProfile.firstNameKana = typeof profile.firstNameKana === "string" ? profile.firstNameKana : "";
    state.readerProfile.nickname = typeof profile.nickname === "string" ? profile.nickname : "";
    state.readerProfile.hometown = typeof profile.hometown === "string" ? profile.hometown : "";
    state.readerProfile.hometownKana = typeof profile.hometownKana === "string" ? profile.hometownKana : "";

    if (!state.readerProfile.lastName && !state.readerProfile.firstName && typeof profile.name === "string") {
      state.readerProfile.firstName = profile.name;
    }
  } catch {
    localStorage.removeItem(readerProfileKey);
  }

  renderReaderProfile();
}

function loadLastReadNovel() {
  const savedNovel = localStorage.getItem(lastReadNovelKey);

  if (!savedNovel) {
    renderLastReadNovel();
    return;
  }

  try {
    const novel = JSON.parse(savedNovel);
    if (typeof novel.title === "string" && typeof novel.url === "string") {
      state.lastReadNovel = {
        title: novel.title,
        url: novel.url,
        visitedAt: typeof novel.visitedAt === "string" ? novel.visitedAt : "",
      };
    }
  } catch {
    localStorage.removeItem(lastReadNovelKey);
  }

  renderLastReadNovel();
}

function renderLastReadNovel() {
  if (!state.lastReadNovel) {
    elements.resumeReading.hidden = true;
    return;
  }

  elements.resumeReading.hidden = false;
  elements.resumeReadingMeta.textContent = `${state.lastReadNovel.title}${formatLastReadTime(state.lastReadNovel.visitedAt)}`;
  elements.resumeReadingLink.href = state.lastReadNovel.url;
}

function saveReaderProfile() {
  state.readerProfile.lastName = elements.readerLastName.value.trim();
  state.readerProfile.firstName = elements.readerFirstName.value.trim();
  state.readerProfile.lastNameKana = elements.readerLastNameKana.value.trim();
  state.readerProfile.firstNameKana = elements.readerFirstNameKana.value.trim();
  state.readerProfile.nickname = elements.readerNickname.value.trim();
  state.readerProfile.hometown = elements.readerHometown.value.trim();
  state.readerProfile.hometownKana = elements.readerHometownKana.value.trim();
  localStorage.setItem(readerProfileKey, JSON.stringify(state.readerProfile));
  renderReaderProfile("保存しました");
}

function clearReaderProfile() {
  state.readerProfile.lastName = "";
  state.readerProfile.firstName = "";
  state.readerProfile.lastNameKana = "";
  state.readerProfile.firstNameKana = "";
  state.readerProfile.nickname = "";
  state.readerProfile.hometown = "";
  state.readerProfile.hometownKana = "";
  localStorage.removeItem(readerProfileKey);
  renderReaderProfile("削除しました");
  elements.readerLastName.focus();
}

function renderReaderProfile(message) {
  elements.readerLastName.value = state.readerProfile.lastName;
  elements.readerFirstName.value = state.readerProfile.firstName;
  elements.readerLastNameKana.value = state.readerProfile.lastNameKana;
  elements.readerFirstNameKana.value = state.readerProfile.firstNameKana;
  elements.readerNickname.value = state.readerProfile.nickname;
  elements.readerHometown.value = state.readerProfile.hometown;
  elements.readerHometownKana.value = state.readerProfile.hometownKana;
  elements.readerGreeting.textContent = `こんにちは、${getDisplayName()}さん`;

  if (message) {
    elements.nameSettingsStatus.textContent = message;
    return;
  }

  const hasProfile = Object.values(state.readerProfile).some((value) => value);
  elements.nameSettingsStatus.textContent = hasProfile ? "設定済み" : "未設定";
}

function getDisplayName() {
  return state.readerProfile.nickname || [state.readerProfile.lastName, state.readerProfile.firstName].filter(Boolean).join(" ") || "名無し";
}

function renderTags() {
  const tags = [...new Set(state.novels.flatMap((novel) => novel.tags))].sort((a, b) => a.localeCompare(b, "ja"));

  elements.tagList.replaceChildren(
    ...tags.map((tag) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tag-button";
      button.textContent = tag;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => toggleTag(tag));
      return button;
    }),
  );
}

function renderNovels() {
  const filtered = state.novels
    .filter((novel) => matchesTags(novel))
    .sort(compareNovels);

  elements.novelList.replaceChildren(...filtered.map(createNovelCard));
  elements.emptyMessage.hidden = filtered.length > 0;
  elements.resultCount.textContent = `${filtered.length}件`;
  updateTagButtons();
}

function createNovelCard(novel) {
  const article = document.createElement("article");
  article.className = "novel-card";

  const title = document.createElement("h3");
  title.className = "novel-title";

  const link = document.createElement("a");
  link.href = novel.url;
  link.textContent = novel.title;
  title.append(link);

  const meta = document.createElement("div");
  meta.className = "novel-meta";
  meta.append(
    createText(`更新 ${formatDate(novel.updatedAt)}`),
    createText(`${episodeCount(novel)}話`),
    createText(novel.status),
  );

  const summary = document.createElement("p");
  summary.className = "novel-summary";
  summary.textContent = novel.summary;

  const tags = document.createElement("div");
  tags.className = "tag-row";
  tags.append(
    ...novel.tags.map((tag) => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = tag;
      return span;
    }),
  );

  article.append(meta, title, summary, tags);
  return article;
}

function createText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  return span;
}

function matchesTags(novel) {
  if (state.selectedTags.size === 0) {
    return true;
  }

  return [...state.selectedTags].every((tag) => novel.tags.includes(tag));
}

function compareNovels(a, b) {
  if (state.sort === "titleAsc") {
    return a.title.localeCompare(b.title, "ja");
  }

  if (state.sort === "chapterDesc") {
    return episodeCount(b) - episodeCount(a);
  }

  return new Date(b.updatedAt) - new Date(a.updatedAt);
}

function episodeCount(novel) {
  if (Array.isArray(novel.episodes)) {
    return novel.episodes.length;
  }

  return Number(novel.chapters) || 0;
}

function toggleTag(tag) {
  if (state.selectedTags.has(tag)) {
    state.selectedTags.delete(tag);
  } else {
    state.selectedTags.add(tag);
  }
  renderNovels();
}

function updateTagButtons() {
  elements.tagList.querySelectorAll(".tag-button").forEach((button) => {
    const isActive = state.selectedTags.has(button.textContent);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatLastReadTime(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return ` / ${new Intl.DateTimeFormat("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)}`;
}

elements.resetFilters.addEventListener("click", () => {
  state.selectedTags.clear();
  renderNovels();
});

elements.sortSelect.addEventListener("change", (event) => {
  state.sort = event.target.value;
  renderNovels();
});

elements.nameSettings.addEventListener("submit", (event) => {
  event.preventDefault();
  saveReaderProfile();
});

elements.clearNameSettings.addEventListener("click", () => {
  clearReaderProfile();
});

loadReaderProfile();
loadLastReadNovel();
loadNovels();
