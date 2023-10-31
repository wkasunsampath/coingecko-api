import { render, screen, act } from "@testing-library/react";
import CryptoSearch from "../components/CryptoSearch";
import "@testing-library/jest-dom";
import MockContextWithoutBaseUI from "./__data__/constextWithoutBaseUi.mock";

test("renders CryptoSearch correctly", async () => {
  render(
    <MockContextWithoutBaseUI>
      <CryptoSearch />
    </MockContextWithoutBaseUI>
  );
  let input = screen.getByTestId("text-field");
  expect(input).not.toHaveFocus();
});

test("renders focus event on CryptoSearch correctly", async () => {
  render(
    <MockContextWithoutBaseUI>
      <CryptoSearch />
    </MockContextWithoutBaseUI>
  );
  let input = screen.getByTestId("text-field");
  await act(async () => input.focus());
  expect(input).toHaveFocus();
  expect(screen.getByText("Trending coins:")).toBeInTheDocument();
});
