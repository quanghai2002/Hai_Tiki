import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar';
import BoardContent from './BoardContent';
import { mockData } from '~/apis/mock-data.js';

Board.propTypes = {};

function Board() {
  return (
    <Container
      disableGutters
      sx={{
        height: '100vh',
      }}
    >
      <AppBar board={mockData?.board} />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  );
}

export default Board;
