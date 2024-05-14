import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MenuItemReviewCreatePage from "main/pages/MenuItemReview/MenuItemReviewCreatePage";
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

describe("MenuItemReviewCreatePage tests", () => {

    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
        jest.clearAllMocks();
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
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const review = {
            id: 4,
            itemId: 4,
            reviewerEmail: "rando@ucsb.edu",
            stars: 0,
            dateReviewed: "2022-01-03T00:00",
            comments: "Absolutely disgusting."
        };

        axiosMock.onPost("/api/menuitemreview/post").reply( 202, review );

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByLabelText(/Item ID/)).toBeInTheDocument();
        });

        const itemIdInput = screen.getByLabelText(/Item ID/);
        expect(itemIdInput).toBeInTheDocument();

        const reviewerEmailInput = screen.getByLabelText(/Reviewer Email/);
        expect(reviewerEmailInput).toBeInTheDocument();

        const starsInput = screen.getByLabelText(/Stars/);
        expect(starsInput).toBeInTheDocument();

        const dateReviewedInput = screen.getByLabelText(/Date Reviewed/);
        expect(dateReviewedInput).toBeInTheDocument();

        const commentsInput = screen.getByLabelText(/Comments/);
        expect(commentsInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        fireEvent.change(itemIdInput, { target: { value: 4 } })
        fireEvent.change(reviewerEmailInput, { target: { value: 'rando@ucsb.edu' } })
        fireEvent.change(starsInput, { target: { value: 0 } })
        fireEvent.change(dateReviewedInput, { target: { value: '2022-01-03T00:00' } })
        fireEvent.change(commentsInput, { target: { value: 'Absolutely disgusting.' } })
        fireEvent.click(createButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            itemId: "4",
            reviewerEmail: "rando@ucsb.edu",
            stars: "0",
            dateReviewed: "2022-01-03T00:00",
            comments: "Absolutely disgusting."
        });

        // assert - check that the toast was called with the expected message
        expect(mockToast).toBeCalledWith("New MenuItemReview Created - id: 4 itemId: 4 reviewerEmail: rando@ucsb.edu stars: 0 dateReviewed: 2022-01-03T00:00 comments: Absolutely disgusting.");
        expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreview" });
    });

});


