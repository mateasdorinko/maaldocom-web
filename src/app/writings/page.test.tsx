import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const { mockListWritings } = vi.hoisted(() => ({
  mockListWritings: vi.fn(),
}));

vi.mock('@/server', () => ({
  writingsApi: {
    listWritings: mockListWritings,
  },
}));

import WritingsPage from './page';

const mockWritings = [
  {
    id: 'w-1',
    slug: 'hello-world',
    title: 'Hello World',
    blurb: 'My first post.',
    // Use noon UTC to avoid timezone-boundary date shifts in tests
    created: '2025-01-15T12:00:00Z',
    tags: ['intro'],
  },
  {
    id: 'w-2',
    slug: 'second-post',
    title: 'Second Post',
    blurb: 'Another article.',
    created: '2025-03-01T12:00:00Z',
    tags: [],
  },
];

describe('WritingsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and writing list with correct fields', async () => {
    mockListWritings.mockResolvedValue({ data: mockWritings });

    const jsx = await WritingsPage();
    render(jsx);

    expect(screen.getByText('Writings')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('My first post.')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Another article.')).toBeInTheDocument();
  });

  it('each writing title links to the correct /writings/{slug} path', async () => {
    mockListWritings.mockResolvedValue({ data: mockWritings });

    const jsx = await WritingsPage();
    render(jsx);

    const link1 = screen.getByRole('link', { name: 'Hello World' });
    expect(link1).toHaveAttribute('href', '/writings/hello-world');

    const link2 = screen.getByRole('link', { name: 'Second Post' });
    expect(link2).toHaveAttribute('href', '/writings/second-post');
  });

  it('renders formatted dates', async () => {
    mockListWritings.mockResolvedValue({ data: mockWritings });

    const jsx = await WritingsPage();
    render(jsx);

    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
  });

  it('renders empty state message when API returns empty array', async () => {
    mockListWritings.mockResolvedValue({ data: [] });

    const jsx = await WritingsPage();
    render(jsx);

    expect(screen.getByText('No writings yet.')).toBeInTheDocument();
  });

  it('renders empty state when API throws', async () => {
    mockListWritings.mockRejectedValue(new Error('Network error'));

    const jsx = await WritingsPage();
    render(jsx);

    expect(screen.getByText('No writings yet.')).toBeInTheDocument();
  });
});
