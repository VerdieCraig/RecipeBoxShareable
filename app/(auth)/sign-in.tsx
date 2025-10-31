import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';


export default function SignIn() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState<string | null>(null);
const router = useRouter();


const signIn = async () => {
setError(null);
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
if (error) return setError(error.message);
router.replace('/(tabs)');
};


return (
<View className="flex-1 items-center justify-center p-6 gap-4 bg-white">
<Text className="text-2xl font-bold">Sign in</Text>
<TextInput className="w-full border rounded-xl p-3" placeholder="Email" autoCapitalize="none" value={email} onChangeText={setEmail} />
<TextInput className="w-full border rounded-xl p-3" placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
{error && <Text className="text-red-600">{error}</Text>}
<Pressable onPress={signIn} className="bg-black rounded-2xl px-5 py-3"><Text className="text-white text-center">Continue</Text></Pressable>
</View>
);
}