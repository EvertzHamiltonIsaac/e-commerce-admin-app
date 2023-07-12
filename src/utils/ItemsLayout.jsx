import { UploadOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { AiFillDashboard, AiFillPlusCircle } from 'react-icons/ai';
import { FaClipboardList, FaStore, FaTruckLoading, FaUsers, FaTruckMoving,FaBlogger } from "react-icons/fa";
import { MdShelves } from 'react-icons/md';
import {BiCategoryAlt} from 'react-icons/bi'
import {IoMdColorPalette} from 'react-icons/io'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketSimple } from "@fortawesome/free-solid-svg-icons";

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
      {
        key: "brand", //! Ojo a esta.
        icon: <FaStore />,
        label: "Brand",
      },
      {
        key: "category",
        icon: <BiCategoryAlt />,
        label: "Category",
      },
      {
        key: "color",
        icon: <IoMdColorPalette />,
        label: "Color",
      },
    ]
  },
  {
    key: "coupons",
    icon: <FontAwesomeIcon icon={faTicketSimple}/> ,
    label: "Coupons",
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
  },
  {
    key: "enquiries",
    icon: <FaClipboardList />,
    label: "Enquiries",
  },
];