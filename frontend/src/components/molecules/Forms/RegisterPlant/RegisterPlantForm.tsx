import React, { useState } from 'react';
import { validatePlant } from 'utils/registrationPlantValidator';
import {
    FormControl,
    Input,
    Flex,
    Button,
    Heading,
    FormLabel,
    InputRightAddon,
    InputGroup,
    useToast,
    NumberInput,
    NumberInputField
  } from '@chakra-ui/react';
import { registerPlant } from 'api/requests';
import { useHistory } from 'react-router-dom';

const RegisterPlantForm: React.FC = () => {
    const [name, setName] = useState('');
    const [planted, setPlanted] = useState('');
    const [species, setSpecies] = useState('');
    const [region, setRegion] = useState('');
    
    const [tempMin, setTempMin] = useState<number>();
    const [tempMax, setTempMax] = useState<number>();
    const [humMin, setHumMin] = useState<number>();
    const [humMax, setHumMax] = useState<number>();
    const [soilMin, setSoilMin] = useState<number>();
    const [soilMax, setSoilMax] = useState<number>();

    // const [regErr, setError] = useState<undefined | string[]>(); // Not needed?
    const toast = useToast();
    const history = useHistory();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const PlantPayload = {
            name: name,
            species: species,
            temperature_min: tempMin,
            temperature_max: tempMax,
            humidity_min: humMin,
            humidity_max: humMax,
            soil_moisture_min: soilMin,
            soil_moisture_max: soilMax,
            region: region
        };
        
        const errMsg = validatePlant(PlantPayload);

        if (errMsg.length) {
            // setError(errMsg);
            console.log(errMsg);
            toast({
                title: errMsg,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            return;
        }
        try {
            await registerPlant(PlantPayload);
            toast({
                title: 'Successfully registered plant!',
                status: 'success',
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            var msg = [''];
            switch (error.statusCode) {
                default:
                    msg = ["Unexpected error, couldn't create user"];
            }
            toast({
                title: msg,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            return;
        }
        history.push('/'); // push to plant pid?

    }
    return (
        <Flex width='100%' justifyContent='center' align='center' flexDir='column' mb='10rem'>
            <form onSubmit={handleSubmit} >
                <Heading>Add a new plant!</Heading>
                <Heading mt='0.5' size='md'>Tell me a little about your plant</Heading>
                <FormControl id='plantName' isRequired>
                    <FormLabel mb='-0.4' htmlFor='plantName'>Plant name</FormLabel>
                    <Input
                        name='plantName'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='What is the name of your darling?'
                        focusBorderColor='green.400'
                        autoFocus
                    />
                </FormControl>

                <FormControl mt='0.5rem' id='planted'>
                    <FormLabel mb='-0.4' htmlFor='planted'>Planted</FormLabel>
                    <Input
                        name='planted'
                        type='date'
                        value={planted}
                        onChange={(e) => setPlanted(e.target.value)}
                        focusBorderColor='green.400'
                    />
                </FormControl>
                <FormControl mt='0.5rem' id='species'>
                    <FormLabel mb='-0.4' htmlFor='species'>Species</FormLabel>
                    <Input
                        name='species'
                        type='text'
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder='What kind of creature is this?'
                        focusBorderColor='green.400'
                    />
                </FormControl>
                <FormControl mt='0.5rem' id='region'>
                    <FormLabel mb='-0.4' htmlFor='region'>Species origin region</FormLabel>
                    <Input
                        name='region'
                        type='text'
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        placeholder='Where does your plant come from?'
                        focusBorderColor='green.400'
                    />
                </FormControl>

                <Heading mt='2rem' size='md'>Thresholds</Heading>
                <Heading mt='0.5rem' size='sm'>Temperature</Heading>
                <Flex>
                    <FormControl mt='0.5rem' mr='0.25rem' id='tempMin'>
                    <FormLabel mb='-0.4' htmlFor='tempMin'></FormLabel>
                    <InputGroup>
                            <NumberInput 
                                name='tempMin'
                                type='number'
                                value={tempMin}
                                onChange={(e) => setTempMin(e)}
                                focusBorderColor='blue.400'
                                min={-273}
                                max={700}
                            >
                               <NumberInputField placeholder='Min' />
                            </NumberInput>
                            <InputRightAddon children='C°'/>
                        </InputGroup>
                    </FormControl>
                    <FormControl mt='0.5rem' ml='0.25rem' id='tempMax'>
                        <FormLabel mb='-0.4' htmlFor='tempMax'></FormLabel>
                        <InputGroup>
                            <NumberInput 
                                name='tempMax'
                                type='number'
                                value={tempMax}
                                onChange={(e) => setTempMax(e)}
                                focusBorderColor='red.400'
                                min={-273}
                                max={700}
                            >
                                <NumberInputField placeholder='Max' />
                            </NumberInput>
                            <InputRightAddon children='C°'/>
                        </InputGroup>
                    </FormControl>
                </Flex>
                
                <Heading mt='0.5rem' size='sm'>Air humidity</Heading>
                <Flex>
                    <FormControl mt='0.5rem' mr='0.25rem' id='humMin'>
                        <FormLabel mb='-0.4' htmlFor='humMin'></FormLabel>
                        <InputGroup>
                            <NumberInput 
                                name='humMin'
                                type='number'
                                value={humMin}
                                onChange={(e) => setHumMin(e)}
                                focusBorderColor='blue.400'
                                min={0}
                                max={100}
                            >
                               <NumberInputField placeholder='Min' />
                            </NumberInput>
                            <InputRightAddon children='%'/>
                        </InputGroup>
                    </FormControl>
                    <FormControl mt='0.5rem' ml='0.25rem' id='humMax'>
                        <FormLabel mb='-0.4' htmlFor='humMax'></FormLabel>
                        <InputGroup>
                            <NumberInput 
                                name='humMax'
                                type='number'
                                value={humMax}
                                onChange={(e) => setHumMax(e)}
                                focusBorderColor='red.400'
                                min={0}
                                max={100}
                                >
                                <NumberInputField placeholder='Max' />
                            </NumberInput>
                            <InputRightAddon children='%'/>
                        </InputGroup>
                    </FormControl>
                </Flex>

                <Heading mt='0.5rem' size='sm'>Soil moisture</Heading>
                <Flex>
                <FormControl mt='0.5rem' mr='0.25rem' id='soilMin'>
                    <FormLabel mb='-0.4' htmlFor='soilMin'></FormLabel>
                    <InputGroup>
                        <NumberInput 
                            name='soilMin'
                            type='number'
                            value={soilMin}
                            onChange={(e) => setSoilMin(e)}
                            focusBorderColor='blue.400'
                            min={0}
                            max={100}
                        >
                            <NumberInputField placeholder='Min' />
                        </NumberInput>
                        
                        <InputRightAddon children='%'/>
                    </InputGroup>
                </FormControl>
                <FormControl mt='0.5rem' ml='0.25rem' id='soilMax'>
                    <FormLabel mb='-0.4' htmlFor='soilMax'></FormLabel>
                    <InputGroup>
                        <NumberInput 
                            name='soilMax'
                            value={soilMax}
                            type='number'
                            onChange={(e) => setSoilMax(e)}
                            focusBorderColor='red.400'
                            min={0}
                            max={100}
                        >
                            <NumberInputField placeholder='Max' />
                        </NumberInput>
                        <InputRightAddon children='%'/>
                    </InputGroup>
                </FormControl>
                </Flex>

                <Button type='submit' value='submit' mt='0.5rem' width='full'>
                    Submit
                </Button>
            </form>
        </Flex>
    );

}

export default RegisterPlantForm;