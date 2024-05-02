import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import { API_URL,UPLOAD_IMAGES_URL } from "@env"
import ListGrade from '../views/ListGrade';
import ListSubject from '../views/ListSubject';
import ListDocument from '../views/ListDocument';
import StepBar from '../views/StepBar';
const Document = ({route, navigation}) => {
  const [steps, setSteps] = useState([{id: 1, name: 'Tài liệu'}]);
  const addStep = (value, index) => {
    setSteps([...steps, {id: index, name: value}]);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [grade, setGrade] = useState(0);
  const [subject, setSubject] = useState(0);
  const [key, setKey] = useState('');
  const [listDocument, setListDocument] = useState([]);
  const [listGrade, setListGrade] = useState([]);
  const [listSubject, setListSubject] = useState([]);
  const onPageChanged = value => {
    setPage(value);
  };
  const increaseView=async(id)=>{
    try{
      const response = await axios.get(`${API_URL}/document/increase/${id}`)
      
    }
    catch(err){
    }
  }
  const getListGrade = async () => {
    try{
      const res = await axios.get(`${API_URL}/grade/getAll`)
      setListGrade(res.data);
    }
    catch(err){
    
    }
  };
  const getListSubject = async id => {
   
    try{
      const res = await axios.get(`${API_URL}/subject/getByGradeId/${id}`)
      setListSubject(res.data);
    }
    catch(err){
    
    }
  };
  const getListDocument = async () => {
    
    try{
      const res = await axios.get(`${API_URL}/document/getAll/${grade}/${subject}/${page}/${rowsPerPage}?key=${key}`)
    setListDocument(res.data.content);
    setTotal(res.data.totalElement);
    setTotalPages(res.data.totalPages);
    }
    catch(err){
    
    }
  
  };
  useEffect(() => {
    if (grade != 0) {
      getListSubject(grade);
    } else {
      setListSubject([]);
    }
  }, [grade]);
  useEffect(() => {
    getListGrade();
  }, []);
  const onGradeChange = value => {
    setGrade(value);
  };
  const onSubjectChange = value => {
    setSubject(value);
  };
  const onKeyChange = value => {
    setKey(value);
  };
  useEffect(() => {
    getListDocument();
  }, [page, rowsPerPage, grade, subject, key]);
  const removeSteps = index => {
    let list = steps;
    list = list.filter((e, i) => i < index);

    setSteps(list);
  };
  const onChooseDocument = value => {
    increaseView(value.id);
    navigation.navigate('Ex', {document: value, name: value.name});
  };
  return (
    <View style={styles.container}>
      <StepBar steps={steps} removeSteps={removeSteps}/>
      <View
        style={styles.listContainer}>
        {steps.length == 1 ? (
          <ListGrade listGrade={listGrade} onGradeChange={onGradeChange} addStep={addStep} steps={steps}/>
        ) : steps.length == 2 ? (
          <ListSubject listSubject={listSubject} onSubjectChange={onSubjectChange} addStep={addStep} steps={steps}/>
        ) : (
          <ListDocument
            listDocument={listDocument} onChooseDocument={onChooseDocument} page={page} totalPages={totalPages} onPageChanged={onPageChanged} onKeyChange={onKeyChange}
          />
        )}
      </View>
    </View>
  );
};
export default Document;
const styles = StyleSheet.create({
  container:{
    backgroundColor: '#367588',
    height: '100%'},
  listContainer:{
    padding: 5,
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
