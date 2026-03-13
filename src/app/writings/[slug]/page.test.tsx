import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

const { mockGetWritingBySlug, mockMapApiError, mockNotFound } = vi.hoisted(() => ({
  mockGetWritingBySlug: vi.fn(),
  mockMapApiError: vi.fn(),
  mockNotFound: vi.fn(),
}));

vi.mock('@/server', () => ({
  writingsApi: {
    getWritingBySlug: mockGetWritingBySlug,
  },
  mapApiError: mockMapApiError,
}));

vi.mock('next/navigation', () => ({
  notFound: mockNotFound,
}));

// WritingBody renders markdown — mock to avoid react-markdown ESM issues in tests
vi.mock('@/components/WritingBody', () => ({
  default: ({ body }: { body: string | null | undefined }) =>
    body ? <div data-testid="writing-body">{body}</div> : null,
}));

import WritingDetailPage from './page';

const mockWriting = {
  id: 'w-1',
  slug: 'hello-world',
  title: 'Hello World',
  blurb: 'My first post.',
  created: '2025-01-15T00:00:00Z',
  body: '# Introduction\n\nThis is the body.',
  tags: ['intro', 'test'],
  comments: [
    { author: 'Alice', body: 'Great post!', created: '2025-01-16T00:00:00Z' },
    { author: null, body: 'Nice.', created: '2025-01-17T00:00:00Z' },
  ],
};

describe('WritingDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNotFound.mockImplementation(() => {
      throw new Error('NEXT_NOT_FOUND');
    });
  });

  it('renders all writing fields: title, date, blurb, tags, body, comments', async () => {
    mockGetWritingBySlug.mockResolvedValue({ data: mockWriting });

    const jsx = await WritingDetailPage({ params: Promise.resolve({ slug: 'hello-world' }) });
    render(jsx);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByText('January 15, 2025')).toBeInTheDocument();
    expect(screen.getByText('My first post.')).toBeInTheDocument();
    expect(screen.getByTestId('writing-body')).toBeInTheDocument();

    expect(screen.getByText('intro')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();

    const introChip = screen.getByText('intro').closest('a');
    expect(introChip).toHaveAttribute('href', '/tags/intro');

    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Great post!')).toBeInTheDocument();
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
    expect(screen.getByText('Nice.')).toBeInTheDocument();
  });

  it('calls notFound() when API returns 404', async () => {
    const error = new Error('Not found');
    mockGetWritingBySlug.mockRejectedValue(error);
    mockMapApiError.mockReturnValue({ status: 404, body: { message: 'Not found' } });

    await expect(
      WritingDetailPage({ params: Promise.resolve({ slug: 'missing' }) }),
    ).rejects.toThrow('NEXT_NOT_FOUND');

    expect(mockNotFound).toHaveBeenCalled();
  });

  it('renders gracefully with empty tags and empty comments arrays', async () => {
    mockGetWritingBySlug.mockResolvedValue({
      data: { ...mockWriting, tags: [], comments: [] },
    });

    const jsx = await WritingDetailPage({ params: Promise.resolve({ slug: 'hello-world' }) });
    render(jsx);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.queryByText('Comments')).not.toBeInTheDocument();
    expect(screen.queryByText('intro')).not.toBeInTheDocument();
  });
});
