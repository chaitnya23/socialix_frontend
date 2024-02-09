import { useQuery } from "react-query"
import { getAllPosts } from "../post-api-calls"
import { getUser, getUserRequests, searchUser, getPopularPosts, getNewPeople, verifyUser, getUserFriends } from "../user-api-calls"
import { routes } from "../../utils";


export const useVerifyUser = (setuser,navigate) => {

  const token = localStorage.getItem('token');

  return useQuery(["verify-user"], ()=>verifyUser(token), {
    retry:0,
    enabled:!!token,
    onSuccess: (data) => {
      setuser(data);
    },
    onError:()=>{
      navigate(routes.auth);
    }
  })
}

export const useGetPosts = () => {

  return useQuery("posts", getAllPosts, {
    staleTime: 1000 * 5 * 60,
  })
}


export const useSearchUser = (searchParam) => {
  return useQuery(["search", searchParam], () => {
    return searchUser(searchParam);
  }, {
    staleTime: 0
  });
}

export const useGetRequests = (id) => {
  return useQuery(["requests", id], () => {
    return getUserRequests(id);
  }, {
    enabled: !!id
  });
}


export const useGetUser = (id) => {
  return useQuery(["user",id], ()=>getUser(id));
}

export const useGetPolularPosts = () => {
  return useQuery(["popular-posts"], getPopularPosts)
}

export const useGetNewPeople = (id) => {
  return useQuery(["get-new-people", id], () => getNewPeople(id));
}
