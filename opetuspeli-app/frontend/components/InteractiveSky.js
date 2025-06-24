import Svg, { Circle, Line, Ellipse } from 'react-native-svg';

const InteractiveSky = ({ onSunPress, onCloudPress }) => (
  <Svg width={300} height={300} viewBox="0 0 300 300">
    {/* Sun (tappable) */}
    <Circle cx="80" cy="80" r="40" fill="yellow" onPress={onSunPress} />
    {/* Sun rays */}
    <Line x1="80" y1="20" x2="80" y2="0" stroke="orange" strokeWidth={4} />
    {/* ... other rays ... */}
    {/* Cloud (tappable) */}
    <Ellipse cx="220" cy="100" rx="40" ry="25" fill="lightgray" onPress={onCloudPress} />
    <Ellipse cx="240" cy="90" rx="30" ry="20" fill="lightgray" onPress={onCloudPress} />
    <Ellipse cx="200" cy="90" rx="30" ry="20" fill="lightgray" onPress={onCloudPress} />
  </Svg>
);

export default InteractiveSky;