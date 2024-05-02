import React from 'react';
import {StyleSheet, View, Text,Pressable} from 'react-native';
const StepBar = ({steps,removeSteps}) => {
  return (
    <View
      style={styles.stepContainer}>
      {steps.map((data, index) => {
        return data != null ? (
          <View key={index}>
            <Pressable
              onPress={() => removeSteps(index + 1)}
              style={{
                width: data.id == 1 ? 100 : data.id == 2 ? 130 : 220,
                height: 40,
                backgroundColor: 'red',
                borderBottomRightRadius: 30,
                borderTopRightRadius: 30,
                flexDirection: 'row',
                marginLeft: data.id == 1 ? 0 : data.id == 2 ? -30 : -60,
                zIndex: 55 - data.id,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {data.id > 1 && (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#367588',
                    borderBottomRightRadius: 30,
                    borderTopRightRadius: 30,
                    flexDirection: 'row',
                    flex: 1,
                  }}></View>
              )}

              <Text style={styles.stepText}>{data.name}</Text>
            </Pressable>
          </View>
        ) : null;
      })}
    </View>
  );
};
export default StepBar;
const styles = StyleSheet.create({
  stepContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    height: '8%',
    marginTop: 5,
  },
  stepText: {
    color: 'white',
    fontWeight: '700',
    marginLeft: 5,
    flex: 2,
    textAlign: 'center',
  },
});
