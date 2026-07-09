import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import type { GetMediaAlbumResponse } from '@/types/api';

export default function AlbumsSidebar({ albums }: { albums: GetMediaAlbumResponse[] }) {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        More Media Albums
      </Typography>
      {albums.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No other albums.
        </Typography>
      ) : (
        <List disablePadding dense>
          {albums.map((a) => (
            <ListItem key={a.id} disablePadding>
              <ListItemButton href={`/media-albums/${a.slug}`} sx={{ borderRadius: 1, py: 0.5 }}>
                <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.875rem' }}>
                  {a.name}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
