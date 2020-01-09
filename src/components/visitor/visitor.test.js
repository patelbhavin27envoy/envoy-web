import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Visitor } from '../Visitor'

let visitors = [{
        firstName : 'John',
        lastName : 'Doe',
        notes : 'test first',
        signOutTime : new Date('02/09/2019').toDateString()
    },
    {
        firstName : 'Esteban',
        lastName : 'Arango',
        notes : 'Frisbee and Vegan food',
        signOutTime : new Date('04/24/2019').toDateString()
    },
    {
        firstName : 'Ryan',
        lastName : 'Labouve',
        notes : 'Everything about Oklahoma',
        signOutTime : null,
        signedOut: null,
        _id :122
    },
    {
        firstName : 'Esteban',
        lastName : 'Arango',
        notes : 'Frisbee and Vegan food',
        signedOut: true,
        signedIn : true,
        signOutTime : new Date('04/24/2019').toDateString(),
        _id: 123
    },
    {
        firstName : 'Esteban',
        lastName : 'Arango',
        notes : 'Frisbee and Vegan food',
        signedOut: true,
        signedIn : false,
        signOutTime : new Date('04/24/2019').toDateString()
    }];

// For Redux
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({
    venues : visitors
});


describe("Visitor Component :: ", () => {

    it("should render without throwing an error", () => {
        expect(
            renderer.create(
                <table>
                    <tbody>
                        <Visitor visitor={visitors[0]}/>
                    </tbody>
                </table>
            )
        ).not.toBe(null);
    });

    it("should render ", () => {

        // Act
        const component = mount(
            <table>
                <tbody>
                    <Visitor visitor={visitors[2]}/>
                </tbody>
            </table>
        );

        // Assert
        expect(component).toMatchSnapshot();
    });


    it("should make API call with signin and signout ", () => {

        // Act
        let component = renderer.create(
            <table>
                <tbody>
                    <Visitor visitor={visitors[3]}/>
                </tbody>
            </table>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        // Act
        component = renderer.create(
            <table>
                <tbody>
                <Visitor visitor={visitors[4]}/>
                </tbody>
            </table>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();
    });

    it("should make API call :: Success ", () => {

        // Act
        let component = renderer.create(
            <table>
                <tbody>
                <Visitor visitor={visitors[2]}/>
                </tbody>
            </table>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        // define the response
        const mockSuccessResponse = {status : true, visitor : [visitors[2]]};

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors/122';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        component= shallow(
                <Visitor visitor={visitors[2]}/>
        );

        // Assert
        expect(component.state('loading')).toBe(false);
        expect(component.state('error')).toBe(false);

        component.find('.btn-smaller').simulate('click');
        expect(component.state('loading')).toBe(true);
        expect(component.state('error')).toBe(false);
    });


    it("should make API call :: Failure ", () => {

        // define the response
        const mockSuccessResponse = {};

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors/123';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        const component = shallow(
            <Visitor visitor={visitors[2]} />
        );

        // Assert
        expect(component.state('loading')).toBe(false);
        expect(component.state('error')).toBe(false);

        component.find('.btn-smaller').simulate('click');
        expect(component.state('loading')).toBe(true);
    });


    it("should make API call :: Failure-2 ", () => {

        // define the response
        // const mockSuccessResponse = {};

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors/';
        const mockJsonPromise = Promise.resolve({data : { statue: false} });
        const mockFetchPromise = Promise.resolve({
            json: () =>  mockJsonPromise
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        const component = shallow(
            <Visitor visitor={visitors[2]} />
        );

        // Assert
        expect(component.state('loading')).toBe(false);
        expect(component.state('error')).toBe(false);

        component.find('.btn-smaller').simulate('click');
        expect(component.state('loading')).toBe(true);
    });

});

