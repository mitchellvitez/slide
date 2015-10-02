var React = require('react-native');
var {
  BackAndroid,
  ListView,
  Platform,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Navigator,
} = React;

var SlideViewer = require('./SlideViewer');

var SettingsViewer = React.createClass({
	render: function() {
		return (
			<View>
				<TouchableHighlight
		          style={styles.settingsButton}
		          onPress={this.goToSlides}>
		            <Text style={styles.buttonText}>home</Text>
		        </TouchableHighlight> 
				<Text style={buttonText}>
		          test settings text here
		        </Text>
			</View>
		);
	},

	  goToSlides: function() {
	    if (Platform.OS === 'ios') {
	      this.props.navigator.push({
	        title: 'slides',
	        component: SlideViewer,
	      });
	    } else {
	      this.props.navigator.pop();
	    }
	  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  settingsButton: {
    backgroundColor: '#000000',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    textAlign: 'center',
    color: '#444444',
  }
});

module.exports = SettingsViewer;
