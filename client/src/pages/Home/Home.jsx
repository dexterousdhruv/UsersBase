import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Center, Container, FormControl, Heading, HStack, Input, Radio, RadioGroup, Spacer, Spinner, Stack, useToast, } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import UserTable from "../../components/Tables/UserTable";
import { userData } from "../../components/context/ContextProvider";
import { deleteGivenUser, exportToCsv, getAllUsers } from "../../services/Apis";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [usersArr, setUsersArr] = useState([]);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('new');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { userDetails, setUserDetails } = useContext(userData)
  
  const toast = useToast( { position: "top"})
  const navigate = useNavigate();
 
  // get users
  const allUsers = async () => {
    const res = await getAllUsers(search, gender, status, sort, page)

    if (res.status === 200 && res.data.allUsers.length) {
      setUsersArr(res.data.allUsers)
      setPageCount(res.data.pagination.pageCount)
      setTimeout(() => setLoading(false), 50);

    } else {
      alert('Error! No users found')
    }
  }
 
  // delete user
  const deleteUser = async (id) => {
    const res = await deleteGivenUser(id)
    
    if (res.status === 200) {
      allUsers()
      toast({
        title: "Success!",
        description: 'User deleted successfully!',
        status: "success",
        duration: 2500,
      });
    } else {
      toast({
        title: "Error!",
        description: "Something went wrong!",
        status: "error",
        duration: 2000,
      })
    }
  }

  
  // export to csv
  const exportUsers = async () => {
    const res = await exportToCsv()

    if (res.status === 200) {
      window.open(res.data.downloadUrl, 'blank')
    } else {
      toast({
        title: "Error!",
        description: "Something went wrong!",
        status: "error",
        duration: 2000,
      })
    }
  }


  useEffect(() => {
    allUsers()
    setLoading(true)
  }, [search, gender, status, sort, page])
  
  // show toast when user is registered or updated
  useEffect(() => {
    setTimeout(() => {
      if (userDetails) {
        toast({
          title: "Success!",
          description: `User has been ${userDetails.type} successfully!`,
          status: "success",
          duration: 2500,
        });
        setUserDetails('')
      }
    }, 1000);

  }, []) ;

  
 
  return (
    <Container maxW={"8xl"} mt={10} >
      <Stack spacing={{ base: 10, sm: 20 }}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          spacing={4}
          align={"center"}
        >
          <HStack maxW="400px">
            <Input
              type="text"
              placeholder="Search By Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button colorScheme="cyan" color="white">
              Search
            </Button>
          </HStack>
          <Spacer />
          {search}
          <Button
            colorScheme="cyan"
            color="white"
            onClick={() => navigate("/register")}
          >
            <AddIcon mr={2} />
            Add User
          </Button>
        </Stack>

        <Stack
          overflowX={{ base: "scroll", lg: "hidden" }}
          spacing={8}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button onClick={exportUsers} minW="fit-content" colorScheme="cyan" color="white">
            Export to .csv
          </Button>

          <FormControl minW="fit-content">
            <Heading
              as="h3"
              color="cyan.500"
              fontSize={{ base: "20px", xl: "24px" }}
              textAlign="center"
            >
              Filter By Gender
            </Heading>
            <RadioGroup name="gender" color="gray.500" defaultValue={gender}>
              <Stack direction={"row"} justifyContent={"center"}>
                <Radio
                  value="All"
                  colorScheme="cyan"
                  onChange={(e) => setGender(e.target.value)}
                >
                  All
                </Radio>
                <Radio
                  value="M"
                  colorScheme="cyan"
                  onChange={(e) => setGender(e.target.value)}
                >
                  Male
                </Radio>
                <Radio
                  value="F"
                  colorScheme="cyan"
                  onChange={(e) => setGender(e.target.value)}
                >
                  Female
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl minW="fit-content">
            <Heading
              as="h3"
              color="cyan.500"
              fontSize={{ base: "20px", xl: "24px" }}
              textAlign="center"
            >
              Sort By Value
            </Heading>
            <RadioGroup name="gender" color="gray.500" defaultValue={sort}>
              <Stack direction={"row"} justifyContent={"center"}>
                <Radio
                  value="new"
                  colorScheme="cyan"
                  onChange={e => setSort(e.target.value)}
                >
                  New
                </Radio>
                <Radio
                  value="old"
                  colorScheme="cyan"
                  onChange={e => setSort(e.target.value)}
                >
                  Old
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl minW="fit-content">
            <Heading
              as="h3"
              color="cyan.500"
              fontSize={{ base: "20px", xl: "24px" }}
              textAlign="center"
            >
              Filter By Status
            </Heading>
            <RadioGroup name="status" color="gray.500" defaultValue={status}>
              <Stack direction={"row"} justifyContent={"center"}>
                <Radio
                  value="All"
                  colorScheme="cyan"
                  onChange={e => setStatus(e.target.value)}
                >
                  All
                </Radio>
                <Radio
                  value="Active"
                  colorScheme="cyan"
                  onChange={e => setStatus(e.target.value)}
                >
                  Active
                </Radio>
                <Radio
                  value="Inactive"
                  colorScheme="cyan"
                  onChange={e => setStatus(e.target.value)}
                >
                  Inactive
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Stack>
        {
          loading ? 
            <Center h='200px' alignItems='center' >
              <Spinner
                thickness='4px'
                speed='0.65s'
                color='blue.500'
                size='lg'
              />
            </Center> :
            <UserTable { ...{allUsers, deleteUser, usersArr, page, pageCount, setPage}} />
        }
      </Stack>
    </Container>
  );
};

export default Home;
