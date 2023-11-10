interface MenuItem {
  id: string;
  label: string;
  path: string;
}

interface BlogFormData {
  title: string;
  description: string;
  image: string;
  category: string;
  userid: string;
  userimage: string;
  username: string;
}

interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  userid: string;
  userimage: string;
  comments: string[];
  username: string | null;
}

interface CategoryOption {
  value: string;
  label: string;
}
