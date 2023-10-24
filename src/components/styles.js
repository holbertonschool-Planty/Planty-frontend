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
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxHeight: '70%',
  },

  headings: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    margin: 30,
    color: '#252423',
  },

  content: {
    flex: 1,
    marginTop: '50%'
  }
});
