import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';

export default function App() {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const generatePrediction = () => {
    const prediction = Math.random() > 0.5 ? 'HAUSSE' : 'BAISSE';
    const confidence = Math.floor(Math.random() * 30) + 70;
    
    const newResult = {
      prediction,
      confidence,
      time: new Date().toLocaleTimeString()
    };
    
    setResult(newResult);
    setHistory([newResult, ...history.slice(0, 4)]);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>BET261 Predictor v3.0</Text>
      
      <TouchableOpacity style={styles.button} onPress={generatePrediction}>
        <Text style={styles.buttonText}>GÉNÉRER PRÉDICTION</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>RÉSULTAT :</Text>
          <Text style={[styles.prediction, { color: result.prediction === 'HAUSSE' ? '#4CAF50' : '#F44336' }]}>
            {result.prediction}
          </Text>
          <Text style={styles.confidence}>Confiance : {result.confidence}%</Text>
          <Text style={styles.time}>{result.time}</Text>
        </View>
      )}

      <Text style={styles.historyTitle}>Historique :</Text>
      {history.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          <Text style={styles.historyText}>{item.time} - {item.prediction} - {item.confidence}%</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#4CAF50', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#4CAF50', padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 30 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  resultBox: { backgroundColor: '#1E1E1E', padding: 25, borderRadius: 15, alignItems: 'center', marginBottom: 30, borderWidth: 2, borderColor: '#4CAF50' },
  resultLabel: { color: '#888', fontSize: 14, marginBottom: 10 },
  prediction: { fontSize: 40, fontWeight: 'bold', marginBottom: 10 },
  confidence: { color: 'white', fontSize: 18, marginBottom: 5 },
  time: { color: '#888', fontSize: 14 },
  historyTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  historyItem: { backgroundColor: '#1E1E1E', padding: 15, borderRadius: 10, marginBottom: 10 },
  historyText: { color: '#CCC', fontSize: 16 },
});
