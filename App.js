import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

export default function App() {

  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [cote, setCote] = useState('');
  const [result, setResult] = useState(null);

  const analyser = () => {
    if (!home || !away) return;

    const prob = Math.floor(Math.random() * 40) + 60;
    const score = `${Math.floor(Math.random()*3)} - ${Math.floor(Math.random()*3)}`;

    let conseil = "⚠️ MOYEN";
    if (prob > 75) conseil = "🔥 JOUER";
    if (prob < 65) conseil = "❌ ÉVITER";

    setResult({
      match: `${home} vs ${away}`,
      prob,
      score,
      conseil
    });
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>BET261</Text>
        <Text style={styles.profilBtn}>PROFIL</Text>
      </View>

      {/* PROFIL */}
      <View style={styles.profilCard}>
        <Text style={styles.profilTitle}>MON PROFIL 🌱 DÉBUTANT</Text>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statLabel}>PRÉCISION</Text>
            <Text style={styles.statValue}>72%</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>MATCHS</Text>
            <Text style={styles.statValue}>128</Text>
          </View>

          <View>
            <Text style={styles.statLabel}>RÉUSSITE</Text>
            <Text style={styles.statValue}>+18%</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>
        ANALYSE AUTOMATIQUE • UPSETS 30% INCLUS
      </Text>

      {/* INPUT */}
      <View style={styles.card}>

        <Text style={styles.label}>ÉQUIPE DOMICILE</Text>
        <TextInput
          placeholder="⚽ ÉQUIPE DOMICILE"
          placeholderTextColor="#555"
          style={styles.input}
          value={home}
          onChangeText={setHome}
        />

        <Text style={styles.label}>ÉQUIPE EXTÉRIEURE</Text>
        <TextInput
          placeholder="⚽ ÉQUIPE EXTÉRIEURE"
          placeholderTextColor="#555"
          style={styles.input}
          value={away}
          onChangeText={setAway}
        />

        <Text style={styles.label}>COTE (optionnel)</Text>
        <TextInput
          placeholder="Ex: 1.85"
          placeholderTextColor="#555"
          style={styles.inputSmall}
          value={cote}
          onChangeText={setCote}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={analyser}>
          <Text style={styles.buttonText}>LANCER ANALYSE</Text>
        </TouchableOpacity>

      </View>

      {/* RESULT */}
      {result && (
        <View style={styles.resultCard}>

          <Text style={styles.matchText}>{result.match}</Text>

          <Text style={styles.predictionValue}>
            {result.prob}%
          </Text>

          <Text style={styles.scoreValue}>
            Score prévu : {result.score}
          </Text>

          <Text style={
            result.conseil.includes("JOUER")
              ? styles.conseilJouer
              : result.conseil.includes("ÉVITER")
              ? styles.conseilEviter
              : styles.conseilMoyen
          }>
            {result.conseil}
          </Text>

        </View>
      )}

      <Text style={styles.disclaimer}>
        ⚠️ Ceci est une simulation IA. Pariez de manière responsable.
      </Text>

    </ScrollView>
  );
}

/* 🎨 STYLES FUTURISTES */

const neon = '#00FF88';
const bg = '#050505';
const card = '#0B0B0B';

const styles = StyleSheet.create({

  container: {
    flex:1,
    backgroundColor:bg,
    padding:15
  },

  header: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:20,
    marginBottom:10
  },

  title: {
    color:'#fff',
    fontSize:28,
    fontWeight:'900',
    letterSpacing:1
  },

  profilBtn: {
    color:neon,
    fontSize:14,
    fontWeight:'700',
    backgroundColor:'#111',
    padding:8,
    borderRadius:12,
    borderWidth:1,
    borderColor:neon
  },

  profilCard: {
    backgroundColor:card,
    padding:18,
    borderRadius:20,
    marginBottom:15,
    borderWidth:1,
    borderColor:neon,
    shadowColor:neon,
    shadowOpacity:0.4,
    shadowRadius:10
  },

  profilTitle: {
    color:'#fff',
    fontSize:16,
    fontWeight:'900',
    textAlign:'center',
    marginBottom:12
  },

  statsRow: {
    flexDirection:'row',
    justifyContent:'space-around'
  },

  statLabel: {
    color:'#777',
    fontSize:11
  },

  statValue: {
    color:neon,
    fontSize:18,
    fontWeight:'bold'
  },

  subtitle: {
    color:neon,
    fontSize:13,
    textAlign:'center',
    marginBottom:15,
    letterSpacing:1
  },

  card: {
    backgroundColor:card,
    padding:20,
    borderRadius:20,
    marginBottom:15,
    borderWidth:1,
    borderColor:'#222'
  },

  input: {
    backgroundColor:'#0A0A0A',
    color:'#fff',
    padding:15,
    borderRadius:12,
    marginBottom:12,
    fontSize:16,
    borderWidth:1,
    borderColor:'#222'
  },

  inputSmall: {
    backgroundColor:'#0A0A0A',
    color:neon,
    padding:12,
    borderRadius:12,
    fontSize:16,
    textAlign:'center',
    borderWidth:1,
    borderColor:neon
  },

  label: {
    color:neon,
    fontSize:12,
    marginBottom:5,
    fontWeight:'600'
  },

  button: {
    backgroundColor:neon,
    padding:18,
    borderRadius:14,
    marginTop:10,
    shadowColor:neon,
    shadowOpacity:0.6,
    shadowRadius:12
  },

  buttonText: {
    color:'#000',
    textAlign:'center',
    fontWeight:'900',
    fontSize:17,
    letterSpacing:1
  },

  resultCard: {
    backgroundColor:card,
    padding:20,
    borderRadius:20,
    borderWidth:1,
    borderColor:neon,
    marginBottom:20
  },

  matchText: {
    color:neon,
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:15
  },

  predictionValue: {
    color:neon,
    fontSize:60,
    fontWeight:'900',
    textAlign:'center'
  },

  scoreValue: {
    color:'#fff',
    fontSize:28,
    fontWeight:'900',
    textAlign:'center',
    marginTop:10
  },

  conseilJouer: {
    color:neon,
    fontSize:18,
    fontWeight:'900',
    textAlign:'center',
    marginTop:10
  },

  conseilMoyen: {
    color:'#FFA500',
    fontSize:18,
    fontWeight:'900',
    textAlign:'center',
    marginTop:10
  },

  conseilEviter: {
    color:'#FF4444',
    fontSize:18,
    fontWeight:'900',
    textAlign:'center',
    marginTop:10
  },

  disclaimer: {
    color:'#555',
    fontSize:11,
    marginTop:20,
    textAlign:'center'
  }

});
