import { theme } from "@chakra-ui/react";

export const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2021-03-11T00:00:00.000Z",
      "2021-03-12T00:00:00.000Z",
      "2021-03-13T00:00:00.000Z",
      "2021-03-14T00:00:00.000Z",
      "2021-03-15T00:00:00.000Z",
      "2021-03-16T00:00:00.000Z",
      "2021-03-17T00:00:00.000Z",
      "2021-03-18T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

export const series = [
  { name: "series1", data: [46, 26, 37, 98, 65, 35, 86, 25] },
];