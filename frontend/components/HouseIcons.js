import { Text, View, Pressable, StyleSheet } from 'react-native';
import Svg, { Rect, Polygon, Path, G } from 'react-native-svg';
import Entypo from '@expo/vector-icons/Entypo';
import { layout, colors, textStyles, spacing } from '../constants/layout';

const HouseIcons = ({ categories, onSelect }) => {
  
  return (
  <View>
    {/* <Svg width="300" height="100" viewBox="0 0 300 100">
      
      {categories[0] && (
        <>
          <Polygon points="10,40 30,20 50,40" fill="#FF6347" />
          <Rect x="15" y="40" width="30" height="30" fill="#FFD700" />
        </>
      )}

      {categories[1] && (
        <>
          <Rect x="65" y="35" width="40" height="35" fill="#4682B4" />
          <Rect x="65" y="30" width="40" height="5" fill="#2F4F4F" />
        </>
      )}
      
      {categories[2] && (
        <>
          <Polygon points="120,35 140,20 160,35" fill="#A52A2A" />
          <Rect x="125" y="35" width="30" height="30" fill="#8FBC8F" />
        </>
      )}
      
      {categories[3] && (
        <>
          <Polygon points="185,40 200,20 215,40" fill="#DA70D6" />
          <Rect x="190" y="40" width="20" height="40" fill="#FFF8DC" />
        </>
      )}
      
      {categories[4] && (
        <>
          <Path
            d="M250 40 Q265 20 280 40 L280 70 L250 70 Z"
            fill="#87CEEB"
          />
        </>
      )}
    </Svg> */}
    {/* Pressable overlays */}
    {/* {categories[0] && (
      <Pressable
        style={{ position: 'absolute', left: 10, top: 20, width: 40, height: 50 }}
        onPress={() => onSelect(categories[0])}
        disabled={categories[0].locked}
      />
    )}
    {categories[1] && (
      <Pressable
        style={{ position: 'absolute', left: 65, top: 30, width: 40, height: 40 }}
        onPress={() => onSelect(categories[1])}
        disabled={categories[1].locked}
      />
    )}
    {categories[1]?.locked && (
      <Entypo
        name="lock"
        size={20}
        color="black"
        style={{ position: 'absolute', left: 75, top: 35 }}
      />
    )}
    {categories[2] && (
      <Pressable
        style={{ position: 'absolute', left: 115, top: 30, width: 40, height: 50 }}
        onPress={() => onSelect(categories[2])}
        disabled={categories[2].locked}
      />
    )}
    {categories[2]?.locked && (
      <Entypo
        name="lock"
        size={20}
        color="black"
        style={{ position: 'absolute', left: 130, top: 35 }}
      />
    )}
    {categories[3] && (
      <Pressable
        style={{ position: 'absolute', left: 165, top: 30, width: 40, height: 50 }}
        onPress={() => onSelect(categories[3])}
        disabled={categories[3].locked}
      />
    )}
    {categories[3]?.locked && (
      <Entypo
        name="lock"
        size={20}
        color="black"
        style={{ position: 'absolute', left: 190, top: 35 }}
      />
    )}
    {categories[4] && (
      <Pressable
        style={{ position: 'absolute', left: 215, top: 30, width: 40, height: 50 }}
        onPress={() => onSelect(categories[4])}
        disabled={categories[4].locked}
      />
    )}
    {categories[4]?.locked && (
      <Entypo
        name="lock"
        size={20}
        color="black"
        style={{ position: 'absolute', left: 245, top: 35 }}
      />
    )} */}
    
    <View style={[layout.center, { paddingTop: 15, }]}>
      {categories.map((category) => {
        const isLocked = !category.unlocked;
        console.log('Locked: ', isLocked);
        return(
        <Pressable
          key={category.categoryID}
          disabled={isLocked}
          onPress={() => onSelect(category)}
          style={styles.category}
        >
          <Text style={[textStyles.subtitle, { opacity: isLocked ? 0.4 : 1 }]}>
            {category.name} {isLocked ? '(Locked)' : '(Unlocked)'} {category.unlocked}
          </Text>
        </Pressable>)
      })}
    </View>
  </View>)
};

const styles = StyleSheet.create({
  category: { 
    padding: 10, 
    backgroundColor: colors.violet, 
    marginBottom: 5,
    width: '90%',
    borderColor: colors.lightviolet,
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
  }
})

export default HouseIcons;