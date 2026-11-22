import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Verification'
>;

export default function VerificationScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>
        Verify your identity
      </Text>

      <Text style={styles.subtitle}>
        To keep your account secure and comply with financial
        regulations, we'll need to verify your identity before
        you can use Veyra's financial services.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>
          What you'll need
        </Text>

        <Text style={styles.infoItem}>
          • A valid identity document
        </Text>

        <Text style={styles.infoItem}>
          • Your personal details
        </Text>

        <Text style={styles.infoItem}>
          • A few minutes to complete verification
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>
          Start verification
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.secondaryText}>
          I'll do this later
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 80,
    alignItems: 'center',
  },

  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },

  icon: {
    fontSize: 32,
    color: '#111827',
    fontWeight: '700',
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 28,
  },

  infoBox: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },

  infoItem: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },

  button: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    marginTop: 16,
    padding: 12,
  },

  secondaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
});