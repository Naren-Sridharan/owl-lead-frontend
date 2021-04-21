import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Menu from "./MenuComponent";
import { Actions } from "../redux/actions";

const mockStore = configureStore([]);

describe("<Loading />", () => {
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

		component = render(
			<Provider store={store}>
				<Menu navigation={navigation} />
			</Provider>
		);
	});

	it("has 2 elements", () => {
		const tree = component.toJSON();
		expect(tree.length).toBe(2);
	});

	it("has a child called menuButton", () => {
		const { getByTestId } = component;
		expect(getByTestId("menuButton")).toBeTruthy();
	});

	it("has a child called emergencyButton", () => {
		const { getByTestId } = component;
		expect(getByTestId("emergencyButton")).toBeTruthy();
	});

	it("should dispatch an showOptions on menuButton click", () => {
		const { getByTestId } = component;

		fireEvent.press(getByTestId("menuButton"));

		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(Actions.showOptions());
	});

	it("should navigate on emergency button click", () => {
		const { getByTestId } = component;

		fireEvent.press(getByTestId("emergencyButton"));

		expect(navigation.navigate).toHaveBeenCalledTimes(1);
	});
});
