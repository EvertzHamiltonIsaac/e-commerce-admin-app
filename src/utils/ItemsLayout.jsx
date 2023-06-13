import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AiFillDashboard } from 'react-icons/ai';
import { FaClipboardList, FaStore, FaTruckLoading, FaUsers, FaTruckMoving,FaBlogger } from "react-icons/fa";
import { MdShelves } from 'react-icons/md';
import {BiCategoryAlt} from 'react-icons/bi'
import {IoMdColorPalette} from 'react-icons/io'
export const ItemsLayout = [
  {
    key: "",
    icon: <AiFillDashboard/>,
    label: "DashBoard",
  },
  {
    key: "customers",
    icon: <FaUsers/> ,
    label: "Customers",
  },
  {
    key: "catalog",
    icon: <MdShelves />,
    label: "Catelog",
    children: [
      {
        key: "add-products",
        icon: <FaTruckLoading />,
        label: "Add Product",
      },
      {
        key: "list-product",
        icon: <FaClipboardList />,
        label: "Product List",
      },
      {
        key: "brand", //! Ojo a esta.
        icon: <FaStore />,
        label: "Brand",
      },
      {
        key: "list-brand",
        icon: <FaClipboardList />,
        label: "Bran List",
      },
      {
        key: "category",
        icon: <BiCategoryAlt />,
        label: "Category",
      },
      {
        key: "list-category",
        icon: <FaClipboardList />,
        label: "Category List",
      },
      {
        key: "color",
        icon: <IoMdColorPalette />,
        label: "Color",
      },
      {
        key: "list-color",
        icon: <FaClipboardList />,
        label: "Color List",
      },
    ]
  },
  {
    key: "orders",
    icon: <FaTruckMoving />,
    label: "Orders",
  },
  {
    key: "blog",
    icon: <FaBlogger />,
    label: "Blogs",
    children: [
      {
        key: "add-blog",
        icon: <VideoCameraOutlined />,
        label: "Add Blog",
      },
      {
        key: "list-blog",
        icon: <FaClipboardList />,
        label: "Blog List",
      },
      {
        key: "add-blog-category",
        icon: <BiCategoryAlt />,
        label: "Add Blog Category",
      },
      {
        key: "blog-category-list",
        icon: <FaClipboardList />,
        label: "Blog Category List",
      },
    ]
  },
  {
    key: "enquiries",
    icon: <FaClipboardList />,
    label: "Enquiries",
  },
];