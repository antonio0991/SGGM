const { route } = require("../config/router");
let database = require("../data/database");
const urlBase = "/perfil";

module.exports = (router) => {
	router.get(urlBase, (req, res) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(database);
	});
	router.get(urlBase + "/:id", (req, res) => {
		const id = req.params.id;
		const book = database.find((item) => item.id == id);
		res.json(book);
	});

	router.post(urlBase, (req, res) => {
		const newPerfil = {
			id: database.length + 1,
			nome: req.body.nome,
			valor: req.body.valor,
			data: req.body.data,
		};

		database.push(newPerfil);
		res.status(200).send();
	});

	router.put(urlBase + "/:id", (req, res) => {
		const id = req.params.id;

		const perfil = database.find((item) => item.id === +id);

		(perfil.nome = req.body.nome),
			(perfil.valor = req.body.valor),
			(perfil.data = req.body.data);

		res.json(perfil);
	});

	router.delete(urlBase + "/:id", (req, res) => {
		const novaLista = database.filter((item) => item.id != req.params.id);
		database = novaLista;
		res.status(200).send();
	});
};
