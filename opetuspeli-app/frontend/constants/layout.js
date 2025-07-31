import { StyleSheet } from "react-native";

export const colors = {
    primary: "#8DD54F",
    secondary: "#54932f",
    lightgreen: '#f0f8eb',
    blue: '#A8F4FF',
    orange: '#FFB425',
    darkorange: '#FFB425',
    lightorange: '#FFCA66',
    violet: '#BF8FFD',
    lightviolet: '#d8bbfe',
    text: "#333333",
    white: '#ffffff',
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
};

export const textStyles = StyleSheet.create({
  default: {
      fontFamily: "ABeeZee",
      color: colors.text,
      fontSize: 16,
      lineHeight: 19,
  },
  mainTitle: {
      fontSize: 50,
      color: colors.white,
      fontFamily: 'LuckiestGuy',
      marginBottom: 30,
      marginTop: 10,
      textAlign: 'center',
      alignSelf: 'center',
  },
  subtitle: { 
      fontSize: 22, 
      color: colors.white,
      fontFamily: 'ABeeZee',
      marginBottom: 10,
      textAlign: 'center',
      alignSelf: 'center',
  },
  title: {
      fontFamily: 'LuckiestGuy',
      color: colors.white,
      fontSize: 35,
      marginBottom: 10,
      textAlign: 'center',
  },
  label: {
      fontSize: 14,
      fontFamily: "ABeeZee",
      color: colors.secondary,
      marginVertical: 10,
  },
  buttonText: {
      fontFamily: 'ABeeZee',
      fontSize: 18,
      color: colors.text,
  },
  buttonTextInner: {
      color: '#ffffff',
      fontFamily: 'NunitoBold',
  }
});

export const layout = StyleSheet.create({ 
  screen: {
      flex: 1,
  },
  scrollContent: {
      paddingBottom: 10,
      backgroundColor: colors.lightgreen,
  },
  mainContainer: {
      flex: 1,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
  container: {
      padding: 10,
      flex: 1,
      backgroundColor: colors.primary,
  },
  wrapper: {
        padding: 10,
        backgroundColor: colors.lightgreen
  },
  innerContainer: {
      flex: 1,
      backgroundColor: colors.white,
      paddingHorizontal: 16,
      paddingVertical: 20,
  },
  formContainer: {
      backgroundColor: colors.lightgreen,
      borderColor: '#00C04B',
      borderWidth: 2,
      borderRadius: 20,
      paddingHorizontal: 30,
      paddingVertical: 20,
      width: '100%',
  },
  shadowStyle: {
      shadowColor: '#000',
      shadowOffset: { width: 4, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,
  },
  button: {
      width: 150,
      height: 60,
      backgroundColor: '#fff',
      borderRadius: 50,
      borderWidth: 3,
      borderColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 15,
  },
  input : {
      height: 30,
      lineHeight: 30,
      borderColor: colors.secondary,
      borderWidth: 2,
      borderRadius: 15,
      backgroundColor: colors.white,
      marginBottom: 10,
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  avatar: {
      width: 35,
      height: 35,
      borderWidth: 3,
      borderColor: colors.secondary,
      borderRadius: 100,
},
  image: {
      width: 75, 
      height: 75, 
      marginRight: 10,
      borderWidth: 2,
      borderColor: colors.secondary,
      borderRadius: 15,
  },
  categoryWrapper: {
      backgroundColor: colors.primary,
      borderBottomWidth: 2,
      borderColor: colors.secondary,
      paddingTop: 15,
  },
  buttonInner: {
      width: 120,
      height: 50,
      borderRadius: 50,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
});