
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { WorkshopRegistrationForm } from '../WorkshopRegistrationForm';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the hook so we can test the form behavior in isolation
const mockRegisterForWorkshop = vi.fn();
vi.mock('../../hooks/useRegisterWorkshop', () => ({
  useRegisterWorkshop: () => ({
    status: 'idle',
    error: null,
    registerForWorkshop: mockRegisterForWorkshop,
    resetRegistration: vi.fn(),
  }),
}));

const mockWorkshop = {
  id: "w1",
  title: "Test Workshop",
  date: new Date("2026-10-15"),
  time: "6:00 PM | 90 Min",
  track: "Test Track",
  duration: "90 Min",
  level: "All Levels",
  isActive: true,
  facilitator: {
    name: "Jane Doe",
    role: "Instructor",
    bio: "Test bio",
  },
  description: "Test description",
  price: 0,
  capacity: 50,
  syllabus: [],
  takeaways: [],
};

describe('WorkshopRegistrationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<WorkshopRegistrationForm workshop={mockWorkshop} />);
    expect(screen.getByText(/Secure Your Seat/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address \*/i)).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty required fields', async () => {
    render(<WorkshopRegistrationForm workshop={mockWorkshop} />);
    
    const submitBtn = screen.getByRole('button', { name: /Complete Registration/i });
    fireEvent.click(submitBtn);

    // React Hook Form resolves validation asynchronously
    await waitFor(() => {
      expect(screen.getByText(/First name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    });

    expect(mockRegisterForWorkshop).not.toHaveBeenCalled();
  });

  it('silently aborts when the honeypot field is filled', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    render(<WorkshopRegistrationForm workshop={mockWorkshop} />);
    
    // Fill out valid data
    fireEvent.change(screen.getByLabelText(/First Name \*/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name \*/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Email Address \*/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/Organization \/ School \*/i), { target: { value: 'Acme Corp' } });
    fireEvent.change(screen.getByLabelText(/Job Title \/ Role \*/i), { target: { value: 'Engineer' } });

    // Fill out the honeypot field
    const honeypot = screen.getByLabelText(/Leave this field blank/i);
    fireEvent.change(honeypot, { target: { value: 'I am a bot' } });

    const submitBtn = screen.getByRole('button', { name: /Complete Registration/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith("Bot detected: honeypot field was filled.");
    });

    expect(mockRegisterForWorkshop).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
});
