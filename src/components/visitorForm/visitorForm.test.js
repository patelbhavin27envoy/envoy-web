import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';

import configureMockStore from "redux-mock-store";

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { VisitorForm } from '../VisitorForm'
import Search from "../Search/Search";
import {Visitor} from "../visitor";

let visitors = [{
        firstName : 'John',
        lastName : 'Doe',
        notes : 'test first',
        signedOutDate : new Date('02/09/2019').toDateString()
    },
    {
        firstName : 'Esteban',
        lastName : 'Arango',
        notes : 'Frisbee and Vegan food',
        signedOutDate : new Date('04/24/2019').toDateString()
    },
    {
        firstName : 'Ryan',
        lastName : 'Labouve',
        notes : 'Everything about Oklahoma',
        signedOutDate : null
    }];

// For Redux
Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();
const store = mockStore({
    venues : visitors
});


describe("VisitorForm Component :: ", () => {

    it("should render", () => {

        // Act
        let component = renderer.create(
            <MemoryRouter>
            <VisitorForm />
            </MemoryRouter>
    ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        // Act
        component = mount(
            <MemoryRouter>
            <VisitorForm />
            </MemoryRouter>
    );

        // Assert
        expect((component).prop('state')).not.toEqual(null);
        expect(component.find('form')).not.toEqual(null);
        expect(component.find('.py3.block')).not.toEqual(null);
        expect(component.find('.form-name').text()).toContain('Welcome to Envoy!!');
        expect(component.find('.new-visitor').text()).toContain('Add Details For Your Visit.');
        expect(component.find('.field').text()).toContain('First Name');
        expect(component.find('.field').text()).toContain('Last Name');
        expect(component.find('.field').text()).toContain('Note');

        component.find('.firstName').simulate('change', {target: {name: 'firstName', value: 'John'}});
        component.find('.lastName').simulate('change', {target: {name: 'lastName', value: 'Doe'}});
        component.find('.note').simulate('change', {target: {name: 'note', value: 'note'}});

    });

    it("should check goBack link", () => {

         // Act
        const component = mount(
            <MemoryRouter initialEntries={[ '/visitors']}>
                <VisitorForm />
            </MemoryRouter>
        );

        // Assert
        expect((component).prop('state')).not.toEqual(null);
        component.find('.go-back').simulate('click');

        // const instance = component.instance();
        // expect((component).prop('goBack')).not.toEqual(null);
        // jest.spyOn(instance, (instance).prop('goBack'));
        // instance.componentDidMount();
        // expect(instance.func).toHaveBeenCalled();
        //
        // expect(methodNameFake).toHaveBeenCalledTimes(1);
    });



    it("should check reset and save :: Failure ", () => {

        // define the response
        const mockSuccessResponse = {status : true, visitor : [visitors[2]]};

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4

        // Act
        const component = mount(
            <MemoryRouter >
                <VisitorForm />
            </MemoryRouter>
         );


        component.find('.firstName').simulate('change', {target: {name: 'firstName', value: 'John'}});
        component.find('.lastName').simulate('change', {target: {name: 'lastName', value: 'Doe'}});
        component.find('.note').simulate('change', {target: {name: 'note', value: 'note'}});

        component.find('.reset').simulate('click');
        component.find('.save').simulate('click');

        // expect(component.state('error')).toBe(false);
        expect(component).toMatchSnapshot();

    });


    it("should check SAVE :: success ", () => {

        // define the response
        const mockSuccessResponse = {status : true, visitor : [visitors[2]]};

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4

        // Act
        const component = mount(
            <MemoryRouter >
            <VisitorForm />
            </MemoryRouter>
        );

        component.find('.firstName').simulate('change', {target: {name: 'firstName', value: 'John'}});
        component.find('.lastName').simulate('change', {target: {name: 'lastName', value: 'Doe'}});
        component.find('.note').simulate('change', {target: {name: 'note', value: 'note'}});

        component.find('.save').simulate('click');

        // expect(component.state('error')).toBe(false);
        expect(component).toMatchSnapshot();

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
        const component = mount(
            <MemoryRouter >
                <VisitorForm />
            </MemoryRouter>
        );

        component.find('.firstName').simulate('change', {target: {name: 'firstName', value: 'John'}});
        component.find('.lastName').simulate('change', {target: {name: 'lastName', value: 'Doe'}});
        component.find('.note').simulate('change', {target: {name: 'note', value: 'note'}});

        component.find('.save').simulate('click');

        // expect(component.state('error')).toBe(false);
        expect(component).toMatchSnapshot();
    });

});

