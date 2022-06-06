//localhost:8080/gastos
const baseUrlAPI = "http://localhost:3000/perfil";

$(document).ready(() => {
	getData();
	$("#valor").mask("#,##0.00", options);
	document.getElementById("data").value = formatDate(new Date());
});

function randomIntFromInterval(min, max) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

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
	$.ajax({
		url: baseUrlAPI,
		headers: {
			"Content-Type": "application/json",
		},
		type: "GET",
		dataType: "json",
		beforeSend: function () {
			console.log("Carregando....");
		},
	})
		.done(function (data) {
			let gastos = formatGastos(data);
			console.log(data);
			showGastos(gastos);
		})
		.fail(function (msg) {
			const error = JSON.parse(msg.responseText);
			console.log(error);
		});

	// let gastos = formatGastos(mockData);
	// showGastos(gastos);
}

function showGastos(gastos) {
	$("#gasto-data").replaceWith(`<tbody id="gasto-data"></tbody>`);
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
					<button onClick="editGasto(${gasto.id}, \'${gasto.nome}\', ${gasto.valor}, \'${gasto.data}\')" type="button" class="btn btn-warning me-2">Editar</button> <button onClick="deleteGasto(${gasto.id})" type="button" class="btn btn-danger">Deletar</button>
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
	document.getElementById("valor").value = "";
	document.getElementById("data").value = formatDate(new Date());
	document
		.getElementById("submitButton")
		.addEventListener("click", function (e) {
			submitGasto();
			const old_element = document.getElementById("submitButton");
			const new_element = old_element.cloneNode(true);
			old_element.parentNode.replaceChild(new_element, old_element);
		});
}

function submitGasto(id) {
	const gasto = {
		nome: document.getElementById("nome").value,
		valor: parseFloat(
			document.getElementById("valor").value.replace(",", "")
		),
		data: new Date(document.getElementById("data").value),
	};
	if (id) {
		$.ajax({
			url: baseUrlAPI + "/" + id,
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(gasto),
			beforeSend: function () {
				console.log("Carregando....");
			},
		})
			.done(function (data) {
				getData();
			})
			.fail(function (msg) {
				const error = JSON.parse(msg.responseText);
				console.log(error);
			});
	} else {
		$.ajax({
			url: baseUrlAPI,
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(gasto),
			beforeSend: function () {
				console.log("Carregando....");
			},
		})
			.done(function (data) {
				getData();
			})
			.fail(function (msg) {
				const error = JSON.parse(msg.responseText);
				console.log(error);
			});
	}
}

function deleteGasto(id) {
	$.ajax({
		url: baseUrlAPI + "/" + id,
		type: "DELETE",
		beforeSend: function () {
			console.log("Carregando....");
		},
	})
		.done(function (data) {
			getData();
		})
		.fail(function (msg) {
			const error = JSON.parse(msg.responseText);
			console.log(error);
		});
}

function editGasto(id, nome, valor, data) {
	document.getElementById("nome").value = nome;
	document.getElementById("valor").value = valor;
	document.getElementById("data").value = formatDate(new Date(data));
	submitButton = document.getElementById("submitButton");
	console.log(submitButton);
	submitButton.addEventListener("click", function (e) {
		submitGasto(id);
		const old_element = document.getElementById("submitButton");
		const new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
	});
	$("#myModal").modal("toggle");

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
			jQuery("#valor").val(inputVal.toFixed(2));
		}

		// setCaretToPos(jQuery('#money')[0], 4);

		var masks = ["#,##0.00", "0.00"];
		mask = cep == 0 ? masks[1] : masks[0];
		$("#valor").mask(mask, options);
	},
	reverse: true,
};
