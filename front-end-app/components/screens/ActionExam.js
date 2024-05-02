import React, {useRef, useState, useEffect,useContext} from 'react';
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
  Pressable,
  ImageBackground,useWindowDimensions
} from 'react-native';
import * as Progress from 'react-native-progress';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { API_URL,UPLOAD_IMAGES_URL } from "@env"
import RenderHtml from 'react-native-render-html';
import AuthContext from '../../contexts/JWTAuthContext';
const StartScreen = ({isStartExamChange, exam}) => {
  return (
    <ImageBackground source={require('../../assets/images/bg2.jpg')}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}>
        <View style={{marginBottom: 15}}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}>
            {exam.title}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}>
            Số câu : {exam.questions.length}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              color: 'black',
            }}>
            Thời gian : {exam.time} phút
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => isStartExamChange(true)}
          style={{
            padding: 10,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: '#008080',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#008080'}}>
            {' '}
            Bắt đầu
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const Answer = ({value, index, chooseAnswer, selectedAnswer}) => {
  const { width } = useWindowDimensions();
  return (
    <Pressable
    style={{width:"96%"}}
      onPress={() => {
        chooseAnswer(index);
      }}>
      <View
        style={{
          
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderWidth: selectedAnswer != -1 && selectedAnswer == index ? 2 : 0,
          borderColor:
            selectedAnswer != -1 && selectedAnswer == index
              ? '#00FFFF'
              : 'black',
          //'#00FFFF'
          borderRadius: 10,
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
            
          }}>
          <RenderHtml
      contentWidth={width}
      source={{html:value}}
    />
        </Text>
      </View>
    </Pressable>
  );
};
const Question = ({exam, selectedQuestion, chooseAnswer, statusQuestion}) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{marginTop: 10, width: '100%'}}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'black',
            padding: 5,
            
          }}>
            <RenderHtml
      contentWidth={width}
      source={{html: exam.questions[selectedQuestion].html}}
    />
          
        </Text>
        {exam.questions[selectedQuestion].image&&<Image
          style={{width: '100%', height: 300, resizeMode: 'contain'}}
          source={{
            uri: UPLOAD_IMAGES_URL+exam.questions[selectedQuestion].image,
          }}
        />}
      </View>
      <View style={{padding:8, backgroundColor: '#c0c5ce'}}>
        {exam.questions[selectedQuestion].answers.map((e, i) => (
          <Answer
            value={e.html}
            index={i}
            chooseAnswer={chooseAnswer}
            selectedAnswer={statusQuestion[selectedQuestion]?.option}
          />
        ))}
      </View>
    </View>
  );
};
const ActionExam = ({route, navigation}) => {
  const {user}=useContext(AuthContext);
  const {exam} = route.params;
  const { width } = useWindowDimensions();
  const [time, setTime] = useState(exam.time * 60);
  const [leftTime, setlefTime] = useState(time);
  const [usedTime, setUsedTime] = useState(0);
  const [statusQuestion, setStatusQuestion] = useState([]);
  useEffect(() => {
    let list = [];
    exam.questions.map((e, i) => {
      let item = {option: -1, flag: false};
      list[i] = item;
    });
    setStatusQuestion(list);
  }, []);
  const chooseAnswer = answerIndex => {
    let list = statusQuestion;
    list[selectedQuestion].option = answerIndex;
    setStatusQuestion(list);
   
  };
  const flagedAnswer = () => {
    let list = statusQuestion;
    list[selectedQuestion].flag = !list[selectedQuestion].flag;
    setStatusQuestion(list);
    //console.log(answerIndex);

    /* let item = statusQuestion[selectedQuestion];
    item.flag = !item.flag;
    setStatusQuestion(preve => {
      return {
        ...preve,
        [selectedQuestion]: item,
      };
    });*/
  };
  const [timer, setTimer] = useState({
    minutes: 0,
    seconds: 60,
  });
  useEffect(() => {
    setTimer(preve => {
      return {
        minutes: Math.floor(leftTime / 60)
          .toString()
          .padStart(2, '0'),
        seconds: (leftTime % 60).toString().padStart(2, '0'),
      };
    });
  }, [leftTime]);
  const [t, setT] = useState();
  /* useEffect(() => {
    handleTime();
    return () => clearInterval(id.current);
  }, []);*/
  let id = useRef();
  const handleTime = () => {
    id.current = setInterval(() => {
      setlefTime(pre => pre - 1);
      setUsedTime(pre=>pre+1);
    }, 1000);
  };
  const resetTime = () => {
    clearInterval(id.current);
    id.current = 0;
    setlefTime(time);
    setUsedTime(0);
  };
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const onNext = () => {
    setSelectedQuestion(selectedQuestion + 1);
  };
  const onPre = () => {
    setSelectedQuestion(selectedQuestion - 1);
  };
  const [showListQuestion, setShowListQuestion] = useState(false);
  const showListQuestionChange = value => {
    setShowListQuestion(value);
  };
  const [isStartExam, setIsStartExam] = useState(false);
  const isStartExamChange = value => {
    setIsStartExam(value);
    if (value) {
      handleTime();
    }
  };
  const onSubmit = () => {
    navigation.navigate('Result', {
      questions: exam.questions,
      statusQuestion: statusQuestion,
      usedTime:usedTime,
      userId:user.id,
      examId:exam.id
    });
    isStartExamChange(false);
  };
  useEffect(() => {
    if (leftTime == 0) {
      onSubmit();
    }
  }, [leftTime]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      (async () => {
        let list = [];
        exam.questions.map((e, i) => {
          let item = {option: -1, flag: false};
          list[i] = item;
        });
        setStatusQuestion(list);
        resetTime();
        setSelectedQuestion(0);
      })();
    });
    return unsubscribe;
  }, [navigation]);
  return isStartExam ? (
    <View style={styles.sectionContainer}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'black',
            }}>
            Số câu đã hoàn thành:{' '}
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'black',
                padding: 5,
              }}>
              {' '}
              {statusQuestion.filter(e => e.option != -1).length}/
              {exam.questions.length}
            </Text>
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            padding: 5,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 5,
            }}>
            {timer.minutes}:{timer.seconds}
          </Text>
         
          <Progress.Bar
            progress={leftTime / time}
            color={leftTime / time > 0.1 ? 'green' : 'red'}
            width={400}
          />
        </View>
        <Question
          exam={exam}
          selectedQuestion={selectedQuestion}
          chooseAnswer={chooseAnswer}
          statusQuestion={statusQuestion}
        />
      </ScrollView>
      <View
        style={{
          bottom: 0,
          padding: 5,
          width: '100%',
          backgroundColor: 'white',
        }}>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              flagedAnswer();
            }}>
            <MaterialCommunityIcons
              style={{
                fontSize: 34,
                fontWeight: '800',
                color: statusQuestion[selectedQuestion]?.flag ? 'red' : 'black',
              }}
              name={
                statusQuestion[selectedQuestion]?.flag
                  ? 'flag-remove-outline'
                  : 'flag-plus-outline'
              }
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              padding: 5,
            }}>
            Câu {selectedQuestion + 1}
          </Text>
          <TouchableOpacity
            onPress={() => {
              showListQuestionChange(true);
            }}>
            <MaterialCommunityIcons
              style={{fontSize: 34, fontWeight: '800', color: 'black'}}
              name="view-list"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            onPress={() => onPre()}
            disabled={selectedQuestion == 0}>
            <MaterialCommunityIcons
              style={{
                fontSize: 34,
                fontWeight: '800',
                color: selectedQuestion != 0 ? 'black' : 'gray',
              }}
              name="arrow-left-circle-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSubmit();
            }}
            style={{
              width: '30%',
              borderRadius: 10,
              padding: 10,
              alignItems: 'center',
              backgroundColor: '#01ba76',
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
              Nộp bài
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onNext()}
            disabled={selectedQuestion == exam.questions.length - 1}>
            <MaterialCommunityIcons
              style={{
                fontSize: 34,
                fontWeight: '800',
                color:
                  selectedQuestion != exam.questions.length - 1
                    ? 'black'
                    : 'gray',
              }}
              name="arrow-right-circle-outline"
            />
          </TouchableOpacity>
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
              numColumns={4}
              renderItem={({item, index}) => (
                <View style={{height: 60, width: 60, margin: 8}}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedQuestion(index), showListQuestionChange(false);
                    }}
                    style={{
                      width: '100%',
                      borderWidth: item?.option != -1 ? 3 : 1,
                      borderRadius: 10,
                      flex: 1,
                      borderColor: item.option != -1 ? 'green' : 'black',
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
                    {item.flag && (
                      <TouchableOpacity
                        style={{position: 'absolute', top: -8, right: -8}}>
                        <Ionicons name="flag" size={28} color="red" />
                      </TouchableOpacity>
                    )}
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
  ) : (
    <StartScreen isStartExamChange={isStartExamChange} exam={exam} />
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    //backgroundColor: '#E6E6FA',
    position: 'relative',
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

export default ActionExam;
