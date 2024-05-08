import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import UCSBDateForm from "main/components/UCSBDates/UCSBDateForm";
import { ucsbDatesFixtures } from "fixtures/ucsbDatesFixtures";
import { BrowserRouter as Router } from "react-router-dom";
import HelpRequestForm from "main/components/HelpRequest/HelpRequestForm";
import { helpRequestFixtures } from "fixtures/helpRequestFixtures";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("HelpRequest tests", () => {
  test("renders correctly", async () => {
    render(
      <Router>
        <HelpRequestForm />
      </Router>
    );
    await screen.findByText(/Requester Email/);
    await screen.findByText(/Request Time/);
    await screen.findByText(/Team ID/);
    await screen.findByText(/Table or Breakout Room/);
    await screen.findByText(/Explanation/);
    await screen.findByText(/Solved/);
    await screen.findByText(/Create/);
  });

  test("renders correctly when passing in a HelpRequest", async () => {
    render(
      <Router>
        <HelpRequestForm initialContents={helpRequestFixtures.oneHelpRequest} />
      </Router>
    );
    await screen.findByTestId(/HelpRequestForm-id/);
    expect(screen.getByText(/Id/)).toBeInTheDocument();
    expect(screen.getByTestId(/HelpRequestForm-id/)).toHaveValue("1");
  });

  test("Correct Error messsages on bad input", async () => {
    render(
      <Router>
        <HelpRequestForm />
      </Router>
    );
    await screen.findByTestId("HelpRequestForm-requesterEmail");
    const requesterEmailField = screen.getByTestId(
      "HelpRequestForm-requesterEmail"
    );
    const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
    const tableOrBreakoutRoomField = screen.getByTestId(
      "HelpRequestForm-tableOrBreakoutRoom"
    );
    const submitButton = screen.getByTestId("HelpRequestForm-submit");

    fireEvent.change(requestTimeField, { target: { value: "bad-input" } });
    fireEvent.change(requesterEmailField, { target: { value: "bad-input" } });
    fireEvent.click(submitButton);
    await screen.findByText(
      /Requester Email must be in the format email@address.ending, e.g. cgaucho@ucsb.edu or pconrad@gmail.com/
    );
  });
});

test("Correct Error messsages on missing input", async () => {
  render(
    <Router>
      <HelpRequestForm />
    </Router>
  );
  await screen.findByTestId("HelpRequestForm-submit");
  const submitButton = screen.getByTestId("HelpRequestForm-submit");

  fireEvent.click(submitButton);

  await screen.findByText(/Requester Email is required./);
  expect(screen.getByText(/Request Time is required./)).toBeInTheDocument();
  expect(screen.getByText(/TeamId is required./)).toBeInTheDocument();
  expect(
    screen.getByText(/Table or Breakout Room is required./)
  ).toBeInTheDocument();
  expect(screen.getByText(/Explanation is required./)).toBeInTheDocument();
  expect(screen.getByText(/Solved is required./)).toBeInTheDocument();
});

test("No Error messsages on good input", async () => {
  const mockSubmitAction = jest.fn();

  render(
    <Router>
      <HelpRequestForm submitAction={mockSubmitAction} />
    </Router>
  );
  await screen.findByTestId("HelpRequestForm-requesterEmail");

  const requesterEmailField = screen.getByTestId(
    "HelpRequestForm-requesterEmail"
  );
  const requestTimeField = screen.getByTestId("HelpRequestForm-requestTime");
  const teamIdField = screen.getByTestId("HelpRequestForm-teamId");
  const tableOrBreakoutRoomField = screen.getByTestId(
    "HelpRequestForm-tableOrBreakoutRoom"
  );
  const explanationField = screen.getByTestId("HelpRequestForm-explanation");
  const solvedField = screen.getByTestId("HelpRequestForm-solved");
  const submitButton = screen.getByTestId("HelpRequestForm-submit");

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

  await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

  expect(
    screen.queryByText(
      /Requester Email must be in the format email@address.ending, e.g. cgaucho@ucsb.edu or pconrad@gmail.com/
    )
  ).not.toBeInTheDocument();
});

test("that navigate(-1) is called when Cancel is clicked", async () => {
  render(
    <Router>
      <HelpRequestForm />
    </Router>
  );
  await screen.findByTestId("HelpRequestForm-cancel");
  const cancelButton = screen.getByTestId("HelpRequestForm-cancel");

  fireEvent.click(cancelButton);

  await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
});
