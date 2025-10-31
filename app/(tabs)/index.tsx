import { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';


type Recipe = { id: string; name: string; tags: string[] | null };


export default function Home() {
const { session } = useAuth();
const [recipes, setRecipes] = useState<Recipe[]>([]);


useFocusEffect(() => {
(async () => {
const { data } = await supabase
.from('recipes')
.select('id,name,tags')
.order('inserted_at', { ascending: false })
.eq('owner_id', session?.user.id);
setRecipes(data ?? []);
})();
});


return (
<View className="flex-1 p-4 gap-4 bg-white">
<Link href="/recipe/new" asChild>
<Pressable className="bg-black rounded-2xl px-5 py-3 self-start"><Text className="text-white">New Recipe</Text></Pressable>
</Link>
<FlatList
data={recipes}
keyExtractor={(r) => r.id}
renderItem={({ item }) => (
<Link href={`/recipe/${item.id}`} asChild>
<Pressable className="p-4 border rounded-2xl mb-3">
<Text className="text-lg font-semibold">{item.name}</Text>
<Text className="text-gray-500">{item.tags?.join(', ')}</Text>
</Pressable>
</Link>
)}
/>
</View>
);
}