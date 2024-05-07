import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import UCSBOrganizationForm from "main/components/UCSBOrganization/UCSBOrganizationForm";
import { ucsbOrganizationFixtures } from "fixtures/ucsbOrganizationFixtures";

import { QueryClient, QueryClientProvider } from "react-query";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UCSBOrganizationForm tests", () => {
    const queryClient = new QueryClient();

    const expectedHeaders = ["orgTranslationShort", "orgTranslation"];
    const testId = "UCSBOrganizationForm";

    test("renders correctly with no initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UCSBOrganizationForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

    });

    test("renders correctly when passing in initialContents", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UCSBOrganizationForm initialContents={ucsbOrganizationFixtures.oneOrganization} />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();

        expectedHeaders.forEach((headerText) => {
            const header = screen.getByText(headerText);
            expect(header).toBeInTheDocument();
        });

        expect(await screen.findByTestId(`${testId}-orgCode`)).toBeInTheDocument(); // check
        expect(screen.getByText(`orgCode`)).toBeInTheDocument(); // check orgCode -> Id
    });


    test("that navigate(-1) is called when Cancel is clicked", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UCSBOrganizationForm />
                </Router>
            </QueryClientProvider>
        );
        expect(await screen.findByTestId(`${testId}-cancel`)).toBeInTheDocument();
        const cancelButton = screen.getByTestId(`${testId}-cancel`);

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

    test("that the correct validations are performed", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UCSBOrganizationForm />
                </Router>
            </QueryClientProvider>
        );

        expect(await screen.findByText(/Create/)).toBeInTheDocument();
        const submitButton = screen.getByText(/Create/);
        fireEvent.click(submitButton);
        const mockSubmit = screen.getByTestId(`${testId}-submit`);
        fireEvent.change(mockSubmit, { target: { value: "" } });

        //const mockSubmitAction = jest.fn();
        //await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        //await screen.findByText(/orgCode is required/);
        await screen.findByText(/orgTranslationShort is required/);
        expect(screen.getByText(/orgCode is required/)).toBeInTheDocument();
        expect(screen.getByText(/orgTranslation is required/)).toBeInTheDocument();

        

        //const orgCodeInput = screen.getByTestId(`${testId}-orgCode`);
        //fireEvent.change(orgCodeInput, { target: { value: "a".repeat(6) } });
        
        const orgTranslationShortInput = screen.getByTestId(`${testId}-orgTranslationShort`);
        fireEvent.change(orgTranslationShortInput, { target: { value: "a".repeat(31) } });

        const orgTranslationInput = screen.getByTestId(`${testId}-orgTranslation`);
        fireEvent.change(orgTranslationInput, { target: { value: "a".repeat(51) } });

        const inactiveTrueInput = screen.getByTestId(`${testId}-inactive`);
        fireEvent.change(inactiveTrueInput, { target: { value: true } });
        expect(inactiveTrueInput.value).toBe('true');

        const inactiveFalseInput = screen.getByTestId(`${testId}-inactive`);
        fireEvent.change(inactiveFalseInput, { target: { value: false } });
        expect(inactiveFalseInput.value).toBe('false');

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Max length 30 characters/)).toBeInTheDocument();
            expect(screen.getByText(/Max length 50 characters/)).toBeInTheDocument();

        });
    });

});