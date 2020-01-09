
require('fetch-reply-with');

import React from 'react';
import renderer from 'react-test-renderer';

import { shallow, mount } from "enzyme";
import { MemoryRouter } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Search from './Search'

describe("Search Component :: ", () => {

    it("should render without throwing an error", () => {
        expect(
            renderer.create(
                <MemoryRouter>
                    <Search/>
                </MemoryRouter>
            )
        ).not.toBe(null);
    });


    it("should render search inputs UI", () => {

        // Act
        let component = renderer.create(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>
        ).toJSON();
        // snapshot
        expect(component).toMatchSnapshot();


        // Act
        component = mount(
            <MemoryRouter>
                <Search/>
            </MemoryRouter>
        );

        // Assert
        expect((component).prop('state')).not.toEqual(null);
        expect(component.find('form')).not.toEqual(null);
        expect(component.find('.py3.block')).not.toEqual(null);
        expect(component.find('.search-item-m').text()).toEqual('');
        expect(component.find('.new-visitor').text()).toContain('New visitor');
    });


    it("should change state with value change in input fields", () => {


        // define the response
        const mockSuccessResponse = {status : true, visitor : []};
        // fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse));

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        let component = mount(
            <MemoryRouter keyLength={0}>
                <Search/>
            </MemoryRouter>
        );


        ////////////
        // Assert
        ////////////

        // basic check
        expect((component).prop('state')).not.toEqual(null);
        expect(component.find('form')).not.toEqual(null);
        expect(component.find('.py3.block')).not.toEqual(null);
        expect(component.find('.new-visitor').text()).toContain('New visitor');

        // type in the text
        component.find('.search-item-m').simulate('change', {target: {name: 'searchItem', value: 'john'}});
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(endPoint);

        component.setState({inputError: true});

    });


    it("should change state with value from API error", () => {


        // define the response
        const mockSuccessResponse = null;
        // fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse));

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        let component = mount(
            <MemoryRouter keyLength={0}>
                <Search/>
            </MemoryRouter>
        );

        ////////////
        // Assert
        ////////////

        // basic check
        expect((component).prop('state')).not.toEqual(null);
        expect(component.find('form')).not.toEqual(null);
        expect(component.find('.py3.block')).not.toEqual(null);
        expect(component.find('.new-visitor').text()).toContain('New visitor');

        // type in the text
        component.find('.search-item-m').simulate('change', {target: {name: 'searchItem', value: 'john'}});
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledWith(endPoint);

        component.find('.new-visitor').simulate('click');

    });


    it("should search items based on search", () => {

        // define the response
        const mockSuccessResponse = null;
        // fetch.mockResponseOnce(JSON.stringify(mockSuccessResponse));

        // let's mock the service call
        const endPoint = 'http://localhost:8080/api/visitors?name=JohnDelete';
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => { return mockFetchPromise }); // 4


        // Act
        let component = mount(
            <MemoryRouter keyLength={0}>
            <Search/>
            </MemoryRouter>
    );

        ////////////
        // Assert
        ////////////

        // basic check
        expect((component).prop('state')).not.toEqual(null);
        expect(component.find('form')).not.toEqual(null);
        expect(component.find('.py3.block')).not.toEqual(null);
        expect(component.find('.search-item-s').text()).toEqual('');
        expect(component.find('.new-visitor').text()).toContain('New visitor');

        // type in the text
        component.find('.search-item-m').simulate('change', {target: {name: 'searchItem', value: 'JohnDelete'}});
        expect(global.fetch).toHaveBeenCalledTimes(3);

        component.find('.search').first().simulate('click');
        expect(global.fetch).toHaveBeenCalledTimes(4);
        expect(global.fetch).toHaveBeenCalledWith(endPoint);

    });



});

