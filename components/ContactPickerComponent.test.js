import React from "react";
import { render } from "@testing-library/react-native";
import ContactPicker from "./InformationComponent";

describe("<ContactPicker />", () => {
	it("Contact picker is rendered", () => {
		const component = render(<ContactPicker />);
		const tree = component.toJSON();
		expect(component).toBeTruthy();
		expect(tree.children.length).toBe(1);
	});
});
