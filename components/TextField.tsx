import { TextInput, TextInputProps } from 'react-native';
export default function TextField(props: TextInputProps) {
return <TextInput {...props} className={`border rounded-xl p-3 ${props.className ?? ''}`} />;
}