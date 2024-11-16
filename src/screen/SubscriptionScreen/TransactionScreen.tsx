import { FlatList, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import TransactionStore from "../../store/subscription/TransactionStore";
import { useEffect } from "react";
import moment from "moment";
import TransactionCardComponent from "../../components/cards/TransactionCardComponent";
import { useNavigation } from "@react-navigation/native";

export default () => {
  const { transactions, getTransactions } = TransactionStore();

  const navigation = useNavigation();

  useEffect(() => {
    getTransactions();
    console.log(transactions);
  }, [getTransactions]);

  return <ScrollView>
    <SafeAreaView>
      <Text className="text-2xl font-bold text-black ml-5 mt-8 mb-3">Riwayat Pembelian</Text>
      <View>
      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <View className="my-1">
              <TransactionCardComponent
                title={item?.subscription?.pricingPlan.name ?? ''}
                status={item.status}
                createdAt={moment(item.createdAt).format('DD MMM YYYY')}
                expiredAt={moment(item?.subscription?.expiredAt ?? Date.now.toString()).format('DD MMM YYYY')}
                onPress={() => {
                  if ([0, 1].includes(item.status)) {
                    return;
                  }
                  navigation.navigate('PaymentWebView', {
                    paymentLink: item.paymentLink ,
                  });
                }}
              />
            </View>
          );
        }}

        ListEmptyComponent={
          <Text className="text-lg font-medium text-black text-center mt-5">
            Belum ada riwayat pembelian
          </Text>
        }
      />
      </View>
    </SafeAreaView>
  </ScrollView>
}