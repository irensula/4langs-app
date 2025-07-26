import { StyleSheet } from "react-native";

export const colors = {
  primary: "#5CED73",
  secondary: "#6BBC3B",
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
    fontSize: 30, 
    color: colors.white,
    fontFamily: 'LuckiestGuy',
    marginBottom: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
  text: {
    fontFamily: 'ABeeZee',
    color: colors.text,
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    fontSize: 18,
    color: colors.text,
  },
  label: {
    fontSize: 14,
    fontFamily: "ABeeZee",
    color: colors.secondary,
    marginVertical: 10,
  }
});

export const layout = StyleSheet.create({ 
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
  innerContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  formContainer: {
    backgroundColor: '#f0f8eb',
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 50
}
});