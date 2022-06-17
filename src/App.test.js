// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('render', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/hello/i);
//   expect(linkElement).toBeInTheDocument();
// });



import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  it("renders header", () => {
    const { getByText } = render(<App/>);
    const header = getByText("hello");
    expect(header).toBeInTheDocument();
  });
});

