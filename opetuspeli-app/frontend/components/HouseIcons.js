import { View, Pressable } from 'react-native';
import Svg, { Rect, Polygon, Path, G } from 'react-native-svg';

const HouseIcons = ({ categories, onSelect }) => (
  <View>
  <Svg width="300" height="100" viewBox="0 0 300 100">
    {/* House 1 */}

    {categories[0] && (
      <G onPress={() => onSelect(categories[0].name)}>
        <Polygon points="10,40 30,20 50,40" fill="#FF6347" />
        <Rect x="15" y="40" width="30" height="30" fill="#FFD700" />
      </G>
    )}

    {/* House 2 */}
    {categories[1] && (
      <G onPress={() => onSelect(categories[1].name)}>
        <Rect x="65" y="35" width="40" height="35" fill="#4682B4" />
        <Rect x="65" y="30" width="40" height="5" fill="#2F4F4F" />
      </G>
    )}
    {/* House 3 */}
    {categories[2] && (
      <G onPress={() => onSelect(categories[2].name)}>
        <Polygon points="120,35 140,20 160,35" fill="#A52A2A" />
        <Rect x="125" y="35" width="30" height="30" fill="#8FBC8F" />
      </G>
    )}
    {/* House 4 */}
    {categories[3] && (
      <G onPress={() => onSelect(categories[3].name)}>
        <Polygon points="185,40 200,20 215,40" fill="#DA70D6" />
        <Rect x="190" y="40" width="20" height="40" fill="#FFF8DC" />
      </G>
    )}
    {/* House 5 */}
    {categories[4] && (
      <G onPress={() => onSelect(categories[4].name)}>
        <Path
          d="M250 40 Q265 20 280 40 L280 70 L250 70 Z"
          fill="#87CEEB"
        />
      </G>
    )}
  </Svg>

  {categories.map((cat, index) => (
    <Pressable
      key={cat.categoryID}
      onPress={() => onSelect(cat.name)}
    />
  ))}

  </View>
);

export default HouseIcons;