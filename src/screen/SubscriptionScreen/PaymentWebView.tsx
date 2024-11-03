import { StyleSheet } from "react-native";
import WebView from "react-native-webview";
import useTransactionStore from "../../store/subscription/TransactionStore";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/NavigationTypes";

type PaymentWebViewProps = RouteProp<RootStackParamList, 'PaymentWebView'>;

const PaymentWebView = () => {
  const paymentLink = useRoute<PaymentWebViewProps>().params?.paymentLink ?? '';

  return (
    <WebView source={{ uri: paymentLink }} style={styles.webViewStyle} />
  );
}

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
});

export default PaymentWebView;
