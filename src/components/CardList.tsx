import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const disclosure = useDisclosure();
  // TODO SELECTED IMAGE URL STATE
  const [imageUrl, setImageUrl] = useState('');
  // TODO FUNCTION HANDLE VIEW IMAGE

  const handleViewImage = (url: string) => {
    setImageUrl(url);
    disclosure.onOpen();
  };

  return (
    <>
      {/* TODO CARD GRID */}
      <SimpleGrid column={3} spacing="40px">
        {cards.map(card => (
          <Card viewImage={handleViewImage} data={card} />
        ))}
      </SimpleGrid>
      {/* TODO MODALVIEWIMAGE */}
      <ModalViewImage
        imgUrl={imageUrl}
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      />
    </>
  );
}
