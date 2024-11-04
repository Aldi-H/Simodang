import { BackHandler, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/NavigationTypes';
import { useEffect } from 'react';
import useProfileStore from '../../store/profile/ProfileStore';
import TransactionStore from '../../store/subscription/TransactionStore';
import usePondStore from '../../store/pond/PondStore';

type PaymentWebViewProps = RouteProp<RootStackParamList, 'PaymentWebView'>;

const PaymentWebView = () => {
  const paymentLink = useRoute<PaymentWebViewProps>().params?.paymentLink ?? '';

  const navigation = useNavigation();

  const { getUser } = useProfileStore();
  const { getTransactions } = TransactionStore();
  const { getAllPonds } = usePondStore();

  useEffect(() => {
    const backAction = () => {
      getTransactions();
      getUser();
      getAllPonds();
      navigation.dispatch(StackActions.popToTop());
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return <WebView source={{ uri: paymentLink }} style={styles.webViewStyle} />;
};

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
});

export default PaymentWebView;
