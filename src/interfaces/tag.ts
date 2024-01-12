interface TagBase {
  name: string;
  category?: string;
  color: string;
}

export interface Tag extends TagBase {
  id: int;
  create_time: string;
  update_time: string;
}

export interface TagCreate extends TagBase {}

export interface TagUpdate extends TagBase {
  id: int;
}
