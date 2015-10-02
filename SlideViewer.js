var MOCKED_POSTS_DATA = [
  {id: 987967, source: 'facebook', text: 'The NSA is going to be at the career fair tomorrow, so I want to take this opportunity to remind everybody, that while there are many jobs in CS that are in a "grey area," there are a whole lot more jobs that aren\'t. Jacob Appelbaum, creator of Tor gave a talk where he said, "Write free software for everyone, instead of oppressive software for cops." I don\'t entirely agree with Appelbaum, nor do I suggest everybody go out and open source their software, but I just want to point out that simply choosing not to work in the "gray area" is doing something. I leave which companies you hand your resume to up to you.'},
  {id: 7654756, source: 'hackernews', text: 'Free Lossless Image Format'},
  {id: 8687, source: 'twitter', text: "Today's our birthday! We're 57 & look forward to many more years of exploration & discovery. http://go.nasa.gov/1KXm7uS"},
  {id: 786567, source: 'facebook', text: 'Doing just a little bit during the time we have available puts you that much further ahead than if you took no action at all.'},
  {id: 4253245, source: 'twitter', text: 'Had a great time last night, doing stuff with people! #life'},
  {id: 47437, source: 'twitter', text: 'just setting up my twttr'},
  {id: 214924, source: 'hackernews', text: 'Microsoft Edge gets native ECMAScript 7 async/await support in latest build'},
];

var React = require('react-native');
var {
  ListView,
  Platform,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Navigator,
} = React;

var SettingsViewer = require('./SettingsViewer');

var SlideViewer = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(MOCKED_POSTS_DATA),
    };
  },

  render: function() {
    return (
      <ScrollView>
      <TouchableHighlight
          style={styles.settingsButton}
          onPress={this.goToSettings}>
            <Text style={styles.buttonText}>settings</Text>
        </TouchableHighlight> 
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPost} >
        </ListView>
        
        </ScrollView>
    );
  },

  goToSettings: function() {
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: 'settings',
        component: SettingsViewer,
      });
    } else {
      this.props.navigator.push({
        name: 'settings'
      });
    }
  },

  getBackgroundColor: function(postSource) {
    if (postSource == "hackernews") {
      return '#ff6600';
    } else if (postSource == "facebook") {
      return '#3b5998';
    } else if (postSource == "twitter") {
      return '#4099ff';
    }
    return '#333333';
  },

  renderMore: function(bgColor) {
    if (false) {
      return (
        <Text style={{height: 0, margin: 0, padding: 0, height: 0, color: 'white', backgroundColor: bgColor}}>
          TEST ITEM SETTINGS
        </Text>
      );
    } else {
      return (<View></View>);
    }
  },

  removeItem: function(postid) {
    console.log(postid);
    var index = -1;
    var newData = [];
    for (var i = 0; i < MOCKED_POSTS_DATA.length; i++) {
      if (MOCKED_POSTS_DATA[i].id == postid) {
        console.log(MOCKED_POSTS_DATA[i])
        index = i;
      }
      else {
        newData.push(MOCKED_POSTS_DATA[i]);
      }
    }

    MOCKED_POSTS_DATA = newData;
    /* if (index != -1) {
      MOCKED_POSTS_DATA.splice(index, 1);
    } */

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(MOCKED_POSTS_DATA),
    });

    console.log(this.state.dataSource);
  },

  renderPost: function(post) {
    var postStyle = {
      textAlign: 'left',
      fontSize: 20,
      color: '#ffffff',
      // backgroundColor: 'black'
    };
    // postStyle.backgroundColor = this.getBackgroundColor(post.source);

    var itemStyle = {
      flex: 1,
      margin: 0,
      paddingTop: 30,
      paddingBottom: 30,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: 'black',
    };
    itemStyle.backgroundColor = this.getBackgroundColor(post.source);

    
    return (
      <View>
        <TouchableHighlight
          onPress={()=>this.removeItem(post.id)} >
          <View style={styles.container}>
            <View style={itemStyle}> 
              <Text style={postStyle}>{post.text}</Text>
            </View>
          </View>
        </TouchableHighlight>
        {this.renderMore(itemStyle.backgroundColor)}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  listView: {

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
  },
  buttonTextWhite: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 16
  }
});

module.exports = SlideViewer;
