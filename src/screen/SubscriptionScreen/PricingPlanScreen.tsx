import { Button, Pressable, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import PricingPlanStore from '../../store/subscription/PricingPlanStore';
import { useEffect } from 'react';
import { currencyFormat } from '../../utils/locale/currency';
import { CONSTANT } from '../../themes';
import Svg from 'react-native-svg';
import { CheckBadgeIcon, CheckCircleIcon, CheckIcon } from 'react-native-heroicons/solid';

export default () => {
  const { pricingPlans, getPricingPlans } = PricingPlanStore();

  useEffect(() => {
    getPricingPlans();
  }, [getPricingPlans]);

  return (
    <ScrollView>
      <SafeAreaView>
        <View
          style={{
            display: 'flex',
          }}>
          <Text className="text-2xl font-bold text-black text-center mt-10">
            Upgrade Simodang
          </Text>
          <View>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                marginTop: 20,
                color: 'black',
              }}>
              Pilih paket yang sesuai dengan kebutuhan anda
            </Text>
          </View>
          <View className="flex flex-column justify-center items-center mt-6 mb-2">
            {pricingPlans
              .filter(e => e.price != 0)
              .map((pricingPlan, i, array) => (
                <Pressable
                  key={pricingPlan.id}
                  onPress={() => {
                    console.log('Pressed ' + pricingPlan.name);
                  }}>
                  <View
                    key={pricingPlan.id}
                    className="flex flex-column rounded-lg p-4 bg-white shadow-md border border-gray-200 w-80 mb-6">
                    <Text className="text-lg font-bold text-black text-left mb-2">
                      {pricingPlan.name}
                    </Text>
                    <Text className="text-gray-500 text-left mb-2">
                      {pricingPlan.description}
                    </Text>
                    <View className="flex flex-row">
                      <Text className="text-black text-lg font-bold text-left mr-1">
                        Rp
                      </Text>
                      <Text className="text-black text-2xl font-bold text-left">
                        {currencyFormat(pricingPlan.price)}
                        <Text className="text-black text-lg font-bold text-left mr-1">
                          /Tahun
                        </Text>
                      </Text>
                    </View>
                    <View className='my-2 flex flex-row'>
                      <CheckIcon
                        className="w-6 h-6"
                        color='green'
                      ></CheckIcon>
                      <Text
                        className='text-black text-base font-normal text-left ml-2'
                      >{pricingPlan.pondLimit} Kolam</Text>
                    </View>
                    <View
                      style={i === array.length - 1 ? {
                        backgroundColor: CONSTANT.themeColors.primary,
                      } : {
                        backgroundColor: CONSTANT.themeColors.base,
                      }}
                      className="rounded-lg p-2 bg-white shadow-md border border-gray-200 mt-4">
                      <Text
                        style={i === array.length - 1 ? {
                          color: 'white',
                        } : {
                          color: 'black',
                        }}
                        className="text-lg font-bold text-black text-center">
                        Pilih Paket
                      </Text>
                    </View>
                  </View>
                </Pressable>
              ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
