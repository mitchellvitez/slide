var Swipeout = require('react-native-swipeout')

var swipeoutBtns = [
  {
    text: 'like'
  },

];

var leftswipeoutBtns = [
  {
    text: 'delete'
  }
];
 
<Swipeout right={swipeoutBtns} left={leftswipeoutBtns>
  <View>
    <Text>Swipe me left</Text>
  </View>
</Swipeout>
