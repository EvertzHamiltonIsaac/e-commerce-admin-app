//! Blogs Table Columns
export const BlogsTableColumns = [
  {
    title: "Title",
    dataIndex: "title",
    value: "title",
    width: 190,
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Dislikes",
    dataIndex: "dislikes",
  },
  {
    title: "Likes",
    dataIndex: "likes",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 80,
    fixed: "right",
  },
];

//! Customers Table Columns
export const CustomersTableColumns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    key: 'firstName',
    fixed: 'left',
    width: 100
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.lastName.length - b.lastName.length,
    key: 'lastName',
    // fixed: 'left',
    width: 110,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 160
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 110
  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
    width: 90
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 300
  },
];

//! Category Table Columns
export const CategoryTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 150,
  },
];

//! Colors Table Columns
export const ColorsTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Code HEX",
    dataIndex: "code",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 150,
  },
];

//!Coupons Table Columns
export const CouponsTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 150,
    key: "actions",
    fixed: "right",
  },
];

//! Enquiries Table Columns

export const EnquiriesTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: 'name',
    fixed: 'left',
    width: 150
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  // {
  //   title: "Phone",
  //   dataIndex: "phone",
  // },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: 'actions',
    fixed: 'right',
    width: 150
  },
];


