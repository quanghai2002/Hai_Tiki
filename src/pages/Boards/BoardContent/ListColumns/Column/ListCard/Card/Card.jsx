import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GroupIcon from '@mui/icons-material/Group';
import CommentIcon from '@mui/icons-material/Comment';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

CardItem.propTypes = {
  temporaryHideMedia: PropTypes.bool,
  cards: PropTypes.object,
};

function CardItem({ temporaryHideMedia, cards }) {
  // drop drage
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cards._id,
    data: { ...cards },
  });

  const dndKitCardStyles = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid  #2ecc71' : undefined,
  };

  const shouldShowCardActions = () => {
    return !!cards?.memberIds?.length || !!cards?.comments?.length || !!cards?.attachments?.length;
  };

  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
      }}
    >
      {cards?.cover && <CardMedia sx={{ height: 140 }} image={cards?.cover} title="green iguana" />}

      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5,
          },
        }}
      >
        <Typography>{cards?.title}</Typography>
      </CardContent>

      {shouldShowCardActions() && (
        <CardActions
          sx={{
            p: '0 4px 8px',
          }}
        >
          {!!cards?.memberIds?.length && (
            <Button startIcon={<GroupIcon />} size="small">
              {cards?.memberIds?.length}
            </Button>
          )}

          {!!cards?.comments?.length && (
            <Button startIcon={<CommentIcon />} size="small">
              {cards?.comments?.length}
            </Button>
          )}
          {!!cards?.attachments?.length && (
            <Button startIcon={<AttachmentIcon />} size="small">
              {cards?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </Card>
  );
}

export default CardItem;
