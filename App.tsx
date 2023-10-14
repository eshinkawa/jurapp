import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchGoogleSheetData = async () => {
      const url = `https://sheet.best/api/sheets/369c4a07-dbf4-48ff-ab1f-dd83946799c3`;

      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const data = [response.data[0]];
          setData(data);
          setFormData(data[0]);
        }
      } catch (error) {
        console.error('Error fetching Google Sheet data:', error);
      }
    };

    fetchGoogleSheetData();
  }, []);

  const handleChange = (key, value) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value,
    }));

    console.log(formData)
  };

  const handleSubmit = () => {
    // Send formData to your server using Axios or perform other actions
    axios.post('https://sheet.best/api/sheets/369c4a07-dbf4-48ff-ab1f-dd83946799c3', formData)
      .then(response => {
        // Handle the response
        console.log(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 24 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {data.map((dataObject, index) => (
          <View key={index}>
            {Object.keys(dataObject).map((key, subIndex) => (
              <View key={subIndex}>
                <Text style={styles.key}>{key}:</Text>
                <TextInput
                  placeholder={key}
                  style={styles.input}
                  value={formData[key] || dataObject[key]}
                  onChangeText={(text) => handleChange(key, text)}
                />
              </View>
            ))}
          </View>
        ))}
        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  key: {
    fontSize: 16,
  },
  input: {
    marginTop: 6,
    marginBottom: 16,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 5,
  },
});

export default App; 
