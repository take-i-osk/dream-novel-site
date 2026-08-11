export type ReaderProfile = {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  nickname: string;
  hometown: string;
  hometownKana: string;
};

export const emptyProfile: ReaderProfile = {
  lastName: "",
  firstName: "",
  lastNameKana: "",
  firstNameKana: "",
  nickname: "",
  hometown: "",
  hometownKana: "",
};

export const defaultProfile: ReaderProfile = {
  lastName: "名無し",
  firstName: "権兵衛",
  lastNameKana: "ななし",
  firstNameKana: "ごんべえ",
  nickname: "ごんべえ",
  hometown: "東京",
  hometownKana: "とうきょう",
};
