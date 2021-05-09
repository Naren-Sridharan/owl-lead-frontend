import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Menu from "./MenuComponent";
import { Actions } from "../redux/actions";

const mockStore = configureStore([]);

describe("<Menu />", () => {
	let component;
	let store;
	let navigation;

	beforeEach(() => {
		state = {
			show_options: false,
		};

		store = mockStore(() => state);
		store.dispatch = jest.fn();
		navigation = { navigate: jest.fn((page) => page) };
		route = { name: "Home" };

		component = render(
			<Provider store={store}>
				<Menu navigation={navigation} route={route} />
			</Provider>
		);
	});

	it("has 3 elements", () => {
		const tree = component.toJSON();
		expect(tree.length).toBe(3);
	});

	it("has a child called menuButton", () => {
		const { getByTestId } = component;
		expect(getByTestId("menuButton")).toBeTruthy();
	});

	it("has a child called emergencyButton", () => {
		const { getByTestId } = component;
		expect(getByTestId("emergencyMenuButton")).toBeTruthy();
	});

	it("should dispatch an showOptions on menuButton click", () => {
		const { getByTestId } = component;

		fireEvent.press(getByTestId("menuButton"));

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith(Actions.showOptions());
	});

	it("should dispatch an showEmergencyOptions on emergencyMenuButton click", () => {
		const { getByTestId } = component;

		fireEvent.press(getByTestId("emergencyMenuButton"));

		expect(store.dispatch).toHaveBeenCalledTimes(2);
		expect(store.dispatch).toHaveBeenCalledWith(Actions.showEmergencyOptions());
	});
});
