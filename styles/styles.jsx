import { StyleSheet } from 'react-native';

export const colors = {
  white: '#fff',
  black: '#000',
  grey: '#ccc',
  // add more colors as needed
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: colors.black, // example usage
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black, // example usage
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey, // example usage
  },
  customText: {
    fontWeight: 'bold',
    color: colors.black, // example usage
  },
});