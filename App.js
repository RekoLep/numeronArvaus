import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState('');
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState('');
  const [guesses, setGuesses] = useState(0);

  const givenGuess = () => {
    if (guess.trim() === '') {
      return; 
    }

    const numericGuess = parseInt(guess);

    if (isNaN(numericGuess)) {
      setMessage('Please enter a valid number!');
    } else {
      setGuesses(prev => prev + 1);

      if (numericGuess < number) {
        setMessage('Too low! Try again.');
      } else if (numericGuess > number) {
        setMessage('Too high! Try again.');
      } else {
        Alert.alert(
          `Correct! You guessed ${guesses + 1} times! Generating a new number...`
        );
        setNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setGuesses(0);
        setMessage('');
      }
    }
  };

  return (
    <View style={styles.container}>
      {message !== '' && <Text style={styles.message}>{message}</Text>}
      <Text>Guess number between 1-100</Text>

      <TextInput
        value={guess}
        onChangeText={text => setGuess(text)}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={givenGuess} />
      </View>
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
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginTop: 10,
    width: 200,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    width: 200,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
