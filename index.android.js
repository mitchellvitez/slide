'use strict';

var React = require('react-native');
var {
  AppRegistry,
  BackAndroid,
  Navigator,
  ScrollView,
  StyleSheet,
  ToolbarAndroid,
  TouchableHighlight,
  Text,
  View,
} = React;

var SlideViewer = require('./SlideViewer');
var SettingsViewer = require('./SettingsViewer');

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

var RouteMapper = function(route, navigationOperations, onComponentRef) {
  _navigator = navigationOperations;
  if (route.name === 'settings') {
    return (
      <SettingsViewer navigator={navigationOperations} />
    );
  } else if (route.name === 'slides') {
    return (
      <View style={{flex: 1}}>
        <SlideViewer
          navigator={navigationOperations} />
      </View>
    );
  }
};

var Slide = React.createClass({
  render: function() {
    var initialRoute = {name: 'slides'};
    return (
      <Navigator
        style={styles.container}
        initialRoute={initialRoute}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={RouteMapper} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  
});

AppRegistry.registerComponent('Slide', () => Slide);

module.exports = Slide;