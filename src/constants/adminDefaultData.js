//===============須審核========================
export const DEFAULT_MEMBER = {
  email: '',
  password: '',
  userName: '',
  role: '',
  createdAt: '',
  bio: '',
  location: '',
  favoritePetTypes: [],
  isActive: false,
};

export const DEFAULT_STORE = {
  storeName: '',
  type: [],
  area: '',
  petTypes: [],
  description: '',
  phone: '',
  website: '',
  address: '',
  createdAt: '',
  isActive: false,
  lat: null,
  lng: null,

  // 可選欄位（目前後台沒開放輸入）
  openTime: '',
  coverImage: '',
  googleMapUrl: '',
};

export const DEFAULT_ARTICLE = {
  title: '',
  category: '',
  summary: '',
  content: '',
  image: '',
  createdAt: '',
  publishAt: '',
  unpublishAt: '',
  author: '',
  isActive: false,
};

export const DEFAULT_ANNOUNCEMENT = {
  type: '',
  title: '',
  content: '',
  createdAt: '',
  publishAt: '',
  unpublishAt: '',
  isActive: false,
  isSticky: false,
};

export const DEFAULT_EVENT = {
  title: '',
  description: '',
  location: '',
  createdAt: '',
  publishAt: '',
  unpublishAt: '',
  petTypes: [],
  coverImage: '',
  organizer: '',
  isActive: false,
  isSticky: false,
};

//==============無須審核========================
export const DEFAULT_REVIEW = {
  rating: 1,
  comment: '',
  createdAt: '',
  isActive: false,
};
