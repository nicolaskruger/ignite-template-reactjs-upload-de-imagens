import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalBody>
            <Image src={imgUrl} />
            <ModalFooter>
              <Link target="_blank" href={imgUrl}>
                abri original
              </Link>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
  // TODO MODAL WITH IMAGE AND EXTERNAL LINK
}
