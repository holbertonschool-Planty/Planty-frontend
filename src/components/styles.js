import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  topLine: {
    height: 1,
    backgroundColor: '#EBEBEB',
  },

  shadowContainer: {
    backgroundColor: '#FFFFFF',
    elevation: 18,
  },

  scrollViewContent: {
    width: '100%',
    zIndex: 1,
  }
});
