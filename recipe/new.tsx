import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/useAuth';


export default function NewRecipe() {
const { session } = useAuth();
const router = useRouter();
const [name, setName] = useState('');
const [tags, setTags] = useState('');
const [ingredients, setIngredients] = useState('');
const [steps, setSteps] = useState('');


const save = async () => {
if (!session) return;
const { data, error } = await supabase.from('recipes').insert({
owner_id: session.user.id,
name,
tags: tags ? tags.split(',').map((t) => t.trim()) : null,
ingredients,
steps,
}).select('id').single();
if (!error && data) router.replace(`/recipe/${data.id}`);
};


return (
<ScrollView className="flex-1 p-4 gap-3 bg-white">
<Text className="text-xl font-bold">New Recipe</Text>
<TextInput className="border rounded-xl p-3" placeholder="Name" value={name} onChangeText={setName} />
<TextInput className="border rounded-xl p-3" placeholder="tags (comma separated)" value={tags} onChangeText={setTags} />
<Text className="font-semibold">Ingredients</Text>
<TextInput className="border rounded-xl p-3 min-h-[120px]" multiline value={ingredients} onChangeText={setIngredients} />
<Text className="font-semibold">Steps</Text>
<TextInput className="border rounded-xl p-3 min-h-[160px]" multiline value={steps} onChangeText={setSteps} />
<Pressable onPress={save} className="bg-black rounded-2xl px-5 py-3 self-start mt-2"><Text className="text-white">Save</Text></Pressable>
</ScrollView>
);
}