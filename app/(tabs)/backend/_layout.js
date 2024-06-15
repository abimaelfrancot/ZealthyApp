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
            {/* 
                   <Stack.Screen
            name="productos"
            options={{headerTitle:"Productos",headerShown: true}}
            />
                <Stack.Screen
            name="notifications"
            options={{headerTitle:"Notifications",headerShown: true}}
            /> */}
        </Stack>
    )
}

export default StackLayout