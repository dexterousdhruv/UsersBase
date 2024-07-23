import React, { useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import {  DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons'
import { BASE_URL } from '../../services/helper'
import { useNavigate } from 'react-router-dom'
import { setUserStatus } from '../../services/Apis'
import Paginations from '../Paginations/Paginations'

const UserTable = ({ usersArr, deleteUser, allUsers, page, pageCount, setPage }) => {
const navigate = useNavigate()
  const toast = useToast({ position: "top"})
  
  const handleChange = async (id, e) => {
    const status = e.target.value
    const res = await setUserStatus(id, status)

    if (res.status === 200) {
      allUsers() 
      toast({
        title: "Success!",
        description: `Status updated successfully!`,
        status: "success",
        duration: 2500,
      });
    } else {
      toast({
        title: "Error!",
        status: "error",
        description: "Status can't be updated."
      })
    }
  }

  return (
    <>
      <TableContainer>
        <Table size='sm' variant='striped' colorScheme='cyan' mb={4}>
          <Thead >
            <Tr>
              <Th>Id</Th>
              <Th>FullName</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Status</Th>
              <Th>Profile</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              usersArr.length ? usersArr.map((user, i) => (
                <Tr key={user._id}>
                  <Td >{i + 1 + (page - 1) * 4 }</Td>
                  <Td>{ user.firstName + " " + user.lastName }</Td>
                  <Td>{ user.email }</Td>
                  <Td>{ user.gender }</Td>
                  <Td>
                    <Select
                      w='14ch'
                      name="status"
                      border='none'
                      outline='none'
                      defaultValue={user.status}
                      onChange={(e) => handleChange(user._id, e) }
                      >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </Td>
                  <Td>
                    <Avatar src={`${BASE_URL}/uploads/${user.profile}`} />
                  </Td>
                  <Td>
                    <Menu>
                      <MenuButton >
                        <BsThreeDotsVertical/>
                      </MenuButton>
                      <MenuList>
                        <MenuItem onClick={() => navigate(`/userprofile/${user._id}`) } >
                          <HStack>
                            <ViewIcon  color='cyan.500' />
                            <Text>View</Text>
                          </HStack>
                        </MenuItem>
                        <MenuItem onClick={() => navigate(`/edit/${user._id}`) }>
                          <HStack>
                            <EditIcon  color='cyan.500' />
                            <Text>Edit</Text>
                          </HStack>
                        </MenuItem>
                        <MenuItem onClick={() => deleteUser(user._id)}>
                          <HStack>
                            <DeleteIcon color='cyan.500' />
                            <Text>Delete</Text>
                          </HStack>
                        </MenuItem>
                      
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              )) : ""
            }
          </Tbody>
        </Table >
        <Paginations { ...{ page, pageCount, setPage }} />
      </TableContainer>
    </>
  )
}

export default UserTable