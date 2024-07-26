import { PhoneIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfile, updateUser } from "../../services/Apis";
import { BASE_URL } from "../../services/helper";
import { userData } from "../../components/context/ContextProvider";

const Edit = () => {
  const { id } = useParams()
  const [inputData, setInputData] = useState(
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.dev',
      mobile: '1112223334',
      gender: '',
      status: '',
      location: 'Prayagraj, India',
      createdAt: '2024-07-03T17:42:40.454+00:00',
      updatedAt: '2024-07-03T17:42:40.454+00:00',
    }
  );

  
  const getUser = async () => {
    const res = await getUserProfile(id)

    if (res.status === 200) {
      setInputData(res.data)
      setTimeout(() => setLoading(false), 1000);
    }
    
    else console.log('Error!')
  }

  const { firstName, lastName, email, mobile, location, gender, status, profile } =
    inputData;

  const [img, setImg] = useState(""); // User profile image
  const [preview, setPreview] = useState(""); // Image Preview
  const [loading, setLoading] = useState(true); 
  const toast = useToast({ position: "top" });
  const navigate = useNavigate()
  const { userDetails, setUserDetails } = useContext(userData)
  
  // set Input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // set profile
  const setUserProfile = (e) => setImg(e.target.files[0]);

  // Submit User data
  const submitHandler = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10)
      return toast({
        title: "Error!",
        description: "Enter valid mobile number",
        status: "error",
        duration: 2000,
      });
    
    const data = new FormData()
    for (const [key, value] of Object.entries(inputData)) {
      data.append(key, value)
    }

    if(img) data.append('user_profile', img) 
    
    const header = { "Content-Type": "multipart/form-data" }
    const res = await updateUser(id, data, header)

    if (res.status === 200) {
      setUserDetails({ ...res.data, type: 'updated' })
      navigate('/')
    }


  };

  useEffect(() => {
    getUser()
  }, [id])

  useEffect(() => {
    if (img) setPreview(URL.createObjectURL(img));
  }, [img]);

  return (
    <Box mt={6}>
      <Heading
        as='h2'
        fontSize={["lg", "2xl", "3xl"]}
        textAlign="center"
        color="gray.700"
        mb={["28px", "35px"]}
      >
        Update Your Details
      </Heading>

      {
        loading ?
          (
            <Center h='200px' alignItems='center' >
              <Spinner
                thickness='4px'
                speed='0.65s'
                color='blue.500'
                size='lg'
                mt="10rem"
              />
            </Center>
          ) : (
            <Container maxWidth={"5xl"} mb={6}>
              <Center mb="25px">
                <Avatar
                  src={ img ? preview : `${BASE_URL}/uploads/${profile}` }
                  w="60px"
                  h="60px"
                />
              </Center>

              <form onSubmit={submitHandler}>
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 4, md: 20 }}
                  mb={{ base: "16px", md: "20px" }}
                >
                  <FormControl isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      focusBorderColor="cyan.400"
                      placeholder="Enter First Name"
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={setInputValue}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      focusBorderColor="cyan.400"
                      placeholder="Enter Last Name"
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={setInputValue}
                    />
                  </FormControl>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 4, md: 20 }}
                  mb={{ base: "16px", md: "20px" }}
                >
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      focusBorderColor="cyan.400"
                      placeholder="Enter Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={setInputValue}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Mobile</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <PhoneIcon color="gray.300" />
                      </InputLeftElement>
                      <Input
                        focusBorderColor="cyan.400"
                        placeholder="Mobile No."
                        type="tel"
                        name="mobile"
                        value={mobile}
                        onChange={setInputValue}
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 4, md: 20 }}
                  mb={{ base: "16px", md: "20px" }}
                >
                  <FormControl isRequired>
                    <FormLabel>Select Your Gender</FormLabel>
                    <RadioGroup name="gender" defaultValue={gender}>
                      <Stack>
                        <Radio onChange={setInputValue} colorScheme="cyan" value="M">
                          Male
                        </Radio>
                        <Radio onChange={setInputValue} colorScheme="cyan" value="F">
                          Female
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Select Your Status</FormLabel>
                    <Select
                      onChange={setInputValue}
                      name="status"
                      defaultValue={status}
                      focusBorderColor="cyan.400"
                      placeholder="Select..."
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={{ base: 4, md: 20 }}
                  mb={{ base: "16px", md: "20px" }}
                >
                  <FormControl >
                    <FormLabel>Select Your Profile</FormLabel>
                    <Input
                      name="user_profile"
                      p="5px"
                      focusBorderColor="cyan.400"
                      type="file"
                      onChange={setUserProfile}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Enter Your Location</FormLabel>
                    <Input
                      focusBorderColor="cyan.400"
                      placeholder="Enter Your Location"
                      type="text"
                      name="location"
                      onChange={setInputValue}
                      value={location}
                    />
                  </FormControl>
                </Stack>

                <Center mt="30px">
                  <Button
                    w={{ base: "100%", md: "150px" }}
                    fontSize="lg"
                    colorScheme="cyan"
                    color="white"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Center>
              </form>
            </Container>
          )
      }
      

    </Box>
  );
};


export default Edit