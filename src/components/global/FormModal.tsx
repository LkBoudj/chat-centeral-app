import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Form from "./Form";

type Props = {
  isOpen: boolean;
  title: string;
  typeForm: string;
  children?: React.ReactNode;
  handleSubmit?: (key: any) => void;
  onOpenChange?: (kay: any) => void;
  edit?: boolean;
  classContent?: string;
  classForm?: string;
};

const FormModal = ({
  isOpen,
  onOpenChange,
  title,
  typeForm,
  children,
  handleSubmit,
  edit,
  classContent,
  classForm,
}: Props) => {
  return (
    <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className={classContent}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Form className={classForm} handleSubmit={handleSubmit}>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  {edit && (
                    <Button
                      size="lg"
                      className="w-full"
                      color="primary"
                      type="submit"
                    >
                      {typeForm}
                    </Button>
                  )}
                </ModalFooter>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
