import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";

import api from "./services/api.js"

export default function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Pedro Moreno',
    }
    )
    const project = response.data
    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item }) => (
            <Text style={styles.item}>{item.title}</Text>
          )}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>
            Adicionar Projeto
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  item: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
  }
})