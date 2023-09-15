// Date: 9/9/2021
// Note: React Native Image Picker
//https://github.com/rodrigorgtic.png

import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { Button } from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as FileSystem from 'expo-file-system';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { Classification, ClassificationProps } from './components/Classificaton';


export default function App() {
  const [selectedImageUri, setSelectedImageUri] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ClassificationProps[]>([]);

  async function handleSelectImage() {
    setLoading(true)

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });  
      if(!result.canceled) {
        const { uri } = result.assets[0];
        setSelectedImageUri(uri)
        await imageClassification(uri)
      } 
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function imageClassification(imageUri: string) {
     await  tf.ready();
      const model = await mobilenet.load();
    
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const imageBuffer = tf.util.encodeString(imageBase64, 'base64').buffer;
      const raw = new Uint8Array(imageBuffer);
      const imageTensor = decodeJpeg(raw);
    
      const classificationResults = await model.classify(imageTensor);
      console.log('classificationResults', classificationResults);
      setResults(classificationResults)
  }

  return (
    <View style={styles.container}>
      
      <StatusBar style="light"
        backgroundColor='transparent'
        translucent />

      <Image 
        source={selectedImageUri ? { uri: selectedImageUri } : require('./assets/image_placeholder.png')}
        style={{ marginTop: 50, width: 300, height: 300,}}
      />

       <View style={styles.results}>

        {/* Testing layout
         <Classification 
            data={{ className: 'test', probability: 0.5 }}
        /> 
        */}

        {results.map((result, index) => (

          <Classification 
            key={index}
            data={result}
          />
        ))} 

      </View>

      {loading && <ActivityIndicator size="large" color="#00ff00" style={{ marginTop: 20 }}/>}

      <Button 
        title="Pick an image" 
        onPress={() => handleSelectImage()} 
     />
    </View>
  );
}

