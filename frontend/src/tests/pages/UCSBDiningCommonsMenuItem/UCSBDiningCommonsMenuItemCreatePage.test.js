
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { render, screen } from "@testing-library/react";

import UCSBDiningCommonsMenuItemsCreatePage from "main/pages/UCSBDiningCommonsMenuItem/UCSBDiningCommonsMenuItemCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";


import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("UCSBDiningCommonsMenuItemCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
=======
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

describe("UCSBDiningCommonsMenuItemsCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const setupUserOnly = () => {

        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {

    };

    const queryClient = new QueryClient();
    test("Renders expected content", () => {
        // arrange

        setupUserOnly();
       
        // act

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDiningCommonsMenuItemsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

    });

    test("on submit, makes request to backend, and redirects to backend", async () => { 

        const queryClient = new QueryClient();
        const UCSBDiningCommonsMenuItem = {
            id: 1,
            diningCommonsCode: "ortega",
            name: "Baked Pesto Pasta with Chicken",
            station: "Entree Specials"
        };

        axiosMock.onPost("/api/diningcommonsmenuitem/post").reply(202, UCSBDiningCommonsMenuItem);

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBDiningCommonsMenuItemsCreatePage /> 
                </MemoryRouter>
            </QueryClientProvider>
        )

        await waitFor(() => { 
            expect(screen.getByLabelText("Dining Commons Code")).toBeInTheDocument(); // id here? 
        });

        // const idInput = screen.getByLabelText("Id"); // err alr did that tho?
        // expect(idInput).toBeInTheDocument();

        const diningCommonsCodeInput = screen.getByLabelText("Dining Commons Code");
        expect(diningCommonsCodeInput).toBeInTheDocument(); 

        const nameInput = screen.getByLabelText("Name");
        expect(nameInput).toBeInTheDocument();

        const stationInput = screen.getByLabelText("Station");
        expect(stationInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        //fireEvent.change(idInput, { target: { value: '1' } })
        fireEvent.change(diningCommonsCodeInput, { target: { value: 'ortega' } }) 
        fireEvent.change(nameInput, { target: { value: 'Baked Pesto Pasta with Chicken' } })
        fireEvent.change(stationInput, { target: { value: 'Entree Specials' } })
        fireEvent.click(createButton); 

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1)); // what is this 

        expect(axiosMock.history.post[0].params).toEqual({
            //id: 1,
            diningCommonsCode: "ortega",
            name: "Baked Pesto Pasta with Chicken",
            station: "Entree Specials"
        });

        // assert - check that the toast was called with the expected message
        expect(mockToast).toBeCalledWith("New UCSBDiningCommonsMenuItem Created - id: 1 diningCommonsCode: ortega name: Baked Pesto Pasta with Chicken station: Entree Specials");
        expect(mockNavigate).toBeCalledWith({ "to": "/diningcommonsmenuitem" }); // this is rlly suspicious bc it didnt pass when i made the fires different 

    });

        // assert
        expect(screen.getByText("Create page not yet implemented")).toBeInTheDocument();
    });

});


