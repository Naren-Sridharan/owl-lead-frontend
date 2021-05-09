import React from "react";
import { render } from "@testing-library/react-native";
import Information from "./InformationComponent";

describe("<Information />", () => {
	["Home", "Anyone Around?", "PSO Finder", "Emergency Contacts"].map((page) => {
		it(`${page} information page should have 3 sections with titles containing one text, one icon list and one FAQs section`, () => {
			const component = render(<Information page={page} />);

			const { getByTestId } = component;
			["1", "2", "3"].map((i) => {
				expect(getByTestId(`section${i}`)).toBeTruthy();
				expect(getByTestId(`title${i}`)).toBeTruthy();
				expect(getByTestId(`icons`)).toBeTruthy();
				expect(getByTestId(`text`)).toBeTruthy();
				expect(getByTestId(`FAQs`)).toBeTruthy();
				expect(getByTestId(`FAQs`).children.length).toBeGreaterThan(1);
			});

			//fireEvent.press(getByTestId("emergencyButton"));
		});
	});
});
