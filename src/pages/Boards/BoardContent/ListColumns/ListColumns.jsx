import Box from '@mui/material/Box';
import Column from './Column/Column';
import Button from '@mui/material/Button';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PropTypes from 'prop-types';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

ListColumns.propTypes = {
  columns: PropTypes.array,
};

function ListColumns({ columns }) {
  return (
    <SortableContext items={columns?.map((column) => column?._id)} strategy={horizontalListSortingStrategy}>
      <Box
        sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {columns?.map((column) => {
          return <Column key={column?._id} column={column} />;
        })}

        {/* add new colum */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
          }}
        >
          <Button
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1,
            }}
            startIcon={<NoteAddIcon />}
          >
            Add new Column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  );
}

export default ListColumns;
