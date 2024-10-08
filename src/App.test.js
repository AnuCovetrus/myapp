import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import LoginPage from "./components/login/LoginPage";
import AboutUs from "./components/aboutUs/AboutUs";
import Pagination from "./components/pagination/Pagination";
import SearchBar from "./components/searchBar/SearchBar";

const mockUserData = [
  {
    id: "1",
    name: "Aaron Miles",
    email: "aaron@mailinator.com",
    role: "member",
  },
  {
    id: "2",
    name: "Aishwarya Naik",
    email: "aishwarya@mailinator.com",
    role: "member",
  },
  {
    id: "3",
    name: "Arvind Kumar",
    email: "arvind@mailinator.com",
    role: "admin",
  },
  {
    id: "4",
    name: "Caterina Binotto",
    email: "caterina@mailinator.com",
    role: "member",
  },
  {
    id: "5",
    name: "Chetan Kumar",
    email: "chetan@mailinator.com",
    role: "member",
  },
  { id: "6", name: "Jim McClain", email: "jim@mailinator.com", role: "member" },
  {
    id: "7",
    name: "Mahaveer Singh",
    email: "mahaveer@mailinator.com",
    role: "member",
  },
  { id: "8", name: "Rahul Jain", email: "rahul@mailinator.com", role: "admin" },
  {
    id: "9",
    name: "Rizan Khan",
    email: "rizan@mailinator.com",
    role: "member",
  },
  {
    id: "10",
    name: "Sarah Potter",
    email: "sarah@mailinator.com",
    role: "admin",
  },
  {
    id: "11",
    name: "Keshav Muddaiah",
    email: "keshav@mailinator.com",
    role: "member",
  },
];

// Tests for App component
describe("App Component", () => {
  test("Renders App without crashing", () => {
    render(<App />);
  });

  test("Error Handling - API call failure", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Failed to fetch")));

    render(<App />);

    await waitFor(() => {
      const loadingText = document.body.textContent;
      expect(loadingText).toContain("Loading...");
    });

    await waitFor(() => {
      const errorText = document.body.textContent;
      expect(errorText).toContain("Something went wrong");
    });

    global.fetch.mockRestore();
  });
});

// Tests for LoginPage component
describe("LoginPage Component", () => {
  test("Renders LoginPage without crashing", () => {
    render(<LoginPage />);
  });
});


// Tests for AboutUs component
describe("AboutUs Component", () => {
  test("Renders AboutUs without crashing", () => {
    render(<AboutUs />);
  });
});

// Tests for DeleteSelectedButton component
// describe("DeleteSelectedButton Component", () => {
//   test("Renders DeleteSelectedButton without crashing", () => {
//     const selectedRows = []; // Mocking selectedRows

//     const handleDeleteSelected = jest.fn();

//     render(
//       <DeleteSelectedButton
//         selectedRows={selectedRows}
//         handleDeleteSelected={handleDeleteSelected}
//       />
//     );
//   });

//   test("Button is disabled when no items are selected", () => {
//     const handleDeleteSelected = jest.fn();
//     const selectedRows = [];
//     const { getByText } = render(
//       <DeleteSelectedButton
//         handleDeleteSelected={handleDeleteSelected}
//         selectedRows={selectedRows}
//       />
//     );
//     const deleteButton = getByText("Delete Selected");
//     fireEvent.click(deleteButton);
//     expect(handleDeleteSelected).not.toHaveBeenCalled();
//   });

//   test("Button is enabled when items are selected", () => {
//     const handleDeleteSelected = jest.fn();
//     const selectedRows = [
//       { id: 1, name: "Anu" },
//       { id: 2, name: "Gupta" },
//     ]; // Assuming two items are selected
//     const { getByText } = render(
//       <DeleteSelectedButton
//         handleDeleteSelected={handleDeleteSelected}
//         selectedRows={selectedRows}
//       />
//     );
//     const deleteButton = getByText("Delete Selected");
//     fireEvent.click(deleteButton);
//     expect(handleDeleteSelected).toHaveBeenCalled();
//   });

//   test("Triggers handleDeleteSelected when the button is clicked", () => {
//     const handleDeleteSelected = jest.fn();
//     const { getByText } = render(
//       <DeleteSelectedButton
//         handleDeleteSelected={handleDeleteSelected}
//         selectedRows={[{}, {}]} // Mocking selected items
//       />
//     );
//     const deleteButton = getByText("Delete Selected");
//     fireEvent.click(deleteButton);
//     expect(handleDeleteSelected).toHaveBeenCalledTimes(1);
//   });
// });

