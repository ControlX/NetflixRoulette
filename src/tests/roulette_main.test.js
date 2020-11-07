import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import RouletteMain from "../components/RouletteMain";

const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() })

describe("RouletteMain Component", () => {
    it("should render component with hooks and redux store without any error", () => {
        const wrapper = shallow(
                <Provider store={store}>
                    <RouletteMain />
                </Provider>);
        expect(wrapper.contains(<RouletteMain />)).toBe(true);
    });
});