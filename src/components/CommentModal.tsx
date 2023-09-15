import React from "react";

import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import PublishTweet from "./PublishTweet";

export default function App() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3"> 
      </div>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Post your reply!</ModalHeader>
              <ModalBody>
                <PublishTweet/>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Post
                </Button>
                
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
