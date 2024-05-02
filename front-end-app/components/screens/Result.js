import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Icon,useWindowDimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {API_URL, UPLOAD_IMAGES_URL} from '@env';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
const Answer = ({value, index, chooseAnswer, selectedAnswer}) => {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => {
        chooseAnswer(index);
      }}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: selectedAnswer != -1 && selectedAnswer == index ? 2 : 1,
          borderColor:
            selectedAnswer != -1 && selectedAnswer == index
              ? '#00FFFF'
              : 'black',
          //'#00FFFF'
          borderRadius: 20,
          marginVertical: 5,
          padding: 5,
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}>
          {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
        </Text>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 14,
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'black',
          }}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Question = ({index, question, selectedAnswer}) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        borderWidth: 0,
        position: 'relative',
        padding: 5,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: '#c0c5ce',
        borderColor: selectedAnswer == question.trueIndex ? 'green' : 'red',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          borderRadius: 10,
          marginBottom: 5,
          // borderTopLeftRadius:10,
          //borderTopRightRadius:10
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              borderRadius: 5,
              marginTop: 5,
              marginLeft: 5,
              backgroundColor: '#EE7600',
              width: '20%',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: 'white',
                padding: 5,
              }}>
              Câu {index + 1}
            </Text>
          </View>
          { selectedAnswer == question.trueIndex ?
          <Ionicons name="checkmark-circle-outline" size={30}
           color="green" 
           />:<Ionicons name="close-circle-outline" size={30}
           color="red" 
           />}
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
            padding: 5,
          }}>
         <RenderHtml
      contentWidth={width}
      source={{html: question.html}}
    />
        </Text>
        {question.image!=null&&
        <Image
          style={{
            width: '100%',
            height: 300,
            marginBottom: 5,
            resizeMode: 'contain',
          }}
          source={{
            uri: UPLOAD_IMAGES_URL + question.image,
          }}
        />}
      </View>
      {question.answers.map((value, index) => (
        <View>
          <View
            style={{
              backgroundColor: 'white',
              
              
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth:
                (selectedAnswer == index &&
                  selectedAnswer == question.trueIndex) ||
                (selectedAnswer == index &&
                  selectedAnswer != question.trueIndex) ||
                question.trueIndex == index
                  ? 2
                  : 0,
              borderColor:
                selectedAnswer == index && selectedAnswer == question.trueIndex
                  ? 'green'
                  : selectedAnswer == index &&
                    selectedAnswer != question.trueIndex
                  ? 'red'
                  : question.trueIndex == index
                  ? '#0abab5'
                  : 'black',
              //'#00FFFF'
              borderRadius: 10,
              marginVertical: 5,
              padding: 2,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
                textAlign: 'center',
              }}>
              {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
            </Text>
            <Text
              style={{
                marginLeft: 15,
                fontSize: 14,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'black',
              }}>
              <RenderHtml
      contentWidth={width}
      source={{html: value.html}}
    />
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
const Result = ({route, navigation}) => {
  const {questions, statusQuestion,usedTime,userId,examId} = route.params;
  const [numCorrect, setNumCorrect] = useState(0);
  const [request,setRequest]=useState({
    userId:0,
    examId:0,
	  correctAnswers:0,
	  time:0
  })
  useEffect(() => {
    let i = questions.filter(
      (e, i) => e.trueIndex == statusQuestion[i].option,
    ).length;
    setNumCorrect(i);
    setRequest({
      userId:userId,
      examId:examId,
      correctAnswers:i,
      time:usedTime
    })
  }, []);
  const addCompleted=async(req)=>{
    try{
    const res=await axios.post(`${API_URL}/user/addExamCompleted`,req)
    
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if(request.userId!=0){
addCompleted(request);
    }
  },[request])
  const [index, setIndex] = useState(0);

  const ref = useRef(null);
  const toIndex = index => {
    ref.current?.scrollToIndex({index, animated: true, viewPosition: 0.5});
  };
  const [showListQuestion, setShowListQuestion] = useState(false);
  const showListQuestionChange = value => {
    setShowListQuestion(value);
  };
  return (
    <View style={styles.sectionContainer}>
      <View style={{width: '100%'}}>
        <View
          style={{
            marginVertical: '1%',
            backgroundColor: 'white',
            height: '15%',
          }}>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}> Số câu đúng</Text>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              {' '}
              {numCorrect}/{questions.length}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}> Điểm số:</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
                {' '}
                {Math.round(numCorrect * (10 / questions.length) * 100) / 100} đ
              </Text>
            </View>
            <TouchableOpacity onPress={() => showListQuestionChange(true)}>
              <MaterialCommunityIcons
                style={{fontSize: 34, fontWeight: '800', color: 'black'}}
                name="view-list"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: '84%', paddingHorizontal: '1%'}}>
          <FlatList
            data={questions}
            keyExtractor={(e, i) => i}
            renderItem={({item, index}) => (
              <Question
                key={index}
                question={item}
                index={index}
                selectedAnswer={statusQuestion[index].option}
              />
            )}
            ref={ref}
            onScrollToIndexFailed={info => {
              const wait = new Promise(resolve => setTimeout(resolve, 500));
              wait.then(() => {
                ref.current?.scrollToIndex({index: info.index, animated: true});
              });
            }}></FlatList>
        </View>
      </View>
      <Modal
        style={{justifyContent: 'center', alignItems: 'center'}}
        isVisible={showListQuestion}
        backdropOpacity={0.2}>
        <View
          style={{
            width: '98%',
            height: '98%',
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              height: '90%',
              width: '90%',
              alignItems: 'center',
              marginTop: 10,
              borderRadius: 10,
            }}>
            <FlatList
              data={statusQuestion}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              renderItem={({item, index}) => (
                <View style={{height: 60, width: 60, margin: 8}}>
                  <TouchableOpacity
                    onPress={() => {
                      toIndex(index), showListQuestionChange(false);
                    }}
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderRadius: 10,
                      flex: 1,
                      borderColor:
                        questions[index].trueIndex == item.option
                          ? 'green'
                          : 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {index + 1}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}></FlatList>
          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                showListQuestionChange(false);
              }}>
              <Ionicons name="close-circle-outline" size={32} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#c0c5ce',
    position: 'relative',
    padding: 0,
  },
  backArrow: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  mainTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  psTitle: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '400',
  },
  loginAvatar: {
    marginTop: 30,
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  inputView: {
    marginTop: 20,
    width: '85%',
    height: 60,
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    marginLeft: 5,
    width: '70%',
    fontWeight: '700',
  },
  inputRight: {},
  checkIcon: {
    position: 'absolute',
    right: 8,
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
  showPassword: {},
  loginButton: {
    marginTop: 30,
    width: '85%',
    height: 60,
    borderRadius: 5,
    backgroundColor: '#01ba76',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 22,
    fontWeight: '800',
    color: 'white',
  },
  register: {
    marginTop: 30,
    flexDirection: 'row',
  },
  registerText: {
    fontWeight: '600',
    fontSize: 16,
  },
  registerLink: {
    marginLeft: 3,
    color: '#30DEB0',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    marginTop: 30,
    color: '#30DEB0',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Result;
