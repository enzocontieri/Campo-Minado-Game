import React, {Component} from 'react'
import {Platform, StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import LevelSelect from './src/screens/LevelSelect'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExploded,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from './src/Logic.js'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

minesAmount = () => {
  const cols = params.getColumnsAmount()
  const rows = params.getRowsAmount()
  return Math.ceil(cols * rows * params.difficultLevel)
}

createState = () => {
  const cols = params.getColumnsAmount()
  const rows = params.getRowsAmount()
  return {
    board: createMinedBoard(rows, cols, this.minesAmount()),
    won: false,
    lost: false,
    showLevelSelection: false,
  }
}

//funcao para abrir campo 
onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExploded(board)
    const won = wonGame(board)
 // caso o usuario selecione uma mine e perca, abre as minas espalhadas.
    if(lost){
      showMines(board)
      Alert.alert('Perdeu, que Buuuuurro!')
    }
// caso nao tenha aberto nenhuma mina e acabe o numero do campos disponiveis 
    if(won){
      Alert.alert('Parabens', 'Voce venceu')
    }

    this.setState({ board, lost, won })
}

//funcao que seleciona o campo 
onSelectField = (row, column) => {
  const board = cloneBoard(this.state.board)
  invertFlag(board, row, column)
  const won = wonGame(board)

  if (won){
    Alert.alert('Parabens', 'Voce venceu')
  }

  this.setState({ board, won })
}

onLevelSelected = level => {
  params.difficultLevel = level
  this.setState(this.createState())
}

render() { 
const { lost, board } = this.state;
  return (
    <View style={styles.container}>
      <LevelSelect isVisible={this.state.showLevelSelection}
      onLevelSelected={this.onLevelSelected}
      onCancel={() => this.setState({ showLevelSelection: false })} />
      <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
        onNewGame={() => this.setState(this.createState())}
        onFlagPress={() => this.setState({ showLevelSelection: true })}/>
          <View style={styles.board}>
        {!lost && (
      <MineField board={board} 
            onOpenField={this.onOpenField}
            onSelectField={this.onSelectField}/>
            )}    
          </View> 
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA',
  },
});

