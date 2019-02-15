import React, { Component } from 'react'
import {
   View,
   StyleSheet,
   Text,
   TouchableOpacity,
   Modal
} from 'react-native'

export default class LevelSelection extends Component {
   render() {
      return (
         <Modal onRequestClose={this.props.onCancel}
            visible={this.props.isVisible} animationType='slide'
            transparent={true}>
            <View style={styles.frame}>
               <View style={styles.container}>
                  <Text style={styles.title}>Select dificulte</Text>

                  <TouchableOpacity style={[styles.button, styles.bgEazy]}
                     onPress={() => this.props.onLevelSelect(0.1)}>
                     <Text style={styles.buttonLabel}>Eazy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, styles.bgNormal]}
                     onPress={() => this.props.onLevelSelect(0.2)}>
                     <Text style={styles.buttonLabel}>Normal</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.button, styles.bgHard]}
                     onPress={() => this.props.onLevelSelect(0.3)}>
                     <Text style={styles.buttonLabel}>Hard</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
      );
   };
};

const styles = StyleSheet.create({
   frame: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
   },
   container: {
      backgroundColor: '#EEE',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold',
   },
   button: {
      marginTop: 10,
      padding: 5
   },
   buttonLabel: {
      fontSize: 20,
      color: '#EEE',
      fontWeight: 'bold',
   },
   bgEazy: {
      backgroundColor: '#49b65d',
   },
   bgNormal: {
      backgroundColor: '#2765F7',
   },
   bgHard: {
      backgroundColor: '#F26337',
   }

});