import type { Metadata } from 'next';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
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
  const tags = (await fetchTags()).filter((tag) => tag.count != null && tag.count > 0);

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
                <ListItem
                  key={tag.id}
                  disablePadding
                  secondaryAction={
                    tag.count != null ? (
                      <Chip
                        label={tag.count}
                        size="small"
                        color="primary"
                        sx={{
                          minWidth: 24,
                          height: 20,
                          fontSize: '0.7rem',
                          '& .MuiChip-label': { px: 0.75 },
                        }}
                      />
                    ) : undefined
                  }
                >
                  <ListItemButton href={`/tags/${tag.name}`} sx={{ borderRadius: 1, py: 0.5 }}>
                    <Typography variant="body2">{tag.name}</Typography>
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
      <Typography variant="body1" color="text.secondary">
        Personal portfolio, media albums, writings, and more.
      </Typography>
      <RandomKnowledge />
    </SecondaryLayout>
  );
}