// Tests for Pagination component
describe("Pagination Component", () => {
  test("Renders Pagination without crashing", () => {
    render(<Pagination />);
  });

  const rowsPerPage = 10; // Set the number of rows per page
  const totalRows = 50; // Set the total number of rows

  test('Validate next page number on clicking ">"', () => {
    let currentPage = 4; // Set the initial current page to 4 for testing purposes
    const paginate = jest.fn((newPage) => {
      currentPage = newPage;
    });

    render(
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        paginate={paginate}
        currentPage={currentPage}
      />
    );

    // Click the ">" button
    fireEvent.click(screen.getByText(">"));

    expect(paginate).toHaveBeenCalledTimes(1); // Ensure the paginate function was called
    expect(currentPage).toBe(5); // Ensure the current page is updated to the next page
  });

  test('Validate page change on clicking "<"', () => {
    let currentPage = 4; // Set the initial current page to 4 for testing purposes
    const paginate = jest.fn((newPage) => {
      currentPage = newPage;
    });

    render(
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        paginate={paginate}
        currentPage={currentPage}
      />
    );

    // Click the "<" button
    fireEvent.click(screen.getByText("<"));

    expect(paginate).toHaveBeenCalledTimes(1); // Ensure the paginate function was called
    expect(currentPage).toBe(3); // Ensure the current page is updated to the previous page
  });

  test("Validate page change on clicking page number", () => {
    let currentPage = 1;
    const paginate = jest.fn((newPage) => {
      currentPage = newPage;
    });

    render(
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        paginate={paginate}
        currentPage={currentPage}
      />
    );

    // Click the third page number button
    fireEvent.click(screen.getByText("3"));

    expect(paginate).toHaveBeenCalledTimes(1); // Ensure the paginate function was called
    expect(currentPage).toBe(3); // Ensure the current page is updated to the clicked page number
  });

  test('Validate first page number on clicking "<<"', () => {
    let currentPage = 3; // Set the initial current page to 3 for testing purposes
    const paginate = jest.fn((newPage) => {
      currentPage = newPage;
    });

    render(
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        paginate={paginate}
        currentPage={currentPage}
      />
    );

    // Click the "<<" button
    fireEvent.click(screen.getByText("<<"));

    expect(paginate).toHaveBeenCalledTimes(1); // Ensure the paginate function was called
    expect(currentPage).toBe(1); // Ensure the current page is updated to the first page
  });

  test('Validate last page number on clicking ">>"', () => {
    let currentPage = 1;
    const paginate = jest.fn((newPage) => {
      currentPage = newPage;
    });

    render(
      <Pagination
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        paginate={paginate}
        currentPage={currentPage}
      />
    );

    // Click the ">>" button
    fireEvent.click(screen.getByText(">>"));

    expect(paginate).toHaveBeenCalledTimes(1); // Ensure the paginate function was called
    expect(currentPage).toBe(5); // Ensure the current page is updated to the last page
  });
});

// Tests for SearchBar component
describe("SearchBar Component", () => {
  test("Renders SearchBar without crashing", () => {
    render(<SearchBar />);
  });

  test("Test inputting different queries into the search bar", () => {
    const handleSearchQuery = jest.fn(); // Create a mock function for handling the search query

    render(<SearchBar searchQuery="" handleSearchQuery={handleSearchQuery} />); // Render the SearchBar component

    const searchInput = screen.getByPlaceholderText(
      "Search by name, email, role..."
    ); // Find the search input field

    // Simulate typing different queries into the search bar
    fireEvent.change(searchInput, { target: { value: "Anu" } });
    expect(searchInput.value).toBe("Anu");
    expect(handleSearchQuery).toHaveBeenCalledWith("Anu"); // Verify the search query handler is called

    fireEvent.change(searchInput, { target: { value: "India" } });
    expect(searchInput.value).toBe("India");
    expect(handleSearchQuery).toHaveBeenCalledWith("India");

    fireEvent.change(searchInput, { target: { value: "" } }); // Clear the search input
    expect(searchInput.value).toBe("");
    expect(handleSearchQuery).toHaveBeenCalledWith(""); // Verify the search query handler is called for an empty string
  });
});

// Tests For Search Functionality
describe("Search Functionality", () => {
  test("search updates the table data", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUserData),
      })
    );

    render(<App />);

    // Simulate typing into the search input field
    const searchInput = screen.getByPlaceholderText(
      "Search by name, email, role..."
    );
    fireEvent.change(searchInput, { target: { value: "Aaron" } }); // Example search query

    // Wait for the table to update based on the search query
    await waitFor(() => {
      const resultText = document.body.textContent;
      expect(resultText).toContain("Aaron");
    });

    global.fetch.mockRestore(); // Reset the mock fetch state
  });
});

// Tests for selection and Edit row
 

  test("Clicking the edit button opens the edit mode", () => {
    const user = {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      role: "Editor",
    };

    const setShouldShowEditModal = jest.fn();

    expect(setShouldShowEditModal).toHaveBeenCalledWith({
      isModalOpen: true,
      user,
    });
  }); 

// Tests for Delete row
describe("Selection and Delete Behavior", () => {
  test("Triggers handleDeleteRow when delete button is clicked", () => {
    const handleDeleteRow = jest.fn();
    const user = {
      id: 1,
      name: "Anu",
      email: "anu@example.com",
      role: "Admin",
    };
  
    expect(handleDeleteRow).toHaveBeenCalledWith(user);
  });
});
