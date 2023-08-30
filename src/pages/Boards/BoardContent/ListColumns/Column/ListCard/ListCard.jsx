import Box from '@mui/material/Box';
import CardItem from './Card/Card';
import PropTypes from 'prop-types';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

ListCard.propTypes = {
  card: PropTypes.array,
};

function ListCard({ card }) {
  return (
    <SortableContext items={card?.map((column) => column?._id)} strategy={verticalListSortingStrategy}>
      <Box
        sx={{
          p: '0 5px',
          m: '0 5px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} - ${
              theme.vars.trelloCustom.columnHeaderHeight
            } - ${theme.vars.trelloCustom.columnFooterHeight} )`,
          '& .MuiPaper-elevation': {
            overflow: 'unset',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ced0da',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bfc2cf',
          },
        }}
      >
        {/* <CardItem temporaryHideMedia /> */}
        {card?.map((item) => {
          return <CardItem key={item?._id} cards={item} />;
        })}
      </Box>
    </SortableContext>
  );
}

export default ListCard;
