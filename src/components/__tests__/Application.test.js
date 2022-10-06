import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getAllByTestId,
  prettyDOM,
  getByText,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText,
  getByTestId
} from "@testing-library/react";
import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. check that confirmation message is shown
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 7. Check that the element with the text "deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // 8. wait until the element with the "add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 9. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });


  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // We want to start by finding an existing interview.
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // // With the existing interview we want to find the edit button.
    fireEvent.click(queryByAltText(appointment, "Edit"));
    expect(getByTestId(appointment, "student-name-input")).toBeInTheDocument();


    // // We change the name and save the interview.
    fireEvent.change(getByTestId(appointment, "student-name-input"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));


    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // We don't want the spots to change for "Monday", since this is an edit.
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });
});
