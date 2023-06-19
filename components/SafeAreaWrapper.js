import {
  useColorScheme,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  View
} from 'react-native';
import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeAreaWrapper = ({ children }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
          keyboardDismissMode="on-drag">
            <View style={{
            }}>
          {children}
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SafeAreaWrapper;
