import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

//components
import MineField from './src/components/MineField';

//utils
import params from './src/params';
import {
   createMinedBoard,
   openField,
   cloneBoard,
   hadExplosion,
   wonGame, showMines,
   invertFlag,
   flagsUsed
} from './src/logicGame';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

export default class App extends Component {

   constructor(props) {
      super(props)
      this.state = this.createState();
   }

   minesAmount = () => {
      const cols = params.getColumnsAmount();
      const rows = params.getRowsAmount();

      return Math.ceil(cols * rows * params.difficultLevel);
   };

   createState = () => {
      const rows = params.getRowsAmount();
      const cols = params.getColumnsAmount();

      return {
         board: createMinedBoard(rows, cols, this.minesAmount()),
         won: false,
         lost: false,
         showLevelSelection: false
      }
   }

   onOpenField = (row, column) => {
      const board = cloneBoard(this.state.board);

      openField(board, row, column)

      const lost = hadExplosion(board);
      const won = wonGame(board)

      if (lost) {
         showMines(board)

         Alert.alert('YOU LOSE', 'that sad');
      }

      if (won) {
         Alert.alert('YOU WIN', 'congratulations!');
      }

      this.setState({ board, lost, won })
   };

   onSelectField = (row, column) => {
      const board = cloneBoard(this.state.board)

      invertFlag(board, row, column)

      const won = wonGame(board)

      if (won) {
         Alert.alert('Paraben', 'Voce Ganhou');
      }

      this.setState({ board, won });
   };

   onLevelSelect = (level) => {
      params.difficultLevel = level
      this.setState(this.createState())
   };

   render() {
      return (
         <View style={styles.container}>
            <LevelSelection
               isVisible={this.state.showLevelSelection}
               onLevelSelect={this.onLevelSelect}
               onCancel={() => this.setState({ showLevelSelection: false })} />

            <Header
               flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
               onNewGame={() => this.setState(this.createState())}
               onFlagPress={() => this.setState({ showLevelSelection: true })} />

            <View style={styles.board}>
               <MineField
                  board={this.state.board}
                  onOpenField={(r, c) => this.state.won || this.state.lost ? false : this.onOpenField(r, c)}
                  onSelectField={this.onSelectField} />
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
   }
});
