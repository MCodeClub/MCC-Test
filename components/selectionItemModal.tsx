import { Button, Divider, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Textarea } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
// 
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectionItemInput, selectionItemModel } from '../common/model/selection';

type Props = {
    isOpen: boolean,
    onClose: () => void,
    onChangeSelectionItems: (data: SelectionItemInput) => void
}

const SelectionItemModal: FC<Props> = ({ isOpen, onClose, onChangeSelectionItems }): ReactElement => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<SelectionItemInput>({
        resolver: zodResolver(selectionItemModel)
    });

    const onSubmit: SubmitHandler<SelectionItemInput> = async (data) => {
        console.log('- selection item -', data)
        // TODO: save selection by sending data to POST /api/selection
        onChangeSelectionItems(data)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Selection Item</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* 
                        TODO: Implement for to add selection item
                    */}
                    <Divider />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Stack spacing={4} py="6">
                            <FormControl isInvalid={errors.name !== undefined}>
                                <FormLabel>Name</FormLabel>
                                <Input type='text' {...register("name")} />
                                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.description !== undefined}>
                                <FormLabel>Description</FormLabel>
                                <Textarea {...register("description")} />
                                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.imageUrl !== undefined}>
                                <FormLabel>Image Url</FormLabel>
                                <Input type='text' {...register("imageUrl")} />
                                <FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.price !== undefined}>
                                <FormLabel>Price</FormLabel>
                                <Input type='number' {...register("price", { valueAsNumber: true })} />
                                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <Button type='submit' w="full">
                                    Save
                                </Button>
                            </FormControl>
                        </Stack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SelectionItemModal