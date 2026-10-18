const DEMO_DATOS = {
  "Banco A": {
    "resumen": {
      "Conciliado": 3,
      "Diferencia de importe": 1,
      "Solo en sistema": 2,
      "Solo en banco": 1,
      "total_sistema": "320.00",
      "total_banco": "315.00",
      "posterior_al_corte": "40.00"
    },
    "filas": [
      {
        "cliente_id": "DEMO-A01",
        "referencia": "101",
        "importe_sistema": "100.00",
        "importe_banco": "100.00",
        "diferencia": "0.00",
        "estado": "Conciliado"
      },
      {
        "cliente_id": "DEMO-A02",
        "referencia": "102",
        "importe_sistema": "50.00",
        "importe_banco": "50.00",
        "diferencia": "0.00",
        "estado": "Conciliado"
      },
      {
        "cliente_id": "DEMO-A03",
        "referencia": "103",
        "importe_sistema": "80.00",
        "importe_banco": "75.00",
        "diferencia": "5.00",
        "estado": "Diferencia de importe"
      },
      {
        "cliente_id": "DEMO-A04",
        "referencia": "104",
        "importe_sistema": "40.00",
        "importe_banco": "",
        "diferencia": "40.00",
        "estado": "Solo en sistema"
      },
      {
        "cliente_id": "DEMO-A05",
        "referencia": "105",
        "importe_sistema": "20.00",
        "importe_banco": "",
        "diferencia": "20.00",
        "estado": "Solo en sistema"
      },
      {
        "cliente_id": "DEMO-A06",
        "referencia": "101",
        "importe_sistema": "30.00",
        "importe_banco": "30.00",
        "diferencia": "0.00",
        "estado": "Conciliado"
      },
      {
        "cliente_id": "DEMO-A11",
        "referencia": "106",
        "importe_sistema": "",
        "importe_banco": "60.00",
        "diferencia": "-60.00",
        "estado": "Solo en banco"
      }
    ],
    "servicios": [
      {
        "cliente_id": "DEMO-A04",
        "referencia": "104",
        "servicio": "Servicio ficticio A",
        "importe": "40.00"
      }
    ]
  },
  "Banco B": {
    "resumen": {
      "Conciliado": 2,
      "Diferencia de importe": 1,
      "Solo en sistema": 1,
      "Solo en banco": 1,
      "total_sistema": "310.00",
      "total_banco": "305.00",
      "posterior_al_corte": "20.00"
    },
    "filas": [
      {
        "cliente_id": "DEMO-B01",
        "referencia": "201",
        "importe_sistema": "120.00",
        "importe_banco": "120.00",
        "diferencia": "0.00",
        "estado": "Conciliado"
      },
      {
        "cliente_id": "DEMO-B02",
        "referencia": "202",
        "importe_sistema": "65.00",
        "importe_banco": "65.00",
        "diferencia": "0.00",
        "estado": "Conciliado"
      },
      {
        "cliente_id": "DEMO-B03",
        "referencia": "203",
        "importe_sistema": "90.00",
        "importe_banco": "95.00",
        "diferencia": "-5.00",
        "estado": "Diferencia de importe"
      },
      {
        "cliente_id": "DEMO-B04",
        "referencia": "204",
        "importe_sistema": "35.00",
        "importe_banco": "",
        "diferencia": "35.00",
        "estado": "Solo en sistema"
      },
      {
        "cliente_id": "DEMO-B05",
        "referencia": "205",
        "importe_sistema": "",
        "importe_banco": "25.00",
        "diferencia": "-25.00",
        "estado": "Solo en banco"
      }
    ],
    "servicios": [
      {
        "cliente_id": "DEMO-B04",
        "referencia": "204",
        "servicio": "Servicio ficticio B",
        "importe": "35.00"
      }
    ]
  }
};
