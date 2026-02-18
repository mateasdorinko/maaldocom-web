import type { Metadata } from 'next';
import Box from '@mui/material/Box';
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
      {/* Desktop: float right alongside paragraphs */}
      <Box
        component="img"
        src="/images/fam.jpg"
        alt="Family"
        sx={{
          display: { xs: 'none', sm: 'block' },
          float: 'right',
          width: { sm: 250, md: 350 },
          height: 'auto',
          borderRadius: 2,
          ml: 3,
          mb: 2,
        }}
      />
      <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 2 }}>
        Hi, I&apos;m Matt — a dad to two boys, husband, and tinkerer at heart.
      </Typography>
      <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 2 }}>
        I enjoy solving problems and building things that are thoughtful, reliable, and
        well-designed. I&apos;m drawn to sophistication through simplicity, and creating systems
        that are powerful without being overcomplicated. By day I&apos;m a developer; in my free
        time, you&apos;ll usually find me hacking on side projects, building and refining software,
        experimenting in my homelab. I enjoy understanding how things work under the hood and making
        them better.
      </Typography>
      <Typography variant="body1" color="text.secondary" component="p" sx={{ mb: 2 }}>
        I&apos;m committed to living a healthy, disciplined life (unless there are cookies around),
        and continually improving myself. Above all, I value faith, family, and building things that
        last - in technology and in life. I strive to do meaningful work, stay curious, and show up
        well at home first, and everywhere else after.
      </Typography>
      {/* Mobile: below paragraphs */}
      <Box
        component="img"
        src="/images/fam.jpg"
        alt="Family"
        sx={{
          display: { xs: 'block', sm: 'none' },
          width: '100%',
          height: 'auto',
          borderRadius: 2,
          mb: 2,
        }}
      />
      <RandomKnowledge />
    </SecondaryLayout>
  );
}
