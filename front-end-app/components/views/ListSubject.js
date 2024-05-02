import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,Image
} from 'react-native';
const ListSubject = ({listSubject,onSubjectChange,addStep,steps}) => {
  return (
    <View style={styles.container}>
    <FlatList
      keyExtractor={(e, i) => i}
      data={listSubject}
      renderItem={({item, index}) => (
        <View>
          <TouchableOpacity
            style={styles.subjectItem}
            onPress={() => {
              onSubjectChange(item.id),
                addStep(item.name, steps.length + 1);
            }}>
            <Text
              style={styles.subjectNameText}>
              {item.name}
            </Text>
            {item.image !== null ? (
              <Image
                style={styles.subjectImage}
                source={{uri: item.image}}
              />
            ) : null}
          </TouchableOpacity>
        </View>
      )}></FlatList>
  </View>
        );
}; 
export default ListSubject;
const styles = StyleSheet.create({
    container:{height: '100%', 
    width: '100%'
},
    text16Bold:{
        fontSize: 16,
         fontWeight: 'bold'
        },
      subjectItem:{
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 0,
        backgroundColor: 'white',
      },
      subjectNameText:{
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
      },
      subjectImage:{width: 70, height: 100, resizeMode: 'contain'}
});
