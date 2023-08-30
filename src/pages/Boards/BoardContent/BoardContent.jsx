import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import PropTypes from 'prop-types';
import { mapOrder } from '~/utils/sort.js';
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import CardItem from './ListColumns/Column/ListCard/Card/Card';
import { cloneDeep } from 'lodash';

BoardContent.propTypes = {
  board: PropTypes.object,
};

const ACTIVE_DRAG_ITEM_TYPE = {
  COULUMN: 'ACTIVE_DRAG_ITEM_TYPE_COULUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
};

function BoardContent({ board }) {
  const pointerSenser = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const mounseSenser = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });

  // const senseres = useSensors(pointerSenser);
  const senseres = useSensors(mounseSenser, touchSensor);

  const [orderedColumnsState, setOrderedColumnsState] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null);

  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id');
    setOrderedColumnsState(orderedColumns);
  }, [board]);

  //
  const findColumnBuyCardId = (cardId) => {
    return orderedColumnsState.find((column) => {
      return column?.cards
        ?.map((card) => {
          return card._id;
        })
        ?.includes(cardId);
    });
  };
  //handleDragStart
  const handleDragStart = (e) => {
    // console.log('handleDrageStart :', e);
    setActiveDragItemId(e?.active?.id);
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COULUMN,
    );
    setActiveDragItemData(e?.active?.data?.current);
    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnBuyCardId(e?.active?.id));
    }
  };

  //handleDragOver trigger trong qua trinh keo phan tu
  const handleDragOver = (e) => {
    // console.log('handleDragOver:', e);
    // khong lam gi neu => keo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULUMN) {
      return;
    }
    // con neu keo tha CARD=> thi xu ly them
    const { active, over } = e;
    if (!active || !over) return;
    const {
      id: activeDragingCardId,
      data: { current: activeDragingCardData },
    } = active;
    const { id: overCardId } = over;

    // tim 2 cai column theo card ID
    const activeColum = findColumnBuyCardId(activeDragingCardId);
    const overColumn = findColumnBuyCardId(overCardId);

    if (!activeColum || !overColumn) {
      return;
    }

    if (activeColum._id !== overColumn._id) {
      setOrderedColumnsState((prevColumn) => {
        const overCardIndex = overColumn?.cards?.findIndex((card) => {
          return card._id === overCardId;
        });

        let newCardIndex;

        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prevColumn);

        const nextActiveColumn = nextColumns.find((colum) => {
          return colum._id === activeColum._id;
        });

        const nexOverColumn = nextColumns.find((colum) => {
          return colum._id === overColumn._id;
        });

        if (nextActiveColumn) {
          //
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => {
            return card._id !== activeDragingCardId;
          });

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => {
            return card._id;
          });
        }

        if (nexOverColumn) {
          //
          nexOverColumn.cards = nexOverColumn.cards.filter((card) => {
            return card._id !== activeDragingCardId;
          });
          nexOverColumn.cards = nexOverColumn.cards.toSpliced(newCardIndex, 0, activeDragingCardData);

          nexOverColumn.cardOrderIds = nexOverColumn.cards.map((card) => {
            return card._id;
          });
        }
        return nextColumns;
      });
    }
  };

  // handleDrageEnd
  const handleDrageEnd = (e) => {
    // console.log('handleDrageEnd :', e);
    const { active, over } = e;

    // xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragingCardId,
        data: { current: activeDragingCardData },
      } = active;
      const { id: overCardId } = over;

      // tim 2 cai column theo card ID
      const activeColum = findColumnBuyCardId(activeDragingCardId);
      const overColumn = findColumnBuyCardId(overCardId);

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //keo tha card ngoai => column
      } else {
        // keo tha card trong cung 1 column
        //  get index old
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((c) => c._id === activeDragItemId);
        //  get index new
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId);

        const dndOderedCards = arrayMove(orderedColumnsState, oldCardIndex, newCardIndex);
        setOrderedColumnsState((prevColumn) => {
          const nextColumns = cloneDeep(prevColumn);

          const targetColumn = nextColumns.find((c) => {
            return c._id === overColumn._id;
          });

          targetColumn.cards = dndOderedCards;
          targetColumn.cardOrderIds = dndOderedCards?.map((i) => i._id);

          return nextColumns;
        });
      }
    }

    // xu ly keo tha Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULUMN) {
      if (active.id !== over.id) {
        console.log('hanh dong keo tha COLUMNS');

        //  get index old
        const oldColumnIndex = orderedColumnsState.findIndex((c) => c._id === active.id);
        //  get index new
        const newColumnIndex = orderedColumnsState.findIndex((c) => c._id === over.id);

        const dndOderedColumn = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex);
        // const dndOderedColumnIds = dndOderedColumn.map((c) => c._id);

        // console.log('dndOderedColumn:', dndOderedColumn);
        // console.log('dndOderedColumnIds:', dndOderedColumnIds);
        setOrderedColumnsState(dndOderedColumn);
      }
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDrageEnd}
      sensors={senseres}
      collisionDetection={closestCorners}
    >
      <Box
        sx={{
          bgcolor: (theme) => {
            return theme.palette.mode === 'dark' ? '#34495e' : '#1976d2';
          },
          width: '100%',
          height: (theme) => theme.vars.trelloCustom.boardContentHeight,
          p: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumnsState} />

        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COULUMN && <Column column={activeDragItemData} />}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <CardItem cards={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
