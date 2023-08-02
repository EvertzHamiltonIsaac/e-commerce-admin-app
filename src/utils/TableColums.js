//! Blogs Table Columns
export const BlogsTableColumns = (SearchValue) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 190,
      // fixed: "left",
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
export const CustomersTableColumns = (SearchValue) => {
  return [
    {
      title: "First Name",
      dataIndex: "firstName",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      key: "firstName",
      // fixed: "left",
      width: 100,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return (
          String(record.firstName)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.lastName)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.email)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.phone)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.postalCode)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.address)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
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
};

//! Product Category Table Columns
export const ProductCategoryTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      width: 750,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
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

//! Blog Category Table Columns
export const BlogCategoryTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      width: 750,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
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

//! Colors Table Columns
export const ColorsTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.code.props.children);
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.code.props.children)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    
    {
      title: "Code HEX",
      dataIndex: "code",
      width: 250,
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
      width: 80,
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
      // fixed: "left",
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

//! Brand Table Columns
export const BrandTableColumns = (SearchValue) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return String(record.name)
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase());
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 80,
      key: "actions",
      fixed: "right",
    },
  ];
};

//! Product Table Columns
export const ProductTableColumns = (SearchValue) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      // fixed: "left",
      width: 150,
      sorter: (a, b) => a.title.length - b.title.length,
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return (
          String(record.title)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.category)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.brand)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.color)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 500,
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Color",
      dataIndex: "color",
      sorter: (a, b) => a.color.length - b.color.length,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: 80,
      fixed: "right",
    },
  ];
};

//! Orders Table Columns
export const OrdersTableColumns = (SearchValue = "") => {
  return [
    {
      title: "Id",
      dataIndex: "id",
      filteredValue: [SearchValue],
      onFilter: (value, record) => {
        // console.log(record.title.props.children[1]);
        return (
          String(record.orderBy)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.totalPrice)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.status)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.id)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      }  
    },
    {
      title: "Order By",
      dataIndex: "orderBy",
    },
    {
      title: "Product Count",
      dataIndex: "productCount",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Total Price After Discount",
      dataIndex: "totalPriceAfterDiscount",
      width: 200
    },
    {
      title: "Status",
      dataIndex: "status",
      
    },
    {
      title: "",
      dataIndex: "viewOrderDetails",
      width: 180
    },
  ];
};

