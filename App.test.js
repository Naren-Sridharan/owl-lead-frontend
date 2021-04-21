import React from "react";
import renderer from "react-test-renderer";
import App from "./App";

describe("<App />", () => {
	it("has more than one child", () => {
		const tree = renderer.create(<App />).toJSON();
		expect(tree.children.length).toBeGreaterThan(1);
	});
});
