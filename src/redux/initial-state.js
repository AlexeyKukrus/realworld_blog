export const initialStateArticles = {
  articles: [],
  articlesCount: 0,
  error: null,
  loading: false,
  article: {
    slug: null,
    title: null,
    description: null,
    body: null,
    tagList: [],
    createdAt: null,
    updatedAt: null,
    favorited: false,
    favoritesCount: 0,
    author: {
      username: null,
      image: null,
    },
  },
  server: {
    errors: null,
  },
  created: false,
  edited: false,
  deleted: false,
};

export const initialStateUsers = {
  user: {
    email: null,
    token: null,
    username: null,
    image: null,
  },
  server: {
    errors: {
      username: null,
      email: null,
    },
  },
  isLogin: false,
  loading: false,
  error: null,
  flag: false,
};
