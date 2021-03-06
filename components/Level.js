import React from 'react';
import { ActivityIndicator,
         Dimensions,
         StyleSheet,
         Text,
         View } from 'react-native';

import { observer, inject } from 'mobx-react/native';
import Gauge from './Gauge';
import SettingsButton from '../components/SettingsButton';

@inject("appState") @observer
export default class Level extends React.Component {
  render() {
    const {height, width} = Dimensions.get('window');

    const gauge = this.props.appState.data &&
      typeof this.props.appState.data[this.props.query] !== undefined ?
      (
        <Gauge
          value={this.props.appState.data[this.props.query]}
          units={this.props.units}
          width={width}
          height={height - 200}
          min={this.props.min}
          max={this.props.max}
          label={this.props.label}
          color="lime"
          backgroundColor="grey"
          valueFontSize={50}
          labelFontSize={30}
        />
    ) : <ActivityIndicator animating size="large" />;

    return (
      <View style={styles.container}>
        <View style={styles.settingsButtonContainer}>
          <SettingsButton />
        </View>
        <Text style={styles.errorMessage}>
          {this.props.appState.error}
        </Text>
        {gauge}
      </View>
    );
  }
}  // End Level

Level.propTypes = {
  query: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  units: React.PropTypes.string,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButtonContainer: {
    alignItems: 'flex-end',
    marginRight: 25,
  },
  errorMessage: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
  },
});
