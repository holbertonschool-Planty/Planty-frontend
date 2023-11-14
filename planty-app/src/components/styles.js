import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  inputContainers: {
    elevation: 5,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '82%',
    height: 60,
  },

  inputContainersUser: {
    elevation: 5,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#38CE61',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '82%',
    height: 60,
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

  homeActivity: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 6,
    color: '#22A546',
    zIndex: 10,
    left: '4%',
    elevation: 8,
  },

  content: {
    flex: 1,
    marginTop: '50%'
  },

  addButton: {
    width: 140,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#252423',
    opacity: 0.9,
  },

  addDeviceButton: {
    width: 180,
    height: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: '16%',
    flexDirection: 'column',
  },

  addPlantyButton: {
    color: '#fff',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
