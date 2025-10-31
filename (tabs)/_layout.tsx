import { Tabs, useRouter } from 'expo-router';


export default function TabsLayout() {
return (
<Tabs>
<Tabs.Screen name="index" options={{ title: 'Recipes' }} />
<Tabs.Screen name="account" options={{ title: 'Account' }} />
</Tabs>
);
}