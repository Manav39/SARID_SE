import { View,ScrollView,StyleSheet, Image} from 'react-native'
import React from 'react'

const StoryList = () => {
    return (
      <ScrollView
        className="mt-5"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.storyContainer}>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic1.jpeg')}
            />
          </View>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic2.jpg')}
            />
          </View>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic3.jpg')}
            />
          </View>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic4.jpg')}
            />
          </View>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic5.jpg')}
            />
          </View>
          <View style={styles.storyProfile}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/pic6.jpeg')}
            />
          </View>
        </View>
      </ScrollView>
    )
};

const styles = StyleSheet.create({
    logo:{
        width:'95%',
        height:'95%',
        borderRadius: 70/2,
    },
    storyContainer:{
        flexDirection: "row",
        paddingHorizontal:10,
    },
    storyProfile : {
        width: 70,
        height:70,
        borderRadius: 80/2,
        borderWidth: 2,
        borderColor: "black",
        marginRight:10,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StoryList;