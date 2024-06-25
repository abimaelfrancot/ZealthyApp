import { Stack } from "expo-router"

const StackLayout = () =>{
    return (
        <Stack >
            <Stack.Screen
            name="index"
            options={{headerTitle:"",headerShown: false}}
            />
            <Stack.Screen
            name="itemDetail"
            options={{headerTitle:"Ticket Details",headerShown: true}}
            />
        </Stack>
    )
}

export default StackLayout