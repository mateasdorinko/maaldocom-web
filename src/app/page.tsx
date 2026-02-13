import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SecondaryLayout from '@/components/SecondaryLayout';
import RandomKnowledge from '@/components/RandomKnowledge';
import { tagsApi } from '@/server';
import type { GetTagResponse } from '@/types/api';

export const metadata: Metadata = {
  title: 'maaldo.com | Home',
  description: 'Personal portfolio, media albums, writings, and more.',
};

export const revalidate = 300;

async function fetchTags(): Promise<GetTagResponse[]> {
  try {
    const { data } = await tagsApi.listTags();
    return data;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const tags = await fetchTags();

  return (
    <SecondaryLayout
      sidebar={
        <>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Tags
          </Typography>
          {tags.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No tags yet.
            </Typography>
          ) : (
            <List disablePadding dense>
              {tags.map((tag) => (
                <ListItem key={tag.id} disablePadding>
                  <ListItemButton href={`/tags/${tag.name}`} sx={{ borderRadius: 1, py: 0.5 }}>
                    <Typography variant="body2">
                      {tag.name}
                      {tag.count != null && (
                        <Typography component="span" variant="body2" color="text.secondary">
                          {' '}
                          ({tag.count})
                        </Typography>
                      )}
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
        Welcome
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Personal portfolio, media albums, writings, and more.
      </Typography>
      <RandomKnowledge />
    </SecondaryLayout>
  );
}
