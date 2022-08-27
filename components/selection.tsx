import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, IconButton, Image, Input, Spacer, Stack, Textarea, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectionInput, SelectionItemInput, selectionModel } from '../common/model/selection';
import SelectionItemModal from './selectionItemModal';


const Selection: FC = (): ReactElement => {
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, reset } = useForm<SelectionInput>({
        resolver: zodResolver(selectionModel)
    });

    const [selectionItems, setSelectionItems] = React.useState<SelectionItemInput[]>([]);

    const onChangeSelectionItems = (data: SelectionItemInput) => {
        console.log('--', data);
        let items: SelectionItemInput[];
        items = selectionItems;
        items.push(data);
        setSelectionItems(items);
    }

    const onSubmit: SubmitHandler<SelectionInput> = async (data) => {
        console.log('- selection -', { ...data, selectionItems: selectionItems });
        // TODO: save selection by sending data to POST /api/selection
        try {
            const res = await fetch(`/api/selection`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, selectionItems: selectionItems })
            });
            const result = await res.json();
            console.log('- res1 -', result);
            // if (result && selectionItems) {
            //     saveSelectionItems(selectionItems, result)
            // }
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const saveSelectionItems = async (data: SelectionItemInput[], selection: SelectionInput) => {
        try {
            const res = await fetch(`/api/selection/item`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    selection: selection,
                    items: data
                })
            });
            const result = await res.json();
            console.log('- res2 -', result);
        } catch (error) {
            console.log('error: ', error)
        }
    }

    // Chakra UI modal: https://chakra-ui.com/docs/components/modal/usage 
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Container maxWidth="container.fluid" py={4} px={40}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Flex p="4">
                    <Heading>Add Selection</Heading>
                    <Spacer />
                    <Button colorScheme="blue" type="submit">
                        Save
                    </Button>
                </Flex>
                <Divider />
                <Box pt="6">
                    <Flex p="4">
                        <Stack spacing={4} flex="7" pe={20}>
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
                        </Stack>
                        <Stack spacing={4} flex="5" ps={20}>
                            <FormControl isInvalid={errors.budget !== undefined}>
                                <FormLabel>Budget</FormLabel>
                                <Input type='number' {...register("budget", { valueAsNumber: true })} />
                                <FormErrorMessage>{errors.budget?.message}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.dueDate !== undefined}>
                                <FormLabel>Due Date</FormLabel>
                                <Input type='date' {...register("dueDate", { valueAsDate: true })} />
                                <FormErrorMessage>{errors.dueDate?.message}</FormErrorMessage>
                            </FormControl>
                            {/* <pre>Form validation status: {JSON.stringify(zo.validation, null, 2)}</pre> */}
                        </Stack>
                    </Flex>
                </Box>
            </form>
            <Container maxWidth="container.fluid" pt="6">
                <Stack spacing={4}>
                    <Box>
                        <FormLabel>Items</FormLabel>
                        <IconButton onClick={onOpen} colorScheme='blue' aria-label='Add Selection Item' icon={<AddIcon />} />
                        <SelectionItemModal isOpen={isOpen} onClose={onClose} onChangeSelectionItems={onChangeSelectionItems} />
                    </Box>
                </Stack>
                <Stack gap={4} py={4}>
                    {
                        selectionItems &&
                        selectionItems.map((item, index) =>
                            <Flex key={index}>
                                <Box flex="1" pe={4}>
                                    <Image src={item.imageUrl} alt={item.name} />
                                </Box>
                                <Box flex="4">
                                    {item.name}
                                    {item.description}
                                </Box>
                                <Box flex="1">
                                    {item.price ? "$" + item.price : ''}
                                </Box>
                            </Flex>
                        )
                    }
                </Stack>
            </Container>
        </Container>
    );
}

export default Selection