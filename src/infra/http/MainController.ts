import HttpServer from "./HttpServer";
import Usecase from "../../application/usecase/Usecase";
import axios from "axios";

export default class MainController {

	constructor (readonly httpServer: HttpServer, readonly usecase: Usecase) {
		httpServer.on("post", "/generate_invoices", async function (params: any, body: any, headers: any) {
			const input = body;
			body.userAgent = headers["user-agent"];
			body.host = headers.host;
			const output = await usecase.execute(input);
			return output;
		});
		httpServer.on("get", "/demandas", async function (params: any, body: any, headers: any) {
			const input = body;
			// const response = await axios.get("https://globo-mab.globo.com/mab/bastian-advwblt-r5:g1:desktop:homeprincipal:dinamico/choose");
			const response = await axios.get("https://g1.globo.com/");
			console.log(response);
			return JSON.stringify(response);//'output';
		});
	}
}
