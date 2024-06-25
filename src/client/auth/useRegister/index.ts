import { api } from "@/client";
import { CreateUser } from "../types";
import { useMutation } from "react-query";

async function postUser(payload: CreateUser){
  return api.post ('/auth/register', payload).then((res) => res.data)
}

export function useRegister(){
  const { mutate: createUser, ...rest } = useMutation({
    mutationFn: postUser
  })

  return{
    createUser,
    ...rest
  }
}