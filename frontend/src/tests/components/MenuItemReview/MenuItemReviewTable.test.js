import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import { menuItemReviewFixtures } from "fixtures/menuItemReviewFixtures";
import MenuItemReviewTable from "main/components/MenuItemReview/MenuItemReviewTable"
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import { currentUserFixtures } from "fixtures/currentUserFixtures";


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));

describe("UserTable tests", () => {
  const queryClient = new QueryClient();

  test("Has the expected column headers and content for ordinary user", () => {

    const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewTable reviews={menuItemReviewFixtures.threeReviews} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "ItemId", "ReviewerEmail", "Stars", "DateReviewed", "Comments"];
    const expectedFields = ["id", "itemId", "reviewerEmail", "stars", "dateReviewed", "comments"];
    const testId = "MenuItemReviewTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-reviewerEmail`)).toHaveTextContent("cgaucho@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent("5");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-dateReviewed`)).toHaveTextContent("2022-01-03T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-comments`)).toHaveTextContent("Delicious.");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-reviewerEmail`)).toHaveTextContent("ldelplaya@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent("0");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-dateReviewed`)).toHaveTextContent("2022-03-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-comments`)).toHaveTextContent("I hate the pie.");

    expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-itemId`)).toHaveTextContent("4");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-reviewerEmail`)).toHaveTextContent("person@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-stars`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-dateReviewed`)).toHaveTextContent("2022-01-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-comments`)).toHaveTextContent("Meh. Just average.");

    const editButton = screen.queryByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).not.toBeInTheDocument();

    const deleteButton = screen.queryByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).not.toBeInTheDocument();

  });

  test("Has the expected colum headers and content for adminUser", () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewTable reviews={menuItemReviewFixtures.threeReviews} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    const expectedHeaders = ["id", "ItemId", "ReviewerEmail", "Stars", "DateReviewed", "Comments"];
    const expectedFields = ["id", "itemId", "reviewerEmail", "stars", "dateReviewed", "comments"];
    const testId = "MenuItemReviewTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    expect(screen.getByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-reviewerEmail`)).toHaveTextContent("cgaucho@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent("5");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-dateReviewed`)).toHaveTextContent("2022-01-03T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-comments`)).toHaveTextContent("Delicious.");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-reviewerEmail`)).toHaveTextContent("ldelplaya@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent("0");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-dateReviewed`)).toHaveTextContent("2022-03-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-comments`)).toHaveTextContent("I hate the pie.");

    expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-itemId`)).toHaveTextContent("4");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-reviewerEmail`)).toHaveTextContent("person@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-stars`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-dateReviewed`)).toHaveTextContent("2022-01-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-comments`)).toHaveTextContent("Meh. Just average.");

    const editButton = screen.getByTestId(`${testId}-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    expect(editButton).toHaveClass("btn-primary");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass("btn-danger");

  });

  test("Edit button navigates to the edit page for admin user", async () => {

    const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewTable reviews={menuItemReviewFixtures.threeReviews} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>

    );

    await waitFor(() => { expect(screen.getByTestId(`MenuItemReviewTable-cell-row-0-col-id`)).toHaveTextContent("1"); });

    const editButton = screen.getByTestId(`MenuItemReviewTable-cell-row-0-col-Edit-button`);
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);

    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith('/menuitemreview/edit/1'));

  });

  test("Delete button calls delete callback", async () => {
    // arrange
    const currentUser = currentUserFixtures.adminUser;

    // act - render the component
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <MenuItemReviewTable reviews={menuItemReviewFixtures.threeReviews} currentUser={currentUser} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const testId = "MenuItemReviewTable";

    // assert - check that the expected content is rendered
    expect(await screen.findByTestId(`${testId}-cell-row-0-col-id`)).toHaveTextContent("1");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-reviewerEmail`)).toHaveTextContent("cgaucho@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-stars`)).toHaveTextContent("5");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-dateReviewed`)).toHaveTextContent("2022-01-03T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-0-col-comments`)).toHaveTextContent("Delicious.");

    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent("2");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-itemId`)).toHaveTextContent("7");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-reviewerEmail`)).toHaveTextContent("ldelplaya@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-stars`)).toHaveTextContent("0");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-dateReviewed`)).toHaveTextContent("2022-03-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-comments`)).toHaveTextContent("I hate the pie.");

    expect(screen.getByTestId(`${testId}-cell-row-2-col-id`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-itemId`)).toHaveTextContent("4");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-reviewerEmail`)).toHaveTextContent("person@ucsb.edu");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-stars`)).toHaveTextContent("3");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-dateReviewed`)).toHaveTextContent("2022-01-11T00:00:00");
    expect(screen.getByTestId(`${testId}-cell-row-2-col-comments`)).toHaveTextContent("Meh. Just average.");

    const deleteButton = screen.getByTestId(`${testId}-cell-row-0-col-Delete-button`);
    expect(deleteButton).toBeInTheDocument();

    // act - click the delete button
    fireEvent.click(deleteButton);
  });

});

