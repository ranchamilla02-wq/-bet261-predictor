import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, TextInput, Alert } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
setTimeout(() => SplashScreen.hideAsync(), 2000);

export default function App() {
  const [equipeDomicile, setEquipeDomicile] = useState('');
  const [equipeExterieur, setEquipeExterieur] = useState('');
  const [cote1, setCote1] = useState('1.85');
  const [coteX, setCoteX] = useState('3.40');
  const [cote2, setCote2] = useState('4.20');
  const [resultat, setResultat] = useState(null);

  const analyserMatch = () => {
    if (!equipeDomicile || !equipeExterieur) {
      Alert.alert('Erreur', 'Entre les 2 équipes frérot');
      return;
    }

    const c1 = parseFloat(cote1);
    const cx = parseFloat(coteX);
    const c2 = parseFloat(cote2);
    
    if (isNaN(c1) || isNaN(cx) || isNaN(c2)) {
      Alert.alert('Erreur', 'Cotes invalides');
      return;
    }

    const imp1 = 1/c1, impX = 1/cx, imp2 = 1/c2;
    const marge = imp1 + impX + imp2;
    const proba1 = (imp1 / marge * 100);
    const probaX = (impX / marge * 100);
    const proba2 = (imp2 / marge * 100);

    let valueBet = '';
    if (c1 > 2.0 && proba1 > 45) valueBet = `VALUE DOMICILE 🔥 Cote ${c1} sous-évaluée`;
    if (c2 > 3.5 && proba2 > 25) valueBet = `VALUE EXTÉRIEUR 🔥 Cote ${c2} énorme`;
    if (cx > 3.2 && probaX > 30) valueBet = `VALUE NUL 🧠 Cote ${cx} intéressante`;

    const pieges = [];
    if (c1 >= 1.90 && c1 <= 2.20 && c2 > 3.0) pieges.push('PIÈGE FAVORI : Domicile pas si sûr');
    if (cx < 2.90) pieges.push('PIÈGE NUL : Book sent le 0-0 ou 1-1');
    if (Math.abs(c1 - c2) < 0.20) pieges.push('PIÈGE 50/50 : Match ultra serré');
    if (c1 > 2.8 && c2 > 2.8) pieges.push('PIÈGE TRIPARTITE : 3 issues possibles');
    if (c2 < 2.0 && c1 > 3.5) pieges.push('PIÈGE EXTÉRIEUR : Le book voit l\'upset');

    let scores = [];
    const ecart = Math.abs(c1 - c2);
    if (proba1 > 55) {
      if (c1 < 1.4) scores = ['2-0', '3-0', '3-1'];
      else if (c1 < 1.7) scores = ['2-0', '2-1', '1-0'];
      else scores = ['1-0', '2-1', '2-0'];
    } else if (proba2 > 55) {
      if (c2 < 1.4) scores = ['0-2', '0-3', '1-3'];
      else if (c2 < 1.7) scores = ['0-2', '1-2', '0-1'];
      else scores = ['0-1', '1-2', '0-2'];
    } else {
      if (cx < 3.0) scores = ['1-1', '0-0', '2-2'];
      else scores = ['1-1', '0-0', '1-0'];
    }

    const moyenneButs = (c1 < 2.0 || c2 < 2.0) ? 2.8 : (cx < 3.2) ? 2.2 : 2.5;
    const over25 = moyenneButs > 2.5 ? `${(55 + ecart*5).toFixed(0)}%` : `${(45 - ecart*5).toFixed(0)}%`;
    const btts = (c1 < 2.2 && c2 < 3.5) || (c2 < 2.2 && c1 < 3.5) ? 'OUI 65%' : 'NON 60%';

    let doubleChance = '';
    let confiance = 0;
    if (proba1 + probaX > 75) {
      doubleChance = `1X @${(1/(imp1+impX)).toFixed(2)}`;
      confiance = proba1 + probaX;
    } else if (proba2 + probaX > 75) {
      doubleChance = `X2 @${(1/(imp2+impX)).toFixed(2)}`;
      confiance = proba2 + probaX;
    } else {
      doubleChance = `12 @${(1/(imp1+imp2)).toFixed(2)}`;
      confiance = proba1 + proba2;
    }

    let predictionFinale = '';
    if (proba1 > probaX && proba1 > proba2) predictionFinale = `${equipeDomicile} GAGNE`;
    else if (proba2 > probaX && proba2 > proba1) predictionFinale = `${equipeExterieur} GAGNE`;
    else predictionFinale = 'MATCH NUL';

    setResultat({
      prediction: predictionFinale,
      proba1: proba1.toFixed(0), probaX: probaX.toFixed(0), proba2: proba2.toFixed(0),
      scores: scores,
      pieges: pieges,
      valueBet: valueBet,
      over25: over25,
      btts: btts,
      doubleChance: doubleChance,
      confiance: confiance.toFixed(0),
      margeBook: ((marge - 1) * 100).toFixed(1)
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.logoBet}>BƎT<Text style={styles.logo261}>261</Text></Text>
            <Text style={styles.logoSub}>PREDICTOR SNIPER</Text>
          </View>
          <View style={styles.profilBox}>
            <Text style={styles.profilText}>👤 SNIPER261</Text>
          </View>
        </View>

        <View style={styles.cardProfil}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>MON PROFIL 🌱 DÉBUTANT</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.ballEmoji}>⚽</Text>
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

        <View style={styles.analyseSection}>
          <Text style={styles.analyseTitle}>• ANALYSE SNIPER •</Text>
          <Text style={styles.analyseSub}>VALUE BET + PIÈGES DÉTECTÉS</Text>
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>⚽ ÉQUIPE DOMICILE</Text>
          <TextInput style={styles.inputText} placeholder="Ex: PSG" placeholderTextColor="#555" value={equipeDomicile} onChangeText={setEquipeDomicile} />
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.inputLabel}>⚽ ÉQUIPE EXTÉRIEURE</Text>
          <TextInput style={styles.inputText} placeholder="Ex: OM" placeholderTextColor="#555" value={equipeExterieur} onChangeText={setEquipeExterieur} />
        </View>

        <View style={styles.cotesRow}>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE 1</Text>
            <TextInput style={styles.coteInput} keyboardType="numeric" value={cote1} onChangeText={setCote1} />
            {resultat && <Text style={styles.probaText}>{resultat.proba1}%</Text>}
          </View>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE X</Text>
            <TextInput style={styles.coteInput} keyboardType="numeric" value={coteX} onChangeText={setCoteX} />
            {resultat && <Text style={styles.probaText}>{resultat.probaX}%</Text>}
          </View>
          <View style={styles.coteBox}>
            <Text style={styles.coteLabel}>COTE 2</Text>
            <TextInput style={styles.coteInput} keyboardType="numeric" value={cote2} onChangeText={setCote2} />
            {resultat && <Text style={styles.probaText}>{resultat.proba2}%</Text>}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={analyserMatch}>
          <Text style={styles.buttonText}>🔥 DÉCHIRER LES COTES 🔥</Text>
        </TouchableOpacity>

        {resultat && (
          <View style={styles.resultatBox}>
            <Text style={styles.resultatMain}>{resultat.prediction}</Text>
            <Text style={styles.confiance}>Confiance: {resultat.confiance}% | Marge: {resultat.margeBook}%</Text>
            
            <View style={styles.line} />
            <Text style={styles.sectionTitle}>SCORES PROBABLES</Text>
            <Text style={styles.scores}>{resultat.scores.join(' • ')}</Text>
            
            <View style={styles.line} />
            <View style={styles.row2}>
              <View style={styles.col2}>
                <Text style={styles.sectionTitle}>OVER 2.5</Text>
                <Text style={styles.valueText}>{resultat.over25}</Text>
              </View>
              <View style={styles.col2}>
                <Text style={styles.sectionTitle}>BTTS</Text>
                <Text style={styles.valueText}>{resultat.btts}</Text>
              </View>
            </View>

            <View style={styles.line} />
            <Text style={styles.sectionTitle}>DOUBLE CHANCE</Text>
            <Text style={styles.valueText}>{resultat.doubleChance}</Text>

            {resultat.valueBet ? (
              <>
                <View style={styles.line} />
                <Text style={styles.valueBetText}>{resultat.valueBet}</Text>
              </>
            ) : null}

            {resultat.pieges.length > 0 && (
              <>
                <View style={styles.line} />
                {resultat.pieges.map((p, i) => (
                  <Text key={i} style={styles.piege}>⚠️ {p}</Text>
                ))}
              </>
            )}
          </View>
        )}

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
  logoBet: { fontSize: 36, fontWeight: '900', color: '#FFF', letterSpacing: -1 },
  logo261: { color: '#00FF7F' },
  logoSub: { fontSize: 12, color: '#888', letterSpacing: 4, marginTop: -5 },
  profilBox: { backgroundColor: '#1A1A1A', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#00FF7F50' },
  profilText: { color: '#00FF7F', fontWeight: '700', fontSize: 12 },
  cardProfil: { backgroundColor: '#111', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#00FF7F30', marginBottom: 20 },
  cardHeader: { marginBottom: 12 },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '700', letterSpacing: 1 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  ballEmoji: { fontSize: 50, marginRight: 10 },
  statsCol: { alignItems: 'center', flex: 1 },
  statLabel: { color: '#888', fontSize: 10, marginTop: 4 },
  statValue: { color: '#FFF', fontSize: 18, fontWeight: '800' },
  statValueGreen: { color: '#00FF7F', fontSize: 18, fontWeight: '800' },
  progressBarBg: { height: 6, backgroundColor: '#222', borderRadius: 3, overflow: 'hidden' },
  progressBar: { width: '20%', height: 6, backgroundColor: '#00FF7F' },
  objectif: { color: '#00FF7F', fontSize: 11, textAlign: 'center', marginTop: 8, letterSpacing: 1 },
  analyseSection: { alignItems: 'center', marginBottom: 16 },
  analyseTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', letterSpacing: 2 },
  analyseSub: { color: '#00FF7F', fontSize: 12, marginTop: 4 },
  inputCard: { backgroundColor: '#1A1A1A', padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  inputLabel: { color: '#FFF', fontSize: 15, fontWeight: '600', marginBottom: 8 },
  inputText: { color: '#00FF7F', fontSize: 16, fontWeight: '700' },
  cotesRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  coteBox: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 16, width: '31%', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  coteLabel: { color: '#888', fontSize: 11 },
  coteInput: { color: '#00FF7F', fontSize: 22, fontWeight: '800', marginTop: 4, textAlign: 'center', width: '100%' },
  probaText: { color: '#888', fontSize: 11, marginTop: 4 },
  button: { backgroundColor: '#00FF7F', padding: 18, borderRadius: 16, alignItems: 'center', marginBottom: 16, shadowColor: '#00FF7F', shadowOpacity: 0.5, shadowRadius: 10, elevation: 10 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  resultatBox: { backgroundColor: '#111', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#00FF7F50', marginBottom: 20 },
  resultatMain: { color: '#00FF7F', fontSize: 20, textAlign: 'center', fontWeight: '900' },
  confiance: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 4 },
  line: { height: 1, backgroundColor: '#333', marginVertical: 12 },
  sectionTitle: { color: '#888', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 6 },
  scores: { color: '#FFF', fontSize: 18, fontWeight: '800', textAlign: 'center' },
  row2: { flexDirection: 'row', justifyContent: 'space-between' },
  col2: { width: '48%', alignItems: 'center' },
  valueText: { color: '#00FF7F', fontSize: 16, fontWeight: '800' },
  valueBetText: { color: '#FFD700', fontSize: 14, textAlign: 'center', fontWeight: '800' },
  piege: { color: '#FF3B30', fontSize: 13, marginTop: 6, fontWeight: '600' },
  footerMain: { color: '#888', fontSize: 12, textAlign: 'center', marginTop: 20, letterSpacing: 1 },
  footerLine: { height: 2, backgroundColor: '#00FF7F', width: 60, alignSelf: 'center', marginVertical: 8 },
  footerSub: { color: '#555', fontSize: 10, textAlign: 'center', marginBottom: 30 },
});
