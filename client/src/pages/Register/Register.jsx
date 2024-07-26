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
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/Apis";
import { userData } from "../../components/context/ContextProvider";



const Register = () => {
  const emptyInput = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    status: "",
  }
  const [inputData, setInputData] = useState(emptyInput);
  const { firstName, lastName, email, mobile, location, gender, status } =
    inputData;

  const [img, setImg] = useState(""); // User profile image
  const [preview, setPreview] = useState(""); // Image Preview
  const toast = useToast({ position: 'top'});
  const navigate = useNavigate()

  // set form input value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  // set profile
  const setUserProfile = (e) => setImg(e.target.files[0]);

  const { userDetails, setUserDetails } = useContext(userData)

  // Submit User data
  const submitHandler = async (e) => {
    e.preventDefault();

    // validate mobile number
    if (mobile.length !== 10)
      return toast({
        title: "Enter valid mobile number",
        status: "error",
        duration: 2000,
      });
    
    
    const data = new FormData()
    for (const [key, value] of Object.entries(inputData)) {
      data.append(key, value)
    }
    
    data.append('user_profile', img) 
    
    const header = { "Content-Type": "multipart/form-data" }
    const res = await registerUser(data, header)

    if (res.status === 201) {
      setInputData(emptyInput)
      setImg('')
      setPreview('')
      setUserDetails({...res.data, type: "registered"})
      navigate('/')
      
    } else {
      console.log(res)
      toast({
        title: "Error!",
        description:  res?.response.data ?? "Something went wrong!",
        status: "error",
        duration: 2000,
      })

    }
  };

  useEffect(() => {
    if (img) setPreview(URL.createObjectURL(img));
  }, [img]);

  return (
    <Box mt={6} >
      <Heading
        as="h2"
        fontSize={["lg", "2xl", "3xl"]}
        textAlign="center"
        color="gray.700"
        mb={["28px", "35px"]}
      >
        Register Your Details
      </Heading>

      <Container maxWidth={"5xl"} mb={6}>
        <Center mb="25px">
          <Avatar
            src={preview ? preview : "/user-avatar.png"}
            w="60px"
            h="60px"
          />
        </Center>

        <form onSubmit={submitHandler}>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 20 }}
            mb={ "22px" }
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
            mb={ "22px" }
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
            mb={ "22px" }
          >
            <FormControl isRequired>
              <FormLabel>Select Your Gender</FormLabel>
              <RadioGroup name="gender"  >
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
                value={status}
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
            mb={ "22px" }
          >
            <FormControl isRequired>
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
    </Box>
  );
};

export default Register;
