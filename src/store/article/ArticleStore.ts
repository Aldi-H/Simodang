import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';

type GetAllArticlesData = {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  published: boolean;
  createdAt: string;
};

type GetOneArticle = {
  articleId: string;
  url: string;
};

type ArticleStoreState = {
  getAllArticlesData: GetAllArticlesData[];
  articleDetail: GetOneArticle;
};

type ArticleStoreAction = {
  getAllArticles: () => Promise<void>;
  getOneArticle: (articleId: string) => Promise<void>;
};

const useArticleStore = create<ArticleStoreState & ArticleStoreAction>(set => ({
  getAllArticlesData: [],
  articleDetail: {
    articleId: '',
    url: '',
  },

  getAllArticles: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/articles`);

      console.log(response.data);

      const getAllArticles = response.data.map(
        (articleData: {
          id: string;
          title: string;
          url: string;
          image: string;
          published: boolean;
          createdAt: string;
        }) => {
          return {
            id: articleData.id,
            title: articleData.title,
            url: articleData.url,
            imageUrl: articleData.image,
            published: articleData.published,
            createdAt: articleData.createdAt,
          };
        },
      );
      set({ getAllArticlesData: getAllArticles });
    } catch (error) {
      console.log('ArticleStore Error: ', error);
    }
  },

  getOneArticle: async (articleId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/articles/${articleId}`);

      set({
        articleDetail: {
          articleId: response.data.id,
          url: response.data.url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useArticleStore;
