import { describe, it, expect, vi } from 'vitest';

vi.mock('@/server', () => ({
  resolveBlobUrl: (path: string | null | undefined) => path ?? null,
}));
import { render, screen } from '@testing-library/react';
import WritingBody from './WritingBody';

describe('WritingBody', () => {
  it('renders nothing for null body', () => {
    const { container } = render(<WritingBody body={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing for undefined body', () => {
    const { container } = render(<WritingBody body={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing for empty string body', () => {
    const { container } = render(<WritingBody body="" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders paragraph text', () => {
    render(<WritingBody body="Hello world paragraph." />);
    expect(screen.getByText('Hello world paragraph.')).toBeInTheDocument();
  });

  it('renders h1 as MUI Typography h4 variant', () => {
    render(<WritingBody body="# Big Heading" />);
    const heading = screen.getByText('Big Heading');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  it('renders h2 as MUI Typography h5 variant', () => {
    render(<WritingBody body="## Sub Heading" />);
    const heading = screen.getByText('Sub Heading');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H3');
  });

  it('renders links as anchor elements', () => {
    render(<WritingBody body="[Click here](https://example.com)" />);
    const link = screen.getByRole('link', { name: 'Click here' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
