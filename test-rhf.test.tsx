import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { useForm } from 'react-hook-form';

const TestForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { registrationType: "workshop" }
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("registrationType")} value="workshop" />
      <button type="submit">Submit</button>
    </form>
  );
};

test('rhf form submit', async () => {
  const onSubmit = vitest.fn();
  render(<TestForm onSubmit={onSubmit} />);
  fireEvent.click(screen.getByText('Submit'));
  await waitFor(() => {
    console.log(onSubmit.mock.calls[0][0]);
  });
});
