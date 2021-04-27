import React, { useState } from "react";
import {
	Alert,
	Text,
	TextInput,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Keyboard,
} from "react-native";
import { COLORS } from "../shared/constants";

const Login = ({ navigation }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/owl_lead.png")}
				style={styles.logo}
			/>
			<TextInput
				value={username}
				onChangeText={(username) => setUsername(username)}
				placeholder={"Username"}
				style={styles.input}
			/>
			<TextInput
				value={password}
				onChangeText={(password) => setPassword(password)}
				placeholder={"Password"}
				secureTextEntry={true}
				style={styles.input}
			/>
			<TouchableOpacity
				title={"Login"}
				style={styles.button}
				onPress={() => {
					Keyboard.dismiss();
					setUsername("");
					setPassword("");
					username === "tester" && password === "TeamMA26!"
						? navigation.navigate("Home")
						: Alert.alert(
								"Incorrect Login Attempt!",
								"Invalid username or password. Please try again."
						  );
				}}
			>
				<Text style={styles.button_text}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.dark,
	},
	input: {
		width: 300,
		height: 44,
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: COLORS.light,
		backgroundColor: COLORS.light,
		color: COLORS.dark,
		margin: 10,
		fontSize: 25,
	},
	button: {
		width: 200,
		height: 44,
		padding: 5,
		borderWidth: 1,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		borderColor: COLORS.light,
		backgroundColor: COLORS.highlight,
		margin: 10,
	},
	button_text: {
		color: COLORS.levels.high,
		fontSize: 25,
		fontWeight: "bold",
	},
	logo: {
		width: 150,
		height: 150,
		margin: 40,
	},
});

export default Login;
