import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  RouteProp,
  // useNavigation,
  useRoute,
} from '@react-navigation/native';

import useArticleStore from '../store/article/ArticleStore';
import { RootStackParamList } from '../routes/NavigationTypes';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

const WebViewScreen = () => {
  const { getOneArticle, articleDetail } = useArticleStore();

  const route = useRoute<ArticleScreenRouteProp>();
  console.log(route);

  const { articleId } = route.params;

  useEffect(() => {
    getOneArticle(articleId);
  }, [getOneArticle]);

  return (
    <WebView source={{ uri: articleDetail.url }} style={styles.webViewStyle} />
  );
};

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
});

export default WebViewScreen;
