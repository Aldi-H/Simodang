import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type TabelDataProps = {
  TabelData: { date?: string; value?: number }[];
};

const TableComponent = ({ TabelData }: TabelDataProps) => {
  const tableHead = ['Tanggal', 'Value'];

  return (
    <View>
      <View>
        <Table borderStyle={styles.borderStyle}>
          <Row
            data={tableHead}
            style={styles.header}
            textStyle={styles.textStyle}
          />
          {TabelData?.map((value, index) => {
            return (
              <Row
                key={index}
                data={[value.date, value.value]}
                textStyle={styles.dataTextStyle}
              />
            );
          })}
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyle: {
    borderWidth: 0.5,
    borderColor: CONSTANT.themeColors.complementary,
  },
  header: {
    height: hp('4%'),
    backgroundColor: CONSTANT.themeColors.primary,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  textStyle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
    textAlign: 'center',
  },
  dataTextStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
    textAlign: 'center',
    paddingVertical: 5,
  },
});

export default TableComponent;
