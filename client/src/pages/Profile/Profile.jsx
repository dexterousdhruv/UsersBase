import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MdEmail, MdPerson, MdPerson2, MdOutlineEditCalendar, MdOutlinePhoneAndroid } from "react-icons/md";

import { IoIosPin } from "react-icons/io";
import { getUserProfile } from "../../services/Apis";
import { Card, CardBody, Center, Heading, Box, Avatar, VStack, List, ListItem, ListIcon, Spinner } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../services/helper";
import moment from 'moment'

const Profile = () => {
  const { id } = useParams()
  const [user, setUser] = useState({}
  );


  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const res = await getUserProfile(id)
    
    if (res.status === 200) {
      setUser(res.data) 
      setTimeout(() => setLoading(false), 1200);
    }
    else
      console.log('Error!')
  }
  
  const iconValues = {
    email: MdEmail,
    mobile: MdOutlinePhoneAndroid,
    gender: user.gender === "M"  ? MdPerson : MdPerson2,
    location: IoIosPin,
    status: user.status === "Active" ? ViewIcon : ViewOffIcon,
    createdAt: MdOutlineEditCalendar,
    updatedAt: EditIcon,
  }
  
  
  useEffect(() => {
    getUser()
  }, [id]);
  
  return (
    <Box mt={6}>
      <Heading
        as="h2"
        fontSize={["lg", "2xl", "3xl"]}
        textAlign="center"
        color="gray.700"
        mb={["30px", "40px"]}
      >
        User Details
      </Heading>

      <Center>
        {
          loading ? (
            <Spinner
              thickness='4px'
              speed='0.65s'
              color='blue.500'
              size='lg'
              mt="10rem"
            /> 
          ) : (
            <Card m={4} w="xl" shadow='md' align="center" borderTop='8px solid' borderColor='cyan.400'>
              <CardBody>
                <Center>
                  <Avatar src={user.profile ? `${BASE_URL}/uploads/${user.profile}`: "/user-avatar.png"} w="60px" h="60px" mb={5} />
                </Center>
    
                <VStack spacing={4}>
                  <Heading
                    color={'cyan.500'}
                    letterSpacing={".2px"}
                    fontWeight={"500"}
                    fontSize={["xl", "2xl"]}
                  >
                    { user.firstName + " " + user.lastName }
                  </Heading>
                  <List spacing={2.5}>
                    {
                      user ? Object.entries(user).map(([key, value]) => {
                        if (key === 'createdAt' || key === 'updatedAt') {
                          value = moment(String(value)).format('DD-MM-YYYY')
                        }
                        if (key !== "firstName" && key !== 'lastName' && key !== "_id" && key !== 'profile') {
                          return (
                            <ListItem
                              key={key}
                              align={"center"}
                              letterSpacing={".3px"}
                              color={"gray.400"}
                              fontSize={["sm", "md", "lg"]}
                            >
                              <ListIcon
                                boxSize={["15px", '22px']}
                                color={"cyan.400"}
                                as={iconValues[key]}
                                mr='10px'
                              />
                              { value }
                            </ListItem>
                          )
                        }
                      }) : ""
                    }
                  </List>
                </VStack>
              </CardBody>
            </Card>
          )
        }
      </Center>
    </Box>
  );
};

export default Profile;
