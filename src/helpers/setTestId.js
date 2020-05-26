import {Platform} from 'react-native';

const getPlatformTestId = (id) => {
  if (Platform.OS === 'ios') {
    return {
      testID: id,
      accessibilityLabel: id,
    };
  }

  return {
    accessibilityLabel: id,
    accessible: true,
  };
};

export const setTestId = (id) => {
  return getPlatformTestId(id);
};
