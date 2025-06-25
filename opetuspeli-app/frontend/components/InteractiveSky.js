import Svg, { Circle, Ellipse } from 'react-native-svg';
import { View, TouchableOpacity } from 'react-native';

  const InteractiveSky = ({ onSunPress, onCloudPress }) => (
  <View>
    <View>
      <Svg height="200" width="300" style={{ position: 'absolute' }}>
        <Circle cx="50" cy="50" r="30" fill="yellow" />
        <Ellipse cx="200" cy="60" rx="40" ry="20" fill="lightgray" />
      </Svg>

      {/* Touchable areas positioned over SVG */}
      <TouchableOpacity onPress={onSunPress} />
      <TouchableOpacity onPress={onCloudPress} />
    </View>
  </View>
);

export default InteractiveSky;