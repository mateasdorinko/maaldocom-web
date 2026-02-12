import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MediaAlbumViewer from './MediaAlbumViewer';
import type { GetMediaResponse } from '@/types/api';

// history.replaceState is called on open/close/navigate — stub it out.
beforeEach(() => {
  vi.spyOn(window.history, 'replaceState').mockImplementation(() => {});
});

const mockMedia: GetMediaResponse[] = [
  {
    id: 'media-1',
    fileName: 'photo1.jpg',
    contentType: 'image',
    thumbHref: 'https://api.example.com/thumb/1',
    viewerHref: 'https://api.example.com/view/1',
    href: 'https://api.example.com/dl/1',
  },
  {
    id: 'media-2',
    fileName: 'photo2.jpg',
    contentType: 'image',
    thumbHref: 'https://api.example.com/thumb/2',
    viewerHref: 'https://api.example.com/view/2',
    href: 'https://api.example.com/dl/2',
  },
  {
    id: 'media-3',
    fileName: 'video1.mp4',
    contentType: 'video',
    thumbHref: 'https://api.example.com/thumb/3',
    viewerHref: 'https://api.example.com/view/3',
    href: 'https://api.example.com/dl/3',
  },
];

describe('MediaAlbumViewer', () => {
  it('renders a thumbnail button for every media item', () => {
    render(<MediaAlbumViewer media={mockMedia} albumUrlFriendlyName="album" />);

    for (const item of mockMedia) {
      expect(screen.getByLabelText(`View ${item.fileName}`)).toBeInTheDocument();
    }
  });

  it('shows "No media" message when the array is empty', () => {
    render(<MediaAlbumViewer media={[]} albumUrlFriendlyName="album" />);
    expect(screen.getByText('No media in this album.')).toBeInTheDocument();
  });

  // ── Wraparound ─────────────────────────────────────────────────────
  it('wraps from first item to last when clicking previous', async () => {
    render(<MediaAlbumViewer media={mockMedia} albumUrlFriendlyName="album" />);

    // Open carousel on the first thumbnail
    fireEvent.click(screen.getByLabelText('View photo1.jpg'));

    // Carousel is open — counter shows "1 / 3"
    expect(await screen.findByText('1 / 3')).toBeInTheDocument();

    // Click "Previous media" → should wrap to last item (3 / 3)
    fireEvent.click(screen.getByLabelText('Previous media'));
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });

  it('wraps from last item to first when clicking next', async () => {
    render(
      <MediaAlbumViewer media={mockMedia} albumUrlFriendlyName="album" initialMediaId="media-3" />,
    );

    // Carousel opens at last item (3 / 3) via initialMediaId
    expect(await screen.findByText('3 / 3')).toBeInTheDocument();

    // Click "Next media" → should wrap to first item (1 / 3)
    fireEvent.click(screen.getByLabelText('Next media'));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();
  });

  it('renders <video> for video contentType and <img> for image', async () => {
    render(
      <MediaAlbumViewer media={mockMedia} albumUrlFriendlyName="album" initialMediaId="media-3" />,
    );

    // media-3 is contentType: 'video' — should render a <video> element
    expect(await screen.findByText('3 / 3')).toBeInTheDocument();
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video?.getAttribute('src')).toBe('https://api.example.com/view/3');

    // Navigate to an image item
    fireEvent.click(screen.getByLabelText('Previous media'));
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    // Now an <img> is rendered for the viewer (not the thumbnails)
    const viewerImg = document.querySelector('img[src="https://api.example.com/view/2"]');
    expect(viewerImg).toBeInTheDocument();
  });
});
