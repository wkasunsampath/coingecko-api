import { render, screen } from "@testing-library/react";
import BaseLayout from "../components/BaseLayout";
import "@testing-library/jest-dom";
import MockContext from "./__data__/context.mock";

test("renders BaseLayout global data correctly", () => {
  render(
    <MockContext>
      <BaseLayout />
    </MockContext>
  );
  expect(screen.getAllByText("Dominance:")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Coins:")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Ongoing ICOs:")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Exchanges:")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Upcoming ICOs:")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Market Cap:")[0]).toBeInTheDocument();
});
