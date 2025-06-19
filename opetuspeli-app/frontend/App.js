import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text>Hello!</Text>
        <StatusBar style="auto" />
      </View>
      <Pressable>
        <Text style={styles.buttonText}>Kirjaudu</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.buttonText}>Rekisteröity</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
