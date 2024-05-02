import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Moment from 'moment';
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
const ListExamCompleted = ({
  listExamCompleted,
  onChooseDocument,
  onKeyChange,
  page,
  totalPages,
  onPageChanged,
}) => {
  return (
    listExamCompleted.length>0?
    <View
      style={{
        height: '100%',
        justifyContent: 'space-between',
      }}>
      <FlatList
        keyExtractor={(e, i) => i}
        data={listExamCompleted}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              //onChooseDocument(item);
            }}
            style={{
              marginBottom: 15,
              borderRadius: 10,
              padding: 15,
              backgroundColor: 'white',
              
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center',flexDirection:'row'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'black',
                  flex: 6,
                }}>
                {item.exam.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                  flex: 3,
                }}>
                   {Math.floor(item.time / 60)
          .toString()
          .padStart(2, '0')} :{(item.time % 60).toString().padStart(2, '0')}
               
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: 'black',
                  flex: 1,
                }}> 
                {item.correctAnswers+"/"+item.totalQuestion}
              </Text>
              
            </View>
          </TouchableOpacity>
        )}></FlatList>
      <ControlPanel
        page={page}
        totalPages={totalPages}
        setCurrentPage={onPageChanged}
      />
    </View>:
    <View
      style={{
        height: '100%',
        alignItems:'center',
        justifyContent: 'space-between',
      }}>
      <Text
      style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red',
        flex: 2,
      }}>
      Bạn chưa làm bài trắc nghiệm nào
    </Text>
      </View>
    
  );
};
export default ListExamCompleted;
const styles = StyleSheet.create({
  examContainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  examItem: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  examTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
  },
});
