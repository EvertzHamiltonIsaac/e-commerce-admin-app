import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AiFillDashboard, AiFillPlusCircle } from 'react-icons/ai';
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
        key: "products",
        icon: <FaTruckLoading />,
        label: "Products",
      },
      // {
      //   key: "list-product",
      //   icon: <FaClipboardList />,
      //   label: "Product List",
      // },
      {
        key: "brand", //! Ojo a esta.
        icon: <FaStore />,
        label: "Brand",
      },
      // {
      //   key: "list-brand",
      //   icon: <FaClipboardList />,
      //   label: "Brand List",
      // },
      {
        key: "category",
        icon: <BiCategoryAlt />,
        label: "Category",
      },
      // {
      //   key: "list-category",
      //   icon: <FaClipboardList />,
      //   label: "Category List",
      // },
      {
        key: "color",
        icon: <IoMdColorPalette />,
        label: "Color",
      },
      // {
      //   key: "list-color",
      //   icon: <FaClipboardList />,
      //   label: "Color List",
      // },
    ]
  },
  {
    key: "orders",
    icon: <FaTruckMoving />,
    label: "Orders",
  },
  {
    key: "blogs",
    icon: <FaBlogger />,
    label: "Blogs",
    // children: [
    //   // {
    //   //   key: "blog",
    //   //   icon: <FaBlogger />,
    //   //   label: "Blogs",
    //   // },
    //   // {
    //   //   key: "list-blog",
    //   //   icon: <FaClipboardList />,
    //   //   label: "Blog List",
    //   // },
    //   // {
    //   //   key: "blog-category",
    //   //   icon: <BiCategoryAlt />,
    //   //   label: "Blog Categories",
    //   // },
    //   // {
    //   //   key: "blog-category-list",
    //   //   icon: <FaClipboardList />,
    //   //   label: "Blog Category List",
    //   // },
    // ]
  },
  {
    key: "enquiries",
    icon: <FaClipboardList />,
    label: "Enquiries",
  },
];