import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
const ListGrade = ({listGrade, onGradeChange,addStep,steps}) => {
  return (
          <View>
            <FlatList
              key={3}
              keyExtractor={(e, i) => e.id}
              data={listGrade}
              numColumns={3}
              renderItem={({item, index}) => (
                <View style={{height: '100%'}}>
                  <TouchableOpacity
                    style={styles.gradeItem}
                    onPress={() => {
                      onGradeChange(item.id),
                        addStep(item.name, steps.length + 1);
                    }}>
                    <Text
                      style={styles.gradeNameText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}></FlatList>
          </View>
        );
}; 
export default ListGrade;
const styles = StyleSheet.create({
  gradeItem:{
    margin: 15,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 100,
  },
  gradeNameText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006666',
  }
});
