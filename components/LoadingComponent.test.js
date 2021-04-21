import React from "react";
import { render } from "@testing-library/react-native";
import Loading from "./LoadingComponent";

describe("<Loading />", () => {
	let component;
	beforeEach(() => {
		component = render(<Loading />);
	});
	it("has only two children", () => {
		const tree = component.toJSON();
		expect(tree.children.length).toBe(2);
	});
	it("has a child called loadingText", () => {
		const { getByTestId } = component;
		expect(getByTestId("loadingText")).toBeTruthy();
	});
	it("has a child called Activity Indicator", () => {
		const { getByTestId } = component;
		expect(getByTestId("activityIndicator")).toBeTruthy();
	});
});
