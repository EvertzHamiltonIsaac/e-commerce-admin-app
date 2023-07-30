const monthsInEnglish = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getMonthIndex(month) {
  return monthsInEnglish.indexOf(month);
}

// Function to sort the array by English months
function sortByEnglishMonths(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (getMonthIndex(array[j].month) < getMonthIndex(array[minIndex].month)) {
        minIndex = j;
      }
    }

    // Swap the current element with the minimum found
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
}

export const getConfigOfGraphic = (data) => {
  sortByEnglishMonths(data);
  return {
    data: data,
    xField: "month",
    yField: "count",
    color: ({ type }) => {
      //!Para poner colores condicionados en la grafica.
      // if(type === 'jan' || type === 'Feb'){
      //   return "#000000";
      // }
      return "#00377a";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };
};

export const getConfigOfGraphicPie = (data) => {
  sortByEnglishMonths(data);
  return {
    appendPadding: 10,
    data,
    angleField: 'count',
    colorField: 'month',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
}
