//! Blogs Table Columns
export const BlogsTableColumns = (SearchValue) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 190,
      fixed: "left",
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return (
          String(record.title.props.children[1])
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.category)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
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
};

//! Customers Table Columns
export const CustomersTableColumns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    key: "firstName",
    fixed: "left",
    width: 100,
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.lastName.length - b.lastName.length,
    key: "lastName",
    // fixed: 'left',
    width: 110,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 160,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 110,
  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
    width: 90,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 300,
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
export const CouponsTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.expiry)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
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
};

//! Enquiries Table Columns
export const EnquiriesTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      width: 150,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.email)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.status)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 150,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      width: 80,
    },
  ];
};
