export interface GetUserByIdRequest {
  userID: string;
}

export interface GetUserByIdResponse {
  id: string;
  name: string;
  email: string;
}

export interface GetUsersByGroupIDRequest {
  groupID: string;
}

export interface GetUsersByGroupIDResponse {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}

export interface CreateUserRequest {
  name: string;
}

export interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  userID: string;
  userName: string;
  profileImageUrl: string;
  email: string;
}

export interface UpdateUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface DeleteUserRequest {
  userID: string;
}

export interface DeleteUserResponse {
  id: string;
  name: string;
  email: string;
}

export interface UserRequestTypes {
  getUserById(req: GetUserByIdRequest): Promise<GetUserByIdResponse>;
  getUsersByGroupID(
    req: GetUsersByGroupIDRequest,
  ): Promise<GetUsersByGroupIDResponse>;
  createUser(req: CreateUserRequest): Promise<CreateUserResponse>;
  updateUser(req: UpdateUserRequest): Promise<UpdateUserResponse>;
  deleteUser(req: DeleteUserRequest): Promise<DeleteUserResponse>;
}
