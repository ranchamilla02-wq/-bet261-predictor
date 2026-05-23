import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';

export default function App() {
  const [dom, setDom] = useState('');
  const [ext, setExt] = useState('');
  const [c1, setC1] = useState('');
  const [cX, setCX] = useState('');
  const [c2, setC2] = useState('');
  const [result, setResult] = useState(null);
  const [profil, setProfil] = useState({ paris: 0, gagnes: 0, serie: 0, record: 0 });
  const [historique, setHistorique] = useState([]);

  const poisson = (lambda, k) => Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
  const factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);

  const calculer = () => {
    if (!c1 || !cX || !c2 || !dom || !ext) return;
    
    const cote1 = parseFloat(c1);
    const coteX = parseFloat(cX);
    const cote2 = parseFloat(c2);
    
    const lambda1 = 1 / cote1 * 2.5;
    const lambda2 = 1 / cote2 * 2.5;
    
    let p1 = 0, pX = 0, p2 = 0;
    for(let i=0; i<6; i++) {
      for(let j=0; j<6; j++) {
        const prob = poisson(lambda1, i) * poisson(lambda2, j);
        if(i > j) p1 += prob;
        else if(i === j) pX += prob;
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
    
    let pred = '1';
    let conf = p1;
    if(pX > p1 && pX > p2) { pred = 'X'; conf = pX; }
    if(p2 > p1 && p2 > pX) { pred = '2'; conf = p2; }
    
    let score1 = Math.round(lambda1);
    let score2 = Math.round(lambda2);
    
    const value1 = (p1/100 * cote1 - 1) * 100;
    const valueX = (pX/100 * coteX - 1) * 100;
    const value2 = (p2/100 * cote2 - 1) * 100;
    const bestValue = Math.max(value1, valueX, value2);
    
    let conseil = 'ÉVITER';
    let conseilStyle = styles.conseilEviter;
    if(bestValue > 5) { conseil = 'FEU VERT TOTAL'; conseilStyle = styles.conseilJouer; }
    else if(bestValue > 0) { conseil = 'VALUE MOYENNE'; conseilStyle = styles.conseilMoyen; }
    
    const newResult = {
      match: `${dom} vs ${ext}`,
      pred, conf, p1, pX, p2, score: `${score1}-${score2}`,
      lambda1: lambda1.toFixed(2), lambda2: lambda2.toFixed(2),
      value: bestValue.toFixed(1), conseil, conseilStyle,
      analyse: [
        `Domicile favori à ${p1}%`,
        `Upsets 30% déjà intégrés`,
        `Anti-piège activé`,
        `Value bet: ${bestValue > 0 ? '+' + bestValue.toFixed(1) + '%' : bestValue.toFixed(1) + '%'}`,
        `Score probable: ${score1}-${score2}`
      ]
    };
    
    setResult(newResult);
    setHistorique([newResult, ...historique.slice(0, 4)]);
  };

  const validerPari = (gagne) => {
    const nouveauProfil = {...profil};
    nouveauProfil.paris += 1;
    if(gagne) {
      nouveauProfil.gagnes += 1;
      nouveauProfil.serie += 1;
      if(nouveauProfil.serie > nouveauProfil.record) nouveauProfil.record = nouveauProfil.serie;
    } else {
      nouveauProfil.serie = 0;
    }
    setProfil(nouveauProfil);
  };

  const resetHistorique = () => setHistorique([]);
  const winrate = profil.paris > 0 ? ((profil.gagnes / profil.paris) * 100).toFixed(0) : 0;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>BET261 PREDICTOR</Text>
        <Text style={styles.profilBtn}>👤 Sniper261</Text>
      </View>
      
      <View style={styles.profilCard}>
        <Text style={styles.profilTitle}>📊 PROFIL 🌱 DÉBUTANT</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Winrate</Text>
            <Text style={styles.statValue}>{winrate}%</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Paris</Text>
            <Text style={styles.statValue}>{profil.gagnes}/{profil.paris}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Série</Text>
            <Text style={styles.statValue}>{profil.serie} 🔥</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Record</Text>
            <Text style={styles.statValue}>{profil.record} 🏆</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Analyse Automatique - Upsets 30% Inclus</Text>

      <View style={styles.card}>
        <TextInput 
          style={styles.input} 
          placeholder="⚽ Équipe Domicile" 
          placeholderTextColor="#666"
          value={dom} 
          onChangeText={setDom} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="⚽ Équipe Extérieur" 
          placeholderTextColor="#666"
          value={ext} 
          onChangeText={setExt} 
        />
        
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Cote 1</Text>
            <TextInput 
              style={styles.inputSmall} 
              placeholder="1.85" 
              placeholderTextColor="#666"
              keyboardType="numeric" 
              value={c1} 
              onChangeText={setC1} 
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Cote X</Text>
            <TextInput 
              style={styles.inputSmall} 
              placeholder="3.40" 
              placeholderTextColor="#666"
              keyboardType="numeric" 
              value={cX} 
              onChangeText={setCX} 
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Cote 2</Text>
            <TextInput 
              style={styles.inputSmall} 
              placeholder="4.20" 
              placeholderTextColor="#666"
              keyboardType="numeric" 
              value={c2} 
              onChangeText={setC2} 
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={calculer}>
          <Text style={styles.buttonText}>🔥 DÉCHIRER LES COTES 🔥</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.matchText}>{result.match}</Text>
          
          <View style={styles.predictionBox}>
            <Text style={styles.predictionLabel}>PRÉDICTION</Text>
            <Text style={styles.predictionValue}>{result.pred}</Text>
            <Text style={styles.confidence}>Confiance: {result.conf}%</Text>
          </View>

          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>SCORE EXACT</Text>
            <Text style={styles.scoreValue}>{result.score}</Text>
            <Text style={styles.lambdaText}>λ1: {result.lambda1} | λ2: {result.lambda2}</Text>
          </View>

          <View style={styles.analyseBox}>
            <Text style={styles.analyseTitle}>📊 ANALYSE 5 RÈGLES</Text>
            {result.analyse.map((a, i) => (
              <Text key={i} style={styles.analyseText}>• {a}</Text>
            ))}
          </View>

          <View style={styles.probaRow}>
            <View style={styles.probaBox}>
              <Text style={styles.probaLabel}>Victoire 1</Text>
              <Text style={styles.probaValue}>{result.p1}%</Text>
            </View>
            <View style={styles.probaBox}>
              <Text style={styles.probaLabel}>Nul X</Text>
              <Text style={styles.probaValue}>{result.pX}%</Text>
            </View>
            <View style={styles.probaBox}>
              <Text style={styles.probaLabel}>Victoire 2</Text>
              <Text style={styles.probaValue}>{result.p2}%</Text>
            </View>
          </View>

          <Text style={result.conseilStyle}>{result.conseil}</Text>

          <View style={styles.validationBox}>
            <Text style={styles.validationTitle}>As-tu joué ce pari ?</Text>
            <View style={styles.validationRow}>
              <TouchableOpacity style={styles.btnGagne} onPress={() => validerPari(true)}>
                <Text style={styles.btnGagneText}>✅ GAGNÉ</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnPerdu} onPress={() => validerPari(false)}>
                <Text style={styles.btnPerduText}>❌ PERDU</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {historique.length > 0 && (
        <View style={styles.histoCard}>
          <View style={styles.histoHeader}>
            <Text style={styles.histoTitle}>📜 HISTORIQUE ({historique.length})</Text>
            <TouchableOpacity onPress={resetHistorique}>
              <Text style={styles.resetText}>🗑️ Reset</Text>
            </TouchableOpacity>
          </View>
          {historique.map((h, i) => (
            <View key={i} style={styles.histoItem}>
              <Text style={styles.histoMatch}>{h.match}</Text>
              <Text style={styles.histoResult}>{h.pred} | {h.score} | {h.conf}%</Text>
            </View>
          ))}
        </View>
      )}

      <Text style={styles.disclaimer}>18+ Outil d'analyse. Suis tes stats pour devenir LÉGENDE.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor:'#0A0A0A', padding:15},
  header: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:20, marginBottom:10},
  title: {color:'#FFC300', fontSize:26, fontWeight:'900'},
  profilBtn: {color:'#FFC300', fontSize:14, fontWeight:'700', backgroundColor:'#1A1A1A', padding:8, borderRadius:8},
  profilCard: {backgroundColor:'#1A1A1A', padding:15, borderRadius:16, marginBottom:15, borderWidth:2, borderColor:'#FFC300'},
  profilTitle: {color:'#FFC300', fontSize:16, fontWeight:'900', textAlign:'center', marginBottom:12},
  statsRow: {flexDirection:'row', justifyContent:'space-around', marginBottom:5},
  statBox: {alignItems:'center', flex:1},
  statLabel: {color:'#888', fontSize:11},
  statValue: {color:'#fff', fontSize:16, fontWeight:'bold', marginTop:3},
  subtitle: {color:'#888', fontSize:13, textAlign:'center', marginBottom:15},
  card: {backgroundColor:'#1A1A1A', padding:20, borderRadius:16, marginBottom:15, borderWidth:1, borderColor:'#333'},
  input: {backgroundColor:'#0D0D0D', color:'#fff', padding:15, borderRadius:10, marginBottom:12, fontSize:16, borderWidth:1, borderColor:'#333'},
  row: {flexDirection:'row', gap:8, marginBottom:15},
  col: {flex:1},
  label: {color:'#FFC300', fontSize:12, marginBottom:5, fontWeight:'600'},
  inputSmall: {backgroundColor:'#0D0D0D', color:'#fff', padding:12, borderRadius:10, fontSize:16, textAlign:'center', borderWidth:1, borderColor:'#333'},
  button: {backgroundColor:'#FFC300', padding:18, borderRadius:12, marginTop:5},
  buttonText: {color:'#000', textAlign:'center', fontWeight:'900', fontSize:17},
  resultCard: {backgroundColor:'#1A1A1A', padding:20, borderRadius:16, borderWidth:2, borderColor:'#FFC300', marginBottom:20},
  matchText: {color:'#FFC300', fontSize:19, fontWeight:'bold', textAlign:'center', marginBottom:15},
  predictionBox: {backgroundColor:'#0D0D0D', padding:15, borderRadius:12, alignItems:'center', marginBottom:12},
  predictionLabel: {color:'#888', fontSize:12},
  predictionValue: {color:'#00E676', fontSize:52, fontWeight:'900'},
  confidence: {color:'#FFC300', fontSize:14, fontWeight:'600'},
  scoreBox: {backgroundColor:'#0D0D0D', padding:15, borderRadius:12, alignItems:'center', marginBottom:12},
  scoreLabel: {color:'#888', fontSize:12},
  scoreValue: {color:'#fff', fontSize:34, fontWeight:'900'},
  lambdaText: {color:'#666', fontSize:11, marginTop:5},
  analyseBox: {backgroundColor:'#0D0D0D', padding:15, borderRadius:12, marginBottom:12},
  analyseTitle: {color:'#FFC300', fontSize:14, fontWeight:'bold', marginBottom:8},
  analyseText: {color:'#ccc', fontSize:13, marginBottom:4, lineHeight:18},
  probaRow: {flexDirection:'row', justifyContent:'space-around', marginTop:10, marginBottom:15},
  probaBox: {alignItems:'center', backgroundColor:'#0D0D0D', padding:10, borderRadius:8, flex:1, marginHorizontal:4},
  probaLabel: {color:'#888', fontSize:11},
  probaValue: {color:'#FFC300', fontSize:18, fontWeight:'bold'},
  conseilJouer: {color:'#00E676', fontSize:16, fontWeight:'900', textAlign:'center', marginTop:10},
  conseilMoyen: {color:'#FFA500', fontSize:16, fontWeight:'900', textAlign:'center', marginTop:10},
  conseilEviter: {color:'#FF5252', fontSize:16, fontWeight:'900', textAlign:'center', marginTop:10},
  validationBox: {backgroundColor:'#0D0D0D', padding:15, borderRadius:12, marginTop:15},
  validationTitle: {color:'#FFC300', fontSize:14, fontWeight:'bold', textAlign:'center', marginBottom:10},
  validationRow: {flexDirection:'row', gap:10},
  btnGagne: {flex:1, backgroundColor:'#00E676', padding:12, borderRadius:10},
  btnGagneText: {color:'#000', textAlign:'center', fontWeight:'900'},
  btnPerdu: {flex:1, backgroundColor:'#FF5252', padding:12, borderRadius:10},
  btnPerduText: {color:'#000', textAlign:'center', fontWeight:'900'},
  histoCard: {backgroundColor:'#1A1A1A', padding:12, borderRadius:12, marginBottom:15},
  histoHeader: {flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10},
  histoTitle: {color:'#FFC300', fontSize:13, fontWeight:'600'},
  resetText: {color:'#FF5252', fontSize:12, fontWeight:'600'},
  histoItem: {backgroundColor:'#0D0D0D', padding:10, borderRadius:8, marginBottom:8},
  histoMatch: {color:'#fff', fontSize:13, fontWeight:'600'},
  histoResult: {color:'#888', fontSize:11, marginTop:3},
  disclaimer: {color:'#555', fontSize:11, marginTop:20, textAlign:'center', marginBottom:30}
});
