//===============須審核========================
export const DEFAULT_MEMBER = {
  email: '',
  password: '',
  userName: '',
  role: '',
  createdAt: '',
  favoritePetTypes: [],
  isActive: false,
};

export const DEFAULT_STORE = {
  name: '',
  address: '',
  phone: '',
  email: '',
  website: '',
  description: '',
  storeType: '',
  area: '',
  petTypes: [],
  createdAt: '',
  publishAt: '',
  unpublishAt: '',
  isActive: false,
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
