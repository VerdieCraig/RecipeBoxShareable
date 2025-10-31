import { Pressable, Text, ViewStyle } from 'react-native';


export default function Button({ title, onPress, style }: { title: string; onPress?: () => void; style?: ViewStyle }) {
return (
<Pressable onPress={onPress} className="bg-black rounded-2xl px-5 py-3">
<Text className="text-white text-center">{title}</Text>
</Pressable>
);
}