import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize } from '../constants/tokens';

export default function Login() {
const router = useRouter();

const handleLogin = () => {
  console.log('Loggin in...')
}

const goToSignUp = () => {
  router.push('/signup');
}

  return (
   <AuthLayout>
        <View style={styles.header}>
      <Text style={styles.text}>Log In</Text>
      </View>
      <View style={styles.inputcontainer}>
      <Input placeholder="Email Address" />
      <Input placeholder="Password" secureTextEntry />
       </View>
      <Button title="Log In" onPress={handleLogin}/>
      <View style={styles.footer}>
       <Text style={styles.footerText}>Don&apos;t have an account?</Text>
       <TouchableOpacity>
        <Text style={styles.footerLink} onPress={goToSignUp}>Sign Up</Text>
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
