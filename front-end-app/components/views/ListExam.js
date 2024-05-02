import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,TextInput
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ControlPanel = ({page, totalPages, setCurrentPage}) => {
    const isFirstPage = page === 0;
    const isLastPage = page + 1 === totalPages;
  
    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';
    const list = [];
    for (let i = 0; i < totalPages; i++) {
      list[i] = i + 1;
    }
    const goToFirstPage = () => {
      if (!isFirstPage) setCurrentPage(0);
    };
    const goToPreviousPage = () => {
      if (!isFirstPage) setCurrentPage(page - 1);
    };
    const goToNextPage = () => {
      if (!isLastPage) setCurrentPage(page + 1);
    };
    const goToLastPage = () => {
      if (!isLastPage) setCurrentPage(totalPages - 1);
    };
    return (
      <View
        style={{
          padding: 5,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 10,
          marginVertical: 5,
        }}>
        <TouchableOpacity onPress={() => goToFirstPage()}>
          <MaterialIcons name="first-page" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToPreviousPage()}>
          <MaterialIcons name="navigate-before" size={30} />
        </TouchableOpacity>
        {list.map((e, i) => {
          return (
            ((page + 1 <= 3 && i < 5) ||
              (page + 1 >= totalPages - 2 && i + 1 > totalPages - 5) ||
              (page + 1 > 3 &&
                page + 1 < totalPages - 2 &&
                page - i <= 2 &&
                i - page <= 2)) && (
              <TouchableOpacity
                onPress={() => setCurrentPage(i)}
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  backgroundColor: i === page ? '#EE7600' : null,
                }}>
                <Text
                  style={{
                    color: i === page ? 'white' : 'black',
                    fontWeight: i === page ? 'bold' : 'normal',
                  }}>
                  {e}
                </Text>
              </TouchableOpacity>
            )
          );
        })}
        <TouchableOpacity onPress={() => goToNextPage()}>
          <MaterialIcons name="navigate-next" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToLastPage()}>
          <MaterialIcons name="last-page" size={30} />
        </TouchableOpacity>
      </View>
    );
  };
  const SearchBar = ({onKeyChange}) => {
    return (
      <View
        style={{
          paddingHorizontal: 5,
          backgroundColor: 'white',
          borderRadius: 15,
  
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 5,
        }}>
        <TextInput
          onChangeText={e => {
            onKeyChange(e);
          }}
          style={{width: '85%'}}
          placeholder="Nhập từ khóa"></TextInput>
        <MaterialIcons name="search" size={30} />
      </View>
    );
  };
const ListExam = ({listExam,onChooseExam,onKeyChange,page,totalPages,onPageChanged}) => {
  return (
    <View
            style={styles.examContainer}>
            <SearchBar onKeyChange={onKeyChange} />
            <FlatList
              keyExtractor={(e, i) => i}
              data={listExam}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    onChooseExam(item);
                  }}
                  style={styles.examItem}>
                    <Text
                      style={styles.examTitle}>
                      {item.title}
                    </Text>
                    <Text style={[styles.text16Bold,{flex:1}]}>
                      {item.questions.length} câu
                    </Text>
                    <MaterialIcons name="access-time" size={30} />
                    <Text style={styles.text16Bold}>
                      {item.time}'
                    </Text>
                </TouchableOpacity>
              )}></FlatList>
            <ControlPanel
              page={page}
              totalPages={totalPages}
              setCurrentPage={onPageChanged}
            />
          </View>
        );
}; 
export default ListExam;
const styles = StyleSheet.create({
    examContainer:{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      examItem:{
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
         alignItems: 'center'
      },
      examTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
      },
});
