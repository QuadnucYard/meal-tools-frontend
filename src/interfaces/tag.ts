export interface Tag {
  id: int;
  name: string;
  create_time: string;
  update_time: string;
}

export interface TagCreate {
  name: string;
}

export interface TagUpdate {
  id: int;
  name: string;
}
