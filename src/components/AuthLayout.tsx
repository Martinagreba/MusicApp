import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BackgroundGradient from "./BackgroundGradient";

interface AuthLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

const AuthLayout = ({ children, scrollable }: AuthLayoutProps) => {
  return (
    <BackgroundGradient>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoiding}
          behavior="padding"
          keyboardVerticalOffset={0}
        >
          {scrollable ? (
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              persistentScrollbar={false}
            >
              {children}
            </ScrollView>
          ) : (
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={styles.centerContainer}>{children}</View>
            </TouchableWithoutFeedback>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BackgroundGradient>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
