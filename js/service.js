//localhost:8080/gastos
const baseUrlAPI = "localhost:8080/gastos";

$(document).ready(() => {
	getData();
	$("#valor").mask("#,##0.00", options);
	document.getElementById("data").value = formatDate(new Date());
});

let mockData = [
	{
		id: 96,
		nome: "Centrexin",
		valor: 0.24,
		data: "1993-12-03T03:00:54.115Z",
	},
	{
		id: 78,
		nome: "Orbalix",
		valor: 5.89,
		data: "1984-06-05T04:41:26.067Z",
	},
	{
		id: 95,
		nome: "Emergent",
		valor: 8.37,
		data: "1996-05-07T12:47:02.497Z",
	},
	{
		id: 21,
		nome: "Balooba",
		valor: 6.75,
		data: "2018-03-25T10:31:35.529Z",
	},
	{
		id: 4,
		nome: "Chorizon",
		valor: 1.05,
		data: "1993-06-10T19:31:14.797Z",
	},
	{
		id: 85,
		nome: "Retrack",
		valor: 6.72,
		data: "1977-08-02T00:30:58.902Z",
	},
];

function formatDate(date, isDMY = false) {
	const dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	const mm =
		date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1;
	const yyyy = date.getFullYear();
	return isDMY ? dd + "/" + mm + "/" + yyyy : yyyy + "-" + mm + "-" + dd;
}

function getData() {
	// $.ajax({
	// 	url: baseUrlAPI,
	// 	type: "GET",
	// 	beforeSend: function () {
	// 		console.log("Carregando....");
	// 	},
	// })
	// 	.done(function (data) {
	// 		let gastos = formatGastos(data);
	// 		console.log(gastos);
	// 		showGastos(gastos);
	// 	})
	// 	.fail(function (msg) {
	// 		const error = JSON.parse(msg.responseText);
	// 		console.log(error);
	// 	});

	let gastos = formatGastos(mockData);
	showGastos(gastos);
}

function showGastos(gastos) {
	gastos.forEach((gasto) => {
		const id = `<h4>${gasto.id}</h4>`;
		const nome = `<h4>${gasto.nome}</h4>`;
		const valor = `<h4>R$${gasto.valor}</h4>`;
		const data = `<h4>${formatDate(new Date(gasto.data), true)}</h4>`;

		$("#gasto-data").append(
			"<tr>" +
				"<td>" +
				id +
				"</td>" +
				"<td>" +
				nome +
				"</td>" +
				"<td>" +
				valor +
				"</td>" +
				"<td>" +
				data +
				"</td>" +
				"<td>" +
				`<div class="d-grid gap-2 d-md-flex justify-content-md-end">
					<button onClick="editGasto(${gasto.id}, \'${gasto.nome}\', ${gasto.valor}, \'${gasto.data}\')" data-bs-toggle="modal"
					data-bs-target="#myModal" type="button" class="btn btn-warning">Editar</button> <button onClick="deleteGasto(${gasto.id})" type="button" class="btn btn-danger">Deletar</button>
				</div>` +
				"</td>" +
				"</tr>"
		);
	});
}

function formatGastos(data) {
	data.sort(function (a, b) {
		return new Date(b.data) - new Date(a.data);
	});
	return data.map(getGasto);
}

function getGasto(oldGasto) {
	const gasto = {
		id: oldGasto.id,
		nome: oldGasto.nome,
		valor: oldGasto.valor,
		data: oldGasto.data,
	};
	return gasto;
}

function novoGasto() {
	document.getElementById("nome").value = "";
	document.getElementById("valor").value = 0.01;
	document.getElementById("data").value = formatDate(new Date());
}

function deleteGasto(id) {
	// $.ajax({
	// 	url: baseUrlAPI,
	// 	type: "DELETE",
	// 	beforeSend: function () {
	// 		console.log("Carregando....");
	// 	},
	// })
	// 	.done(function (data) {
	// 		let gastos = formatGastos(mockData);
	// 		showGastos(gastos);
	// 	})
	// 	.fail(function (msg) {
	// 		const error = JSON.parse(msg.responseText);
	// 		console.log(error);
	// 	});
	console.log(mockData);
	mockData = mockData.filter((gasto) => gasto.id !== id);
	let gastos = formatGastos(mockData);
	$("#gasto-data").replaceWith(`<tbody id="gasto-data"></tbody>`);
	showGastos(gastos);
}

function editGasto(id, nome, valor, data) {
	document.getElementById("nome").value = nome;
	document.getElementById("valor").value = valor;
	document.getElementById("data").value = formatDate(new Date(data));
	// $.ajax({
	// 	url: baseUrlAPI,
	// 	type: "PUT",
	// 	beforeSend: function () {
	// 		console.log("Carregando....");
	// 	},
	// })
	// 	.done(function (data) {
	// 		let gastos = formatGastos(mockData);
	// 		showGastos(gastos);
	// 	})
	// 	.fail(function (msg) {
	// 		const error = JSON.parse(msg.responseText);
	// 		console.log(error);
	// 	});
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	} else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		console.log(collapse);
		range.moveEnd("character", selectionEnd);
		range.moveStart("character", selectionStart);
		range.select();
	}
}

function setCaretToPos(input, pos) {
	setSelectionRange(input, pos, pos);
}

$("#valor").click(function () {
	var inputLength = $("#valor").val().length;
	setCaretToPos($("#valor")[0], inputLength);
});

var options = {
	onKeyPress: function (cep, e, field, options) {
		if (cep.length <= 6) {
			var inputVal = parseFloat(cep);
			jQuery("#money").val(inputVal.toFixed(2));
		}

		// setCaretToPos(jQuery('#money')[0], 4);

		var masks = ["#,##0.00", "0.00"];
		mask = cep == 0 ? masks[1] : masks[0];
		$("#money").mask(mask, options);
	},
	reverse: true,
};
