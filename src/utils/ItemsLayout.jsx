import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from 'react-icons/ai';

export const ItemsLayout = [
  {
    key: "",
    icon: <AiOutlineDashboard/>,
    label: "DashBoard",
  },
  {
    key: "customers",
    icon: <VideoCameraOutlined />,
    label: "Customers",
  },
  {
    key: "catalog",
    icon: <UploadOutlined />,
    label: "Catelog",
    children: [
      {
        key: "products",
        icon: <VideoCameraOutlined />,
        label: "Add Product",
      },
      {
        key: "list-product",
        icon: <VideoCameraOutlined />,
        label: "Product List",
      },
      {
        key: "brand",
        icon: <VideoCameraOutlined />,
        label: "Brand",
      },
      {
        key: "list-brand",
        icon: <VideoCameraOutlined />,
        label: "Bran List",
      },
      {
        key: "category",
        icon: <VideoCameraOutlined />,
        label: "Category",
      },
      {
        key: "list-category",
        icon: <VideoCameraOutlined />,
        label: "Category List",
      },
      {
        key: "color",
        icon: <VideoCameraOutlined />,
        label: "Color",
      },
      {
        key: "list-color",
        icon: <VideoCameraOutlined />,
        label: "Color List",
      },
    ]
  },
  {
    key: "orders",
    icon: <VideoCameraOutlined />,
    label: "Orders",
  },
  {
    key: "blog",
    icon: <UploadOutlined />,
    label: "Blogs",
    children: [
      {
        key: "products",
        icon: <VideoCameraOutlined />,
        label: "Add Product",
      },
      {
        key: "list-product",
        icon: <VideoCameraOutlined />,
        label: "Product List",
      },
      {
        key: "brand",
        icon: <VideoCameraOutlined />,
        label: "Brand",
      },
      {
        key: "list-brand",
        icon: <VideoCameraOutlined />,
        label: "Bran List",
      },
      {
        key: "category",
        icon: <VideoCameraOutlined />,
        label: "Category",
      },
      {
        key: "list-category",
        icon: <VideoCameraOutlined />,
        label: "Category List",
      },
      {
        key: "color",
        icon: <VideoCameraOutlined />,
        label: "Color",
      },
      {
        key: "list-color",
        icon: <VideoCameraOutlined />,
        label: "Color List",
      },
    ]
  },
  {
    key: "enquiries",
    icon: <VideoCameraOutlined />,
    label: "Enquiries",
  },
];