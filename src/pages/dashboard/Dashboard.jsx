import React from 'react'
import './style.css'
import CardHeader from '../../components/pages/dashboard/dashboardCardHeader/CardHeader'
import GraphicColumns from '../../components/pages/dashboard/dashboardGraphic/GraphicColumns'
import TableComponent from '../../components/app/table/Table'

//! Card of Header
const CardHeaderInfo = [
  {
    title: 'Total',
    amount: 1000,
    comparedText: 'compared to Abril 2021',
    porcent: 47.7
  },
  {
    title: 'Total',
    amount: 2000,
    comparedText: 'compared to Abril 2021',
    porcent: 47.7
  },
  {
    title: 'Total',
    amount: 3000,
    comparedText: 'compared to Abril 2021',
    porcent: 47.7
  },
]

//! Data for Graphic 

const dataGraphic = [
  {
    type: 'Jan',
    sales: 38,
  },
  {
    type: 'Feb',
    sales: 52,
  },
  {
    type: 'Mar',
    sales: 61,
  },
  {
    type: 'Apr',
    sales: 145,
  },
  {
    type: 'May',
    sales: 48,
  },
  {
    type: 'Jun',
    sales: 38,
  },
  {
    type: 'Jul',
    sales: 38,
  },
  {
    type: 'Aug',
    sales: 38,
  },
  {
    type: 'Sep',
    sales: 38,
  },
  {
    type: 'Oct',
    sales: 38,
  },
  {
    type: 'Nov',
    sales: 38,
  },
  {
    type: 'Dec',
    sales: 38,
  },
];

const config = {
  data: dataGraphic,
  xField: 'type',
  yField: 'sales',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle',
    // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
};

//! Data for Table 

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const dataTable = [];
for (let i = 0; i < 46; i++) {
  dataTable.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {

  return (
    <section className="dashboard">
      <section className="dashboardHeader">
        <article className="dashboardHeader__title">
          <h2>Dashboard</h2>
        </article>
        <article className="dashboardHeader__card-container">
          {
            CardHeaderInfo.map((item, index) => (
              <CardHeader
                key={index}
                title={`${item.title}`}
                amount={item.amount}
                comparedText={`${item.comparedText}`}
                porcent={item.porcent}
              />
            )) 
          }
        </article>
      </section>
      <section className='mt-4'>
        <h3 className='mb-5'>Income Statics</h3>
        <article>
          <GraphicColumns config={config}/>
        </article>
      </section>
      <section className='mt-4'>
          <h3 className='mb-4'>Recent Orders</h3>
          <article>
            <TableComponent data={dataTable} columns={columns}/>
          </article>
      </section>
    </section>
  )
}

export default Dashboard