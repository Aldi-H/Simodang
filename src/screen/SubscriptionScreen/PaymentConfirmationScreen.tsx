import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { CONSTANT } from '../../themes';
import PricingPlanStore from '../../store/subscription/PricingPlanStore';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { currencyFormat } from '../../utils/locale/currency';
import { CheckIcon, ExclamationCircleIcon } from 'react-native-heroicons/solid';
import BackIcon from '../../assets/icons/BackIcon.svg';
import TransactionStore from '../../store/subscription/TransactionStore';

export default function PaymentConfirmationScreen({}) {
  const { activePricingPlan } = PricingPlanStore();
  const { buySubscription, getTransactions } = TransactionStore();
  
  const navigation = useNavigation();

  const handleConfirmation = async () => {
    await buySubscription(activePricingPlan?.id ?? '');
    await getTransactions();
    navigation.dispatch(StackActions.popToTop());
  }


  return (
    <ScrollView>
      <View className="pt-6 flex flex-column px-4">
        <View className="flex flex-row items-center justify-between mt-4">
          <Pressable
            className="items-start"
            onPress={() => navigation.goBack()}>
            <BackIcon fill={CONSTANT.themeColors.font} />
          </Pressable>
          <Text className="text-black text-lg font-bold text-center">
            Konfirmasi Pembelian
          </Text>
          <View></View>
        </View>
        <Text className="text-black text-xl font-bold mt-5 text-center">
          {activePricingPlan?.name ?? ''}
        </Text>
        <Text className="text-black text-base font-normal  text-center">
          {activePricingPlan?.duration ?? 0} Hari
        </Text>
        <Text className="text-black text-base font-normal  text-center">
          {activePricingPlan?.pondLimit ?? 0} Kolam
        </Text>
        <View className="rounded-lg bg-gray-200 p-4 mt-4">
          <Text className="text-lg font-semibold mb-2 text-black">
            Peringatan
          </Text>
          <View className="my-2 flex flex-row">
            <ExclamationCircleIcon
              className="w-6 h-6"
              color="black"></ExclamationCircleIcon>
            <Text className="text-black text-base font-normal text-left ml-2">
              Paket Free Trial yang masih berjalan akan dinonaktifkan
            </Text>
          </View>
          <View className="my-2 flex flex-row">
            <ExclamationCircleIcon
              className="w-6 h-6"
              color="black"></ExclamationCircleIcon>
            <Text className="text-black text-base font-normal text-left ml-2">
              Paket yang sudah dipilih tidak bisa diganti
            </Text>
          </View>
        </View>
        {/* <Text className='text-black text-lg font-medium mt-2'>{activePricingPlan?.pondLimit ?? 0} Kolam</Text>
        <Text className='text-black text-lg font-medium mt-2'>{currencyFormat(activePricingPlan?.price ?? 0)}</Text> */}
        {/* <Text className='text-black text-lg font-bold mt-5'>Perhatian</Text>
        <Text className='text-black text-lg font-medium mt-5 text-center'>Paket Free Trial Akan Dimatikan Setelah Anda Membayar</Text>
        <Text className='text-black text-lg font-medium mt-5 text-center'>Anda Tidak Dapat Mengganti Paket Setelah Konfirmasi</Text> */}
        <View className="flex justify-between flex-row items-center mt-3">
          <Text className="text-sm font-medium text-black">
            Total (Sekali Bayar)
          </Text>
          <Text className="text-2xl font-bold text-black">
            Rp{currencyFormat(activePricingPlan?.price ?? 0)}
          </Text>
        </View>
        <Pressable onPress={handleConfirmation}>
          <View
            style={{
              backgroundColor: CONSTANT.themeColors.primary,
            }}
            className="flex flex-column rounded-lg p-2 bg-white shadow-md border border-gray-200 mt-6">
            <Text className="text-lg font-bold text-white text-left text-center">
              Konfirmasi
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
