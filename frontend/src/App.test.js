import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('Weather Dashboard', () => {
  test('renders input field and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('does not fetch weather if input is empty', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));

    // Since no weather is shown and no error either, we check that weather UI does not exist
    const weatherCard = screen.queryByText(/feels like/i);
    expect(weatherCard).not.toBeInTheDocument();
  });

  test('shows error if fetch fails (invalid city)', async () => {
    // Mock fetch to simulate failed API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({})
      })
    );

    render(<App />);
    const input = screen.getByPlaceholderText('Enter city name...');
    fireEvent.change(input, { target: { value: 'InvalidCity' } });
    fireEvent.click(screen.getByRole('button'));

    const errorMessage = await screen.findByText(/Failed to fetch weather data/i);
    expect(errorMessage).toBeInTheDocument();

    // Clean up fetch mock after this test
    global.fetch.mockClear();
    delete global.fetch;
  });
});

