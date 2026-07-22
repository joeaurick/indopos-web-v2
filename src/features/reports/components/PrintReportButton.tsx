"use client";

import { useReportStore } from "../store/report.store";

export function PrintReportButton() {
  const history = useReportStore(
    (state) => state.data.history
  );

  const summary = useReportStore(
    (state) => state.data.summary
  );

  const business = useReportStore(
    (state) => state.data.business
  );

  function printReport() {
    const win = window.open(
      "",
      "_blank",
      "width=1000,height=700"
    );

    if (!win) return;

    const rows = history
      .map(
        (item) => `
<tr>
<td>${new Date(
          item.created_at
        ).toLocaleDateString("id-ID")}</td>
<td>${item.type}</td>
<td>${item.invoice}</td>
<td>${item.status}</td>
<td style="text-align:right">
Rp ${item.total.toLocaleString("id-ID")}
</td>
</tr>
`
      )
      .join("");

    win.document.write(`
<html>
<head>
<title>Laporan - ${business.name}</title>

<style>

body{
font-family:Arial;
padding:40px;
color:#111827;
}

.header{
margin-bottom:24px;
}

.business-name{
font-size:28px;
font-weight:700;
margin-bottom:6px;
}

.business-info{
font-size:13px;
line-height:1.7;
color:#475467;
}

.report-title{
font-size:18px;
font-weight:700;
margin-top:20px;
margin-bottom:8px;
}

.print-date{
font-size:12px;
color:#667085;
margin-bottom:18px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th,td{
border:1px solid #d0d5dd;
padding:10px;
font-size:12px;
}

th{
background:#f3f4f6;
text-align:left;
}

.summary{
margin-top:20px;
line-height:1.9;
font-size:14px;
}

.summary-row{
display:flex;
justify-content:space-between;
max-width:420px;
}

.summary-row strong{
min-width:140px;
display:inline-block;
}

.footer{
margin-top:28px;
padding-top:12px;
border-top:1px dashed #d0d5dd;
font-size:12px;
color:#667085;
}

@media print{

body{
padding:24px;
}

button{
display:none;
}

}

</style>

</head>

<body>

<div class="header">

<div class="business-name">
${business.name || "IndoPOS"}
</div>

<div class="business-info">

${business.address ? `<div>${business.address}</div>` : ""}

${business.phone ? `<div>Telp: ${business.phone}</div>` : ""}

${business.email ? `<div>Email: ${business.email}</div>` : ""}

</div>

</div>

<div class="report-title">
Laporan Transaksi
</div>

<div class="print-date">
Tanggal Cetak: ${new Date().toLocaleString("id-ID")}
</div>

<div class="summary">

<div class="summary-row">
<strong>Total Income</strong>
<span>Rp ${summary.totalIncome.toLocaleString("id-ID")}</span>
</div>

<div class="summary-row">
<strong>Total Expense</strong>
<span>Rp ${summary.totalExpense.toLocaleString("id-ID")}</span>
</div>

<div class="summary-row">
<strong>Gross Profit</strong>
<span>Rp ${summary.grossProfit.toLocaleString("id-ID")}</span>
</div>

<div class="summary-row">
<strong>Net Profit</strong>
<span>Rp ${summary.netProfit.toLocaleString("id-ID")}</span>
</div>

</div>

<table>

<thead>

<tr>

<th>Tanggal</th>

<th>Jenis</th>

<th>Invoice</th>

<th>Status</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>

<div class="footer">
${business.receipt_footer || "Terima kasih telah menggunakan IndoPOS."}
</div>

<script>

window.onload=function(){

window.print();

}

</script>

</body>

</html>
`);

    win.document.close();
  }

  return (
    <button
      onClick={printReport}
      className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-800"
    >
      Print
    </button>
  );
}