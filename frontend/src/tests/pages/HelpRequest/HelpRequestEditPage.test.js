import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

import mockConsole from "jest-mock-console";
import HelpRequestEditPage from "main/pages/HelpRequest/HelpRequestEditPage";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      id: 17,
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("HelpRequestEditPage tests", () => {
  describe("when the backend doesn't return data", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/helprequests", { params: { id: 17 } }).timeout();
    });

    const queryClient = new QueryClient();
    test("renders header but table is not present", async () => {
      const restoreConsole = mockConsole();

      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>
      );
      await screen.findByText("Edit Help Request");
      expect(
        screen.queryByTestId("HelpRequestForm-requesterEmail")
      ).not.toBeInTheDocument();
      restoreConsole();
    });
  });
  describe("tests where backend is working normally", () => {
    const axiosMock = new AxiosMockAdapter(axios);

    beforeEach(() => {
      axiosMock.reset();
      axiosMock.resetHistory();
      axiosMock
        .onGet("/api/currentUser")
        .reply(200, apiCurrentUserFixtures.userOnly);
      axiosMock
        .onGet("/api/systemInfo")
        .reply(200, systemInfoFixtures.showingNeither);
      axiosMock.onGet("/api/helprequests", { params: { id: 17 } }).reply(200, {
        id: 17,
        requesterEmail: "cgaucho@ucsb.edu",
        teamId: "s22-5pm-3",
        tableOrBreakoutRoom: "7",
        requestTime: "2022-04-20T17:35",
        explanation: "Need help with Swagger-ui",
        solved: false,
      });
      axiosMock.onPut("/api/helprequests").reply(200, {
        id: "17",
        requesterEmail: "ldelplaya@ucsb.edu",
        teamId: "s22-6pm-3",
        tableOrBreakoutRoom: "11",
        requestTime: "2022-04-20T18:31",
        explanation: "Dokku problems",
        solved: "false",
      });
    });

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });

    test("Is populated with the data provided", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      await screen.findByTestId("HelpRequestForm-requesterEmail");

      const requesterEmailField = screen.getByTestId(
        "HelpRequestForm-requesterEmail"
      );
      const requestTimeField = screen.getByTestId(
        "HelpRequestForm-requestTime"
      );
      const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
      const tableOrBreakoutRoomField = screen.getByTestId(
        "HelpRequestForm-tableOrBreakoutRoom"
      );
      const explanationField = screen.getByTestId(
        "HelpRequestForm-explanation"
      );
      const solvedField = screen.getByTestId("HelpRequestForm-solved");
      const submitButton = screen.getByTestId("HelpRequestForm-submit");

      expect(requesterEmailField).toHaveValue("cgaucho@ucsb.edu");
      expect(teamIdField).toHaveValue("s22-5pm-3");
      expect(tableOrBreakoutRoomField).toHaveValue("7");
      expect(requestTimeField).toHaveValue("2022-04-20T17:35");
      expect(explanationField).toHaveValue("Need help with Swagger-ui");
      expect(solvedField.value).toBe("on");
      expect(submitButton).toBeInTheDocument();
    });

    test("Changes when you click Update", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <HelpRequestEditPage />
          </MemoryRouter>
        </QueryClientProvider>
      );

      await screen.findByTestId("HelpRequestForm-requesterEmail");

      const requesterEmailField = screen.getByTestId(
        "HelpRequestForm-requesterEmail"
      );
      const requestTimeField = screen.getByTestId(
        "HelpRequestForm-requestTime"
      );
      const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
      const tableOrBreakoutRoomField = screen.getByTestId(
        "HelpRequestForm-tableOrBreakoutRoom"
      );
      const explanationField = screen.getByTestId(
        "HelpRequestForm-explanation"
      );
      const solvedField = screen.getByTestId("HelpRequestForm-solved");
      const submitButton = screen.getByTestId("HelpRequestForm-submit");

      expect(requesterEmailField).toHaveValue("cgaucho@ucsb.edu");
      expect(teamIdField).toHaveValue("s22-5pm-3");
      expect(tableOrBreakoutRoomField).toHaveValue("7");
      expect(requestTimeField).toHaveValue("2022-04-20T17:35");
      expect(explanationField).toHaveValue("Need help with Swagger-ui");
      expect(solvedField.value).toBe("on");
      expect(submitButton).toBeInTheDocument();

      fireEvent.change(requesterEmailField, {
        target: { value: "cgaucho@ucsb.edu" },
      });
      fireEvent.change(teamIdField, { target: { value: "s24-5pm-3" } });
      fireEvent.change(tableOrBreakoutRoomField, {
        target: { value: "7" },
      });
      fireEvent.change(requestTimeField, {
        target: { value: "2022-04-20T17:35" },
      });
      fireEvent.change(explanationField, {
        target: { value: "Need help with Swagger-ui" },
      });
      fireEvent.click(solvedField, {
        target: { value: true },
      });
      fireEvent.click(submitButton);

      await waitFor(() => expect(mockToast).toBeCalled());
      expect(mockToast).toBeCalledWith(
        "Help Request Updated - id: 17 requesterEmail: ldelplaya@ucsb.edu"
      );
      expect(mockNavigate).toBeCalledWith({ to: "/helprequests" });

      expect(axiosMock.history.put.length).toBe(1); // times called
      expect(axiosMock.history.put[0].params).toEqual({ id: 17 });
      expect(axiosMock.history.put[0].data).toBe(
        JSON.stringify({
          requesterEmail: "cgaucho@ucsb.edu",
          teamId: "s24-5pm-3",
          tableOrBreakoutRoom: "7",
          requestTime: "2022-04-20T17:35",
          explanation: "Need help with Swagger-ui",
          solved: "true",
        })
      ); // posted object
    });
  });
});
