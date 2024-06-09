import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "./src/context/authContext";
import { Text } from "react-native";

import Home from "./src/screens/home/Home";
import Signin from "./src/screens/login/Login";
import Signup from "./src/screens/signup/Signup";
import History from "./src/screens/history/History";

const Stack = createNativeStackNavigator();

export default function Layout() {
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!authState.authenticated ? (
          <>
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{
                headerBackVisible: false,
              }}
            />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Home",
                headerRight: () => <Text onPress={onLogout}>Sair</Text>,
              }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{ title: "Históricos de senhas" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
