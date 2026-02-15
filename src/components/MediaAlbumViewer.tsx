'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Chip from '@mui/material/Chip';
import DownloadIcon from '@mui/icons-material/Download';
import type { GetMediaResponse } from '@/types/api';

interface MediaAlbumViewerProps {
  media: GetMediaResponse[];
  albumUrlFriendlyName: string;
  /** If set, carousel opens immediately focused on this media item */
  initialMediaId?: string;
}

export default function MediaAlbumViewer({
  media,
  albumUrlFriendlyName,
  initialMediaId,
}: MediaAlbumViewerProps) {
  const [open, setOpen] = React.useState(!!initialMediaId);
  const [currentIndex, setCurrentIndex] = React.useState(() => {
    if (!initialMediaId) return 0;
    const idx = media.findIndex((m) => m.id === initialMediaId);
    return idx >= 0 ? idx : 0;
  });

  // Ref for the element that triggered the carousel (for focus restore)
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  const currentMedia = media[currentIndex];

  const handleOpen = (index: number, buttonEl: HTMLButtonElement) => {
    triggerRef.current = buttonEl;
    setCurrentIndex(index);
    setOpen(true);
    window.history.replaceState(
      null,
      '',
      `/media-albums/${albumUrlFriendlyName}/media/${media[index]?.id}`,
    );
  };

  const handleClose = () => {
    setOpen(false);
    window.history.replaceState(null, '', `/media-albums/${albumUrlFriendlyName}`);
    // Restore focus to the thumbnail that opened the carousel
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const goTo = React.useCallback(
    (index: number) => {
      setCurrentIndex(index);
      window.history.replaceState(
        null,
        '',
        `/media-albums/${albumUrlFriendlyName}/media/${media[index]?.id}`,
      );
    },
    [albumUrlFriendlyName, media],
  );

  const goPrev = React.useCallback(() => {
    goTo(currentIndex === 0 ? media.length - 1 : currentIndex - 1);
  }, [currentIndex, media.length, goTo]);

  const goNext = React.useCallback(() => {
    goTo(currentIndex === media.length - 1 ? 0 : currentIndex + 1);
  }, [currentIndex, media.length, goTo]);

  // Keyboard navigation for carousel
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, goPrev, goNext]);

  if (media.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
        No media in this album.
      </Typography>
    );
  }

  return (
    <>
      {/* ── Thumbnail Grid ── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 200px))',
          gap: 1,
        }}
      >
        {media.map((item, index) => (
          <Box
            key={item.id}
            component="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleOpen(index, e.currentTarget)}
            aria-label={`View ${item.fileName || `media ${index + 1}`}`}
            sx={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              borderRadius: 1,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              backgroundColor: 'action.hover',
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2,
              },
            }}
          >
            {/* Thumbnails use thumbHref directly — no proxying */}
            {item.thumbHref && (
              <Box
                component="img"
                src={item.thumbHref}
                alt={item.description || item.fileName || ''}
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            )}
          </Box>
        ))}
      </Box>

      {/* ── Carousel Modal ── */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        fullWidth
        aria-label="Media viewer"
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'black',
              maxHeight: '95vh',
              maxWidth: '95vw',
              m: 1,
            },
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            position: 'relative',
            overflow: 'hidden',
            minHeight: '60vh',
          }}
        >
          {/* Close button */}
          <IconButton
            onClick={handleClose}
            aria-label="Close viewer"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'white',
              zIndex: 2,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Previous button */}
          <IconButton
            onClick={goPrev}
            aria-label="Previous media"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              zIndex: 2,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* Next button */}
          <IconButton
            onClick={goNext}
            aria-label="Next media"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              zIndex: 2,
              bgcolor: 'rgba(0,0,0,0.5)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

          {/* Media viewer — img or video based on contentType discriminator */}
          {currentMedia && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                minHeight: '60vh',
              }}
            >
              {currentMedia.contentType === 'video' ? (
                <Box
                  component="video"
                  controls
                  autoPlay
                  key={currentMedia.id}
                  src={currentMedia.viewerHref ?? undefined}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                  }}
                >
                  Your browser does not support the video tag.
                </Box>
              ) : (
                <Box
                  component="img"
                  src={currentMedia.viewerHref ?? undefined}
                  alt={currentMedia.description || currentMedia.fileName || ''}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                  }}
                />
              )}
            </Box>
          )}

          {/* Description and tags */}
          {(currentMedia?.description || (currentMedia?.tags && currentMedia.tags.length > 0)) && (
            <Box
              sx={{
                width: '100%',
                px: 1.5,
                pt: 1,
                bgcolor: 'rgba(0,0,0,0.7)',
              }}
            >
              {currentMedia.description && (
                <Typography variant="body2" sx={{ color: 'white' }}>
                  {currentMedia.description}
                </Typography>
              )}
              {currentMedia.tags && currentMedia.tags.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {currentMedia.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      color="primary"
                      component="a"
                      href={`/tags/${encodeURIComponent(tag)}`}
                      clickable
                      sx={{
                        color: '#fff',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* Bottom bar: counter + download */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              p: 1.5,
              bgcolor: 'rgba(0,0,0,0.7)',
            }}
          >
            <Typography variant="body2" sx={{ color: 'white' }}>
              {currentIndex + 1} / {media.length}
            </Typography>
            {currentMedia?.href && (
              <Button
                component="a"
                href={currentMedia.href}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DownloadIcon />}
                size="small"
                sx={{ color: 'white' }}
                aria-label="Download full resolution"
              >
                Download
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
