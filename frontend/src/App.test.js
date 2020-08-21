import { render } from "@testing-library/svelte";
import App from './App.svelte';

describe("App component", () => {
    it("should render the component", () => {
        const { container } = render(App);

        expect(container).toContainHTML('Book room for this day')
    });
});