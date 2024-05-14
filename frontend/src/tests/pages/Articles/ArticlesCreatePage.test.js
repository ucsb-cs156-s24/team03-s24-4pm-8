
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { render, screen } from "@testing-library/react";

import ArticlesCreatePage from "main/pages/Articles/ArticlesCreatePage";
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

describe("ArticlesCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
=======
describe("ArticlesCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    const setupUserOnly = () => {

        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);

    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const article = {
            id: 17,
            title: "Levis",
            url: "http://www.levis.com",
            explanation: "A kind of denim store",
            email: "levis@gmail.com",
            dateAdded: "2023-01-02T00:00"
        };

        axiosMock.onPost("/api/articles/post").reply( 202, article );


    };

    const queryClient = new QueryClient();
    test("Renders expected content", () => {
        // arrange

        setupUserOnly();
       
        // act

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ArticlesCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );


        await waitFor(() => {
            expect(screen.getByTestId("ArticlesForm-title")).toBeInTheDocument();
        });

        const titleField = screen.getByTestId("ArticlesForm-title");
        const urlField = screen.getByTestId("ArticlesForm-url");
        const explanationField = screen.getByTestId("ArticlesForm-explanation");
        const emailField = screen.getByTestId("ArticlesForm-email");
        const dateAddedField = screen.getByTestId("ArticlesForm-dateAdded");
        const submitButton = screen.getByTestId("ArticlesForm-submit");

        fireEvent.change(titleField, { target: { value: 'Levis' } });
        fireEvent.change(urlField, { target: { value: 'http://www.levis.com' } });
        fireEvent.change(explanationField, { target: { value: 'A kind of denim store' } });
        fireEvent.change(emailField, { target: { value: 'levis@gmail.com' } });
        fireEvent.change(dateAddedField, { target: { value: '2023-01-02T00:00' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
            "title": "Levis",
            "url": "http://www.levis.com",
            "explanation": "A kind of denim store",
            "email": "levis@gmail.com",
            "dateAdded": "2023-01-02T00:00"
        });

        expect(mockToast).toBeCalledWith("New article Created - id: 17 title: Levis");
        expect(mockNavigate).toBeCalledWith({ "to": "/articles" });
    });


});

        // assert
        expect(screen.getByText("Create page not yet implemented")).toBeInTheDocument();
    });

});


