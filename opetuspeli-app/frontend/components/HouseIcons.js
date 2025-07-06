import { Text, View, Pressable } from 'react-native';
import Svg, { Rect, Polygon, Path, G } from 'react-native-svg';

const HouseIcons = ({ categories, onSelect }) => (
  <View>
  <Svg width="300" height="100" viewBox="0 0 300 100">
    {/* House 1 */}

    {categories[0] && (
      <>
        <Polygon points="10,40 30,20 50,40" fill="#FF6347" />
        <Rect x="15" y="40" width="30" height="30" fill="#FFD700" />
      </>
    )}

    {/* House 2 */}
    {categories[1] && (
      <>
        <Rect x="65" y="35" width="40" height="35" fill="#4682B4" />
        <Rect x="65" y="30" width="40" height="5" fill="#2F4F4F" />
      </>
    )}
    {/* House 3 */}
    {categories[2] && (
      <>
        <Polygon points="120,35 140,20 160,35" fill="#A52A2A" />
        <Rect x="125" y="35" width="30" height="30" fill="#8FBC8F" />
      </>
    )}
    {/* House 4 */}
    {categories[3] && (
      <>
        <Polygon points="185,40 200,20 215,40" fill="#DA70D6" />
        <Rect x="190" y="40" width="20" height="40" fill="#FFF8DC" />
      </>
    )}
    {/* House 5 */}
    {categories[4] && (
      <>
        <Path
          d="M250 40 Q265 20 280 40 L280 70 L250 70 Z"
          fill="#87CEEB"
        />
      </>
    )}
  </Svg>
    {/* Pressable overlays */}
    {categories[0] && (
      <Pressable
        style={{ position: 'absolute', left: 10, top: 20, width: 40, height: 50 }}
          onPress={() => onSelect(categories[0])}
      />
    )}
    {categories[1] && (
      <Pressable
        style={{ position: 'absolute', left: 65, top: 30, width: 40, height: 40 }}
          onPress={() => onSelect(categories[1])}
      />
    )}
    {categories[2] && (
      <Pressable
        style={{ position: 'absolute', left: 115, top: 30, width: 40, height: 50 }}
          onPress={() => onSelect(categories[2])}
      />
    )}
    {categories[3] && (
      <Pressable
        style={{ position: 'absolute', left: 165, top: 30, width: 40, height: 50 }}
          onPress={() => onSelect(categories[0])}
      />
    )}
    {categories[4] && (
      <Pressable
        style={{ position: 'absolute', left: 215, top: 30, width: 40, height: 50 }}
          onPress={() => onSelect(categories[0])}
      />
    )}

  {categories.map((cat) => (
    <Pressable
      key={cat.categoryID}
      onPress={() => onSelect(cat)}
      style={{ padding: 10, backgroundColor: '#ccc', marginBottom: 5 }}
    >
    <Text>{cat.name}</Text>
    </Pressable>
  ))}

  </View>
);

export default HouseIcons;