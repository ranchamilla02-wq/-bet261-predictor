import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2500));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  const [dom, setDom] = useState('');
  const [ext, setExt] = useState('');
  const [c1, setC1] = useState('');
  const [cX, setCX] = useState('');
  const [c2, setC2] = useState('');
  const [result, setResult] = useState(null);
  const [profil, setProfil] = useState({ paris: 0, gagnes: 0, serie: 0, record: 0 });
  const [historique, setHistorique] = useState([]);

  const poisson = (l, k) => Math.pow(l, k) * Math.exp(-l) / factorial(k);
  const factorial = n => (n <= 1 ? 1 : n * factorial(n - 1));

  const calculer = () => {
    if (!c1 || !cX || !c2 || !dom || !ext) return;

    const cote1 = parseFloat(c1);
    const coteX = parseFloat(cX);
    const cote2 = parseFloat(c2);

    const lambda1 = 1 / cote1 * 2.5;
    const lambda2 = 1 / cote2 * 2.5;

    let p1 = 0, pX = 0, p2 = 0;

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        const prob = poisson(lambda1, i) * poisson(lambda2, j);
        if (i > j) p1 += prob;
        else if (i === j) pX += prob;
        else p2 += prob;
      }
    }

    p1 = p1 * 0.7 + 0.1;
    pX = pX * 0.7 + 0.1;
    p2 = p2 * 0.7 + 0.1;

    const total = p1 + pX + p2;
    p1 = (p1 / total * 100).toFixed(1);
    pX = (pX / total * 100).toFixed(1);
    p2 = (p2 / total * 100).toFixed(1);

    let pred = '1', conf = p1;
    if (pX > p1 && pX > p2) { pred = 'X'; conf = pX; }
    if (p2 > p1 && p2 > pX) { pred = '2'; conf = p2; }

    const newResult = { match: `${dom} vs ${ext}`, pred, conf, p1, pX, p2 };
    setResult(newResult);
  };

  if (!appIsReady) return null;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>BET261 PREDICTOR</Text>

      <View style={styles.card}>
        <TextInput style={styles.input} placeholder="⚽ Équipe Domicile" placeholderTextColor="#777" value={dom} onChangeText={setDom} />
        <TextInput style={styles.input} placeholder="⚽ Équipe Extérieur" placeholderTextColor="#777" value={ext} onChangeText={setExt} />

        <View style={styles.row}>
          <TextInput style={styles.inputSmall} placeholder="1.85" placeholderTextColor="#777" value={c1} onChangeText={setC1} />
          <TextInput style={styles.inputSmall} placeholder="3.40" placeholderTextColor="#777" value={cX} onChangeText={setCX} />
          <TextInput style={styles.inputSmall} placeholder="4.20" placeholderTextColor="#777" value={c2} onChangeText={setC2} />
        </View>

        <TouchableOpacity style={styles.button} onPress={calculer}>
          <Text style={styles.buttonText}>🔥 DÉCHIRER LES COTES 🔥</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.match}>{result.match}</Text>

          <Text style={styles.prediction}>{result.pred}</Text>
          <Text style={styles.conf}>Confiance {result.conf}%</Text>

          <View style={styles.row}>
            <Text style={styles.proba}>1: {result.p1}%</Text>
            <Text style={styles.proba}>X: {result.pX}%</Text>
            <Text style={styles.proba}>2: {result.p2}%</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const neon = '#00FF9C';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05070D',
    padding: 15
  },

  title: {
    color: neon,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: neon,
    textShadowRadius: 15
  },

  card: {
    backgroundColor: '#0B0F1A',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: neon,
    shadowColor: neon,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    marginBottom: 20
  },

  input: {
    backgroundColor: '#05070D',
    color: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222'
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15
  },

  inputSmall: {
    flex: 1,
    backgroundColor: '#05070D',
    color: '#fff',
    padding: 12,
    borderRadius: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#222'
  },

  button: {
    backgroundColor: neon,
    padding: 18,
    borderRadius: 30,
    shadowColor: neon,
    shadowOpacity: 0.6,
    shadowRadius: 20
  },

  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18
  },

  resultCard: {
    backgroundColor: '#0B0F1A',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: neon
  },

  match: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  },

  prediction: {
    color: neon,
    fontSize: 60,
    textAlign: 'center',
    fontWeight: '900',
    textShadowColor: neon,
    textShadowRadius: 25
  },

  conf: {
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 10
  },

  proba: {
    color: neon,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
