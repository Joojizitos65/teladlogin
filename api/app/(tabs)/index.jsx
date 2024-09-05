import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function TelaLogin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = () => {
    if (validaCampos()) {
      createUser();
    }
  };

  const validaCampos = () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }
    return true;
  };

  const createUser = async () => {
    try {
      const response = await fetch('https://taskhub-s37f.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
        console.log('Usuário criado:', data);
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.message || 'Erro ao criar usuário.');
        console.error('Erro ao criar usuário:', errorData);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na comunicação com o servidor.');
      console.error('Erro ao fazer requisição:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button
        title="Registrar"
        onPress={handleCreateUser}
        color="black"
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10
  },
  button: {
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
