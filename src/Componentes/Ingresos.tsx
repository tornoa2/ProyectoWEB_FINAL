import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { mes: "Enero", ganancia: 11000 },
  { mes: "Febrero", ganancia: 7500 },
  { mes: "Marzo", ganancia: 7700 },
  { mes: "Abril", ganancia: 11500 },
  { mes: "Mayo", ganancia: 11400 },
  { mes: "Junio", ganancia: 7800 },
  { mes: "Julio", ganancia: 7900 },
  { mes: "Agosto", ganancia: 10000 },
  { mes: "Septiembre", ganancia: 8200 },
  { mes: "Octubre", ganancia: 8100 },
  { mes: "Noviembre", ganancia: 9900 },
  { mes: "Diciembre", ganancia: 8500 },
];

export default function IngresosMensuales() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="ganancia" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
