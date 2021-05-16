import React, { useState } from "react";
import {
	Alert,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS, actual_password, IMAGES } from "../shared/constants";

const Login = ({ navigation }) => {
	const [password, setPassword] = useState("");
	const intro_shown = useSelector((state) => state.intro_shown);

	return (
		<KeyboardAvoidingView
			behaviour={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<Image source={IMAGES.owl_lead} style={styles.logo} />
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
					setPassword("");
					password === actual_password
						? navigation.navigate(intro_shown ? "Home" : "Intro")
						: Alert.alert(
								"Incorrect Login Attempt!",
								"Invalid username or password. Please try again."
						  );
				}}
			>
				<Text style={styles.button_text}>Login</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
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
