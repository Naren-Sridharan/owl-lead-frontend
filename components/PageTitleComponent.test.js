import React from "react";
import { render } from "@testing-library/react-native";
import PageTitle from "./PageTitleComponent";

describe("<Loading />", () => {
	let component;
	const route = { name: "page" };
	beforeEach(() => {
		component = render(<PageTitle route={route} />);
	});
	it("has only one child", () => {
		const tree = component.toJSON();
		expect(tree.children.length).toBe(1);
	});
	it("has a child called pageTitle", () => {
		const { getByTestId } = component;
		expect(getByTestId("pageTitle")).toBeTruthy();
	});
});
