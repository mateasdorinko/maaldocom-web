import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import SecondaryLayout from '@/components/SecondaryLayout';
import WritingBody from '@/components/WritingBody';
import { writingsApi, mapApiError } from '@/server';
import type { GetWritingDetailResponse, GetWritingResponse } from '@/types/api';

export const revalidate = 600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function fetchWriting(slug: string): Promise<GetWritingDetailResponse | null> {
  try {
    const { data } = await writingsApi.getWritingBySlug(slug);
    return data;
  } catch (error) {
    const { status } = mapApiError(error);
    if (status === 404) return null;
    throw error;
  }
}

async function fetchAllWritings(): Promise<GetWritingResponse[]> {
  try {
    const { data } = await writingsApi.listWritings();
    return data;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const writing = await fetchWriting(slug);
  if (!writing) return { title: 'Not Found' };

  return {
    title: writing.title ?? 'Writing',
    description: writing.blurb ?? undefined,
  };
}

export default async function WritingDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [writing, allWritings] = await Promise.all([fetchWriting(slug), fetchAllWritings()]);

  if (!writing) notFound();

  const otherWritings = allWritings.filter((w) => w.id !== writing.id);

  return (
    <SecondaryLayout
      sidebar={
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            More Writings
          </Typography>
          {otherWritings.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No other writings.
            </Typography>
          ) : (
            <List disablePadding dense>
              {otherWritings.map((w) => (
                <ListItem key={w.id} disablePadding>
                  <ListItemButton href={`/writings/${w.slug}`} sx={{ borderRadius: 1, py: 0.5 }}>
                    <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.875rem' }}>
                      {w.title}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </>
      }
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        color="primary"
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}
      >
        {writing.title}
      </Typography>

      {writing.created && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          {new Date(writing.created).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Typography>
      )}

      {writing.blurb && (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {writing.blurb}
        </Typography>
      )}

      {writing.tags && writing.tags.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3 }}>
          {writing.tags.map((tag) => (
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
                '&:hover': { bgcolor: 'primary.dark' },
              }}
            />
          ))}
        </Box>
      )}

      <WritingBody body={writing.body} />

      {writing.comments && writing.comments.length > 0 && (
        <>
          <Divider sx={{ mt: 4, mb: 3 }} />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Comments
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {writing.comments.map((comment, index) => (
              <Box key={index}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {comment.author ?? 'Anonymous'}
                </Typography>
                {comment.created && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 0.5 }}
                  >
                    {new Date(comment.created).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                )}
                {comment.body && <Typography variant="body2">{comment.body}</Typography>}
              </Box>
            ))}
          </Box>
        </>
      )}
    </SecondaryLayout>
  );
}
