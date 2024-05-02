import React, { useState } from 'react';
import { StyleSheet, Dimensions, View,TouchableOpacity,Text,ScrollView } from 'react-native';
import Pdf from 'react-native-pdf';
//import { Text } from 'react-native-reanimated/lib/typescript/Animated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_URL,UPLOAD_IMAGES_URL } from "@env"
import axios from 'axios';
const PDFDocument=({route, navigation})=> {
    const {document} = route.params;
        const source = { uri: UPLOAD_IMAGES_URL+document.url, cache: true };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf' };
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
        //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
        //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};
        const [numPages,setNumPages]=useState(null);
        const [currentPage,setCurrentPage]=useState(1)
        const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === numPages;

    const firstPageClass = isFirstPage ? 'disabled' : 'clickable';
    const lastPageClass = isLastPage ? 'disabled' : 'clickable';

    const goToFirstPage = () => {
      if (!isFirstPage) setCurrentPage(1);
    };
    const goToPreviousPage = () => {
      if (!isFirstPage) setCurrentPage(currentPage - 1);
    };
    const goToNextPage = () => {
      if (!isLastPage){
        if(document.price==0){
            setCurrentPage(currentPage + 1);
        }else{
            if(currentPage<5)
            setCurrentPage(currentPage + 1);
        }
      }
      
      
    };
    const goToLastPage = () => {
      if (!isLastPage) setCurrentPage(numPages);
    };
        const onLoadComplete=(value)=>{
            setNumPages(value);
        }
        const onPageChanged = (value)=>{
            setCurrentPage(value);
        }
        return (
            <View style={styles.container}>
                <View
                 style={{width:'100%',
                marginBottom:10,
                 padding:10,
                 backgroundColor:'white',
                 flexDirection:'row',
                 justifyContent:'space-between',
                 alignItems:'center'
                 }}>
                    <TouchableOpacity onPress={()=>goToFirstPage()}>
                        <MaterialIcons name="first-page" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>goToPreviousPage()}>
                        <MaterialIcons name="navigate-before" size={30}/>
                    </TouchableOpacity>
                    <Text>Trang</Text>
                    <Text style={{fontWeight:'bold',color:'black'}}>{currentPage}</Text>
                    <Text>trên</Text>
                    <Text style={{fontWeight:'bold',color:'black'}}>{numPages}</Text>
                    <TouchableOpacity onPress={()=>goToNextPage()}>
                        <MaterialIcons name="navigate-next" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>goToLastPage()}>
                        <MaterialIcons name="last-page" size={30}/>
                    </TouchableOpacity>
                </View>
                <Pdf
                trustAllCerts={false}
                    source={source}
                    scrollEnabled={false}
                    initialNumToRender={5}
                   // enableAnnotationRendering={false}
                    page={currentPage}
                    onLoadComplete={(numberOfPages,filePath) => {
                        onLoadComplete(numberOfPages)
                        console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
                        onPageChanged(page);
                        console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                    onPressLink={(uri) => {
                        console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity
                        onPress={()=>navigation.navigate('VnPay', {
                            document:document
                          })}
                         style={{
                            width:"100%",
                            padding:10,
                            backgroundColor:'#EE7600',
                            alignItems:'center',
                        }}>
                            <Text style={{color:'white',fontWeight:'bold'}}>Tải xuống {document.price==0?"miễn phí":document.price+" VNĐ"}</Text>

                        </TouchableOpacity>
                    </View>
            </View>
        )
}
export default PDFDocument
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'flex-start',
       // alignItems: 'center',
        marginTop: 10,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
       // height:Dimensions.get('window').height,
      // height:300
    }
});