import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(() => SplashScreen.hideAsync(), 2000);

export default function App() {
  const [cote1, setCote1] = useState('1.85');
  const [coteX, setCoteX] = useState('3.40');
  const [cote2, setCote2] = useState('4.20');
  const [resultat, setResultat] = useState('');

  const calculerPrediction = () => {
    const c1 = parseFloat(cote1);
    const cx = parseFloat(coteX);
    const c2 = parseFloat(cote2);
    
    if (c1 < cx && c1 < c2) setResultat('Victoire Domicile 🔥');
    else if (c2 < c1 && c2 < cx) setResultat('Victoire Extérieur 🔥');
    else setResultat('Match Nul 🧠');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logoBet}>BET<Text style={styles.logo261}>261</Text></Text>
            <Text style={styles.logoSub}>PREDICTOR</Text>
          </View>
          <View style={styles.profilBox}>
            <Text style={styles.profilText}>👤 SNIPER261</Text>
          </View>
        </View>

        {/* CARD PROFIL */}
        <View style={styles.cardProfil}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>MON PROFIL 🌱 DÉBUTANT</Text>
          </View>
          
          <View style={styles.statsRow}>
            <Image source={{ uri: 'https://i.imgur.com/3ZQ3ZQ3.png' }} style={styles.ballImage} />
            <View style={styles.statsCol}>
              <Text style={styles.statLabel}>WINRATE</Text>
              <Text style={styles.statValue}>0%</Text>
              <Text style={styles.statLabel}>PARIS</Text>
              <Text style={styles.statValue}>0/0</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={styles.statLabel}>PROFIT</Text>
              <Text style={styles.statValueGreen}>+0 AR</Text>
              <Text style={styles.statLabel}>SÉRIE</Text>
              <Text style={styles.statValue}>0 🔥</Text>
            </View>
            <View style={styles.statsCol}>
              <Text style={styles.statLabel}>RECORD</Text>
              <Text style={styles.statValue}>0 🏆</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.objectif}>OBJECTIF : 50000 AR (20%)</Text>
        </View>

        {/* ANALYSE */}
        <View style={styles.analyseSection}>
          <Text style={styles.analyseTitle}>• ANALYSE AUTOMATIQUE •</Text>
          <Text style={styles.analyseSub}>UPSETS 30% INCLUS</Text>
        </View>

        {/* INPUTS */}
        <TouchableOpacity style={styles.inputCard}>
          <Text style={styles.inputLabel}>⚽ ÉQUIPE DOMICILE</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputCard}>
          <Text style={styles.inputLabel}>⚽ ÉQUIPE EXTÉRIEURE</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {/* COTES */}
        <View style={styles.cotesRow}>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE 1</Text>
            <Text style={styles.coteValue}>{cote1}</Text>
          </View>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE X</Text>
            <Text style={styles.coteValue}>{coteX}</Text>
          </View>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE 2</Text>
            <Text style={styles.coteValue}>{cote2}</Text>
          </View>
        </View>

        {/* BOUTON */}
        <TouchableOpacity style={styles.button} onPress={calculerPrediction}>
          <Text style={styles.buttonText}>🔥 DÉCHIRER LES COTES 🔥</Text>
        </TouchableOpacity>

        {resultat ? <Text style={styles.resultat}>{resultat}</Text> : null}

        {/* FOOTER */}
        <Text style={styles.footerMain}>PRÉDICTIONS INTELLIGENTES. GAINS PLUS GRANDS.</Text>
        <View style={styles.footerLine} />
        <Text style={styles.footerSub}>18+ OUTIL D'ANALYSE. JEU RESPONSABLE.</Text>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0A', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  logoBet: { fontSize: 32, fontWeight: '900', color: '#FFF', fontStyle: 'italic' },
  logo261: { color: '#00FF7F' },
  logoSub: { fontSize: 12, color: '#888', letterSpacing: 2 },
  profilBox: { backgroundColor: '#1A1A1A', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#333' },
  profilText: { color: '#00FF7F', fontWeight: '700', fontSize: 12 },
  cardProfil: { backgroundColor: '#111', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#00FF7F20', marginBottom: 20 },
  cardHeader: { marginBottom: 12 },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '700' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  ballImage: { width: 60, height: 60, marginRight: 10 },
  statsCol: { alignItems: 'center' },
  statLabel: { color: '#888', fontSize: 10, marginTop: 4 },
  statValue: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  statValueGreen: { color: '#00FF7F', fontSize: 18, fontWeight: '700' },
  progressBarBg: { height: 6, backgroundColor: '#222', borderRadius: 3, overflow: 'hidden' },
  progressBar: { width: '20%', height: 6, backgroundColor: '#00FF7F' },
  objectif: { color: '#00FF7F', fontSize: 11, textAlign: 'center', marginTop: 8 },
  analyseSection: { alignItems: 'center', marginBottom: 16 },
  analyseTitle: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  analyseSub: { color: '#00FF7F', fontSize: 12, marginTop: 4 },
  inputCard: { backgroundColor: '#1A1A1A', padding: 18, borderRadius: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  inputLabel: { color: '#FFF', fontSize: 15, fontWeight: '600' },
  chevron: { color: '#00FF7F', fontSize: 24 },
  cotesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  coteBox: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 16, width: '31%', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  coteLabel: { color: '#888', fontSize: 11 },
  coteValue: { color: '#00FF7F', fontSize: 20, fontWeight: '700', marginTop: 4 },
  button: { backgroundColor: '#00FF7F', padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#00FF7F', shadowOpacity: 0.5, shadowRadius: 10 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: '900' },
  resultat: { color: '#00FF7F', fontSize: 18, textAlign: 'center', marginBottom: 20, fontWeight: '700' },
  footerMain: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 20 },
  footerLine: { height: 2, backgroundColor: '#00FF7F', width: 60, alignSelf: 'center', marginVertical: 8 },
  footerSub: { color: '#555', fontSize: 10, textAlign: 'center', marginBottom: 30 },
});
