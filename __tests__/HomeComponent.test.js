import { render, screen } from "@testing-library/react";
import HomeComponent from "../pages/index";
import "@testing-library/jest-dom";
import MockContext from "./__data__/context.mock";

test("renders HomeComponent correctly", () => {
  render(
    <MockContext>
      <HomeComponent />
    </MockContext>
  );
  expect(screen.getByText("Hello, Cryptoholics!")).toBeInTheDocument();
  expect(screen.getByText("Cryptocurrency Prices by Market Cap")).toBeInTheDocument();
});
