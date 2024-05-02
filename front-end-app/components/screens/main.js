import React,{useState} from 'react';
import { StyleSheet, View, Text,Image,TouchableOpacity,FlatList } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function Main({ route, navigation }) {
  //const  [icon,setIcon]=useState(f)
  const [items, setItems] = useState([
    { name: 'Tài liệu',component:'Document', code: '#1abc9c',image:require('../../assets/images/document.png')},
    { name: 'Trắc nghiệm',component:'Exam', code: '#2ecc71',image:require('../../assets/images/choice.png') },
    { name: 'Tài khoản',component:'Account', code: '#9b59b6',image:require('../../assets/images/user1.png') },
    
  ]);
return(
  <View style={{height:"100%",justifyContent:'center',paddingVertical:10}}>
  <FlatList
  numColumns={1}
  data={items}
  renderItem={({ item }) => (
    <TouchableOpacity style={styles.itemContainer}
    onPress={() => navigation.navigate(item.component)}
    >
      <Text style={styles.itemName}>{item.name}</Text>
        <Image 
        source={item.image}
        style={styles.itemImage}
        />
    </TouchableOpacity>
  )}
  >
  </FlatList>
  </View>
);
  /*return (
      <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.itemContainer}
        onPress={() => navigation.navigate(item.component)}
        >
            <Image 
            source={item.image}
            style={styles.itemImage}
            />
          <Text style={styles.itemName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );*/
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    alignItems:'center',
    backgroundColor:'white',
    padding: 10,
    height: 230,
    marginVertical:10,
    flexDirection:'row'
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black',
    flex:1,
    textAlign:'center'
  },
  itemCode: {
    fontWeight: '600',
    color:'black',
    fontSize: 12,
  },
  itemImage:{
    flex:1,
    width:80,
    height:80,
    
    resizeMode:'contain'
  }
});