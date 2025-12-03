import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize } from '../constants/tokens';



export default function SignUp() {
const router = useRouter();

const handleSignUp = async () => {
router.replace('/(tabs)/home');
}

const goToLogin = () => {
  router.push('/login');
}

  return (
   <AuthLayout>
        <View style={styles.header}>
      <Text style={styles.text}>Sign Up</Text>
      </View>
      <View style={styles.inputcontainer}>
        <Input placeholder="User Name" />
      <Input placeholder="Email Address" />
      <Input placeholder="Password" secureTextEntry />
      <Input placeholder="Confirm Password" secureTextEntry />
       </View>
      <Button title="Sign Up" onPress={handleSignUp}/>
      <View style={styles.footer}>
       <Text style={styles.footerText}>Do you have an account?</Text>
       <TouchableOpacity>
        <Text style={styles.footerLink} onPress={goToLogin}>Come in</Text>
       </TouchableOpacity>
      </View>
   </AuthLayout>
   
  );
}

const styles = StyleSheet.create({
  inputcontainer: {
   width: '100%',
   marginBottom: 20,
   gap: 20,

  },
  text: {
  fontSize: fontSize.xl,
  color: '#FFFFFF',
  fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  footer: {
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
  color: '#FFFFFF',
  fontSize: fontSize.base,
  },
  footerLink: {
    color: '#688EFF',
    fontSize: fontSize.base,
    marginTop: 8,

  }
});
