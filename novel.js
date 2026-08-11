const lastReadNovelKey = "ore-no-yume:last-read-novel";
const readerProfileKey = "ore-no-yume:reader-profile";
const novelTitle = document.body.dataset.novelTitle;
const novelUrl = document.body.dataset.novelUrl || location.pathname.split("/").pop();
const defaultProfile = {
  lastName: "名無し",
  firstName: "権兵衛",
  lastNameKana: "ななし",
  firstNameKana: "ごんべえ",
  nickname: "ごんべえ",
  hometown: "東京",
  hometownKana: "とうきょう",
};

function loadReaderProfile() {
  const savedProfile = localStorage.getItem(readerProfileKey);

  if (!savedProfile) {
    return defaultProfile;
  }

  try {
    const profile = JSON.parse(savedProfile);
    return {
      lastName: profile.lastName || defaultProfile.lastName,
      firstName: profile.firstName || profile.name || defaultProfile.firstName,
      lastNameKana: profile.lastNameKana || defaultProfile.lastNameKana,
      firstNameKana: profile.firstNameKana || defaultProfile.firstNameKana,
      nickname: profile.nickname || defaultProfile.nickname,
      hometown: profile.hometown || defaultProfile.hometown,
      hometownKana: profile.hometownKana || defaultProfile.hometownKana,
    };
  } catch {
    return defaultProfile;
  }
}

function profileValue(profile, token) {
  if (token === "fullName") {
    return `${profile.lastName}${profile.firstName}`;
  }

  return profile[token] || defaultProfile[token] || "";
}

function applyReaderProfile() {
  const profile = loadReaderProfile();

  document.querySelectorAll("[data-profile-token]").forEach((element) => {
    element.textContent = profileValue(profile, element.dataset.profileToken);
  });
}

if (novelTitle) {
  localStorage.setItem(
    lastReadNovelKey,
    JSON.stringify({
      title: novelTitle,
      url: novelUrl,
      visitedAt: new Date().toISOString(),
    }),
  );
}

applyReaderProfile();
