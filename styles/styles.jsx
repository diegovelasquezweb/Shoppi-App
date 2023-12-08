import { StyleSheet } from 'react-native';

export const colors = {
  white: '#fff',
  black: '#000',
  grey: '#ccc',
  blue: '#023047',
  orange: '#fb8500',
  cyan: '#8ecae6',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cyan,
    justifyContent: 'center',
  },
  containerStart: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.cyan
  },
  containerLanding: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.cyan
  },
  logo: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.blue,
    marginBottom: 20,
    textTransform: 'uppercase',
    fontFamily: 'Roboto'
  },
  header: {
    fontSize: 24,
    color: colors.blue,
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  brand: {
    marginBottom: 50,
  },

  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: 'Roboto',
    textTransform: 'uppercase',
    fontSize: 18,
  },
  // Styles for LoginScreen
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    textTransform: 'uppercase',
    color: colors.blue,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.orange,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.blue,
    paddingBottom: 20,
    paddingTop: 10,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    paddingVertical: 5,
  },
});