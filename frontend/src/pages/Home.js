import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

export const Home = () => {
	return (
		<div>
			<Jumbotron fluid>
				<Container fluid>
					<h1 className="display-3">YOYOY</h1>
					<p className="lead"><b>Look Below</b> 🡇 Check out the logs, you can get to them through the <b>NavBar</b> uptop 🡅 :)) ✨</p>
				</Container>
			</Jumbotron>
			<Report></Report>	
		</div>
	)
}

const Report = () => {
	return(
		<div><h2><strong>INFORMATION SYSTEMS</strong></h2>
		<p>Integrated Masters in Informatics and Computing Engineering</p>
		<p>2020/2021</p>
		<p><strong>&nbsp;</strong></p>
		<p><strong>&nbsp;</strong></p>
		<p><strong>Project Specification</strong></p>
		<p>Project ID P1 - Intercompany&nbsp;</p>
		<p>&nbsp;</p>
		<p>November 2020</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>Supervisor: Professor Lu&iacute;s Barros</p>
		<p><strong>GROUP B</strong></p>
		<p><strong>Bernardo Oliveira Teixeira Santos</strong> - up201504711@fe.up.pt</p>
		<p><strong>Jo&atilde;o Nuno Carvalho de Matos</strong> - up201705471@fe.up.pt</p>
		<p><strong>Jo&atilde;o Ruano Neto Veiga de Macedo</strong> - up201704464@fe.up.pt</p>
		<p><strong>Maria Marta Nunes Andrade Lobo dos Santos</strong> - up201604530@fe.up.pt</p>
		<p><strong>Miguel Rodrigues Pires</strong> - up201406989@fe.up.pt</p>
		<p>&nbsp;</p>
		<h1>1. Project Overview</h1>
		<p>The present document provides insights on the development process of the course project for Information Systems (SINF - EIC0040) of the Integrated Masters in Informatics and Computing Engineering (MIEIC) at the Faculty of Engineering of the University of Porto (FEUP).</p>
		<p>The project in question is based on a fundamental pillar: comfort for the customer. Thus, we are specifying an illustrative model of two companies, one which bottles and sells beverages and one other that sells bottles, and automating the business interaction between them with an integration with PRIMAVERA's ERP software.</p>
		<p>The aim of this project is to develop an interface that allows the companies to define a set of reactive processes that are integrated with the <em>Jasmin</em> platform: that is, processes that are executed <em>in response</em> to specific user-driven events, such as an invoice being generated or new stock being registered, and admit the concept of continuations, which define a sequence of trigger-process-stop steps within a single automated process.</p>
		<p>To achieve this goal our work is divided in two phases. In this first, planning phase, we have modeled a set of business processes between the two aforementioned companies, and have identified, developed and mocked up the core views and functionalities needed to implement our product.</p>
		<p>In this project we will use <em>Jasmin</em> to deal with all the data and processes surrounding transactions, inventory and information about each product. This information will be accessible after establishing a communication layer between <em>Jasmin</em> and the backend of our project.</p>
		<p>For the validation of the project, as said above, we will use two ficticious companies both utilizing <em>Jasmin. </em>These companies, <em>KSede</em> and <em>BottleFlip </em>interact in two key ways, as described by the BPMN diagrams present in section 4 of this report. KSede buys bottles from BottleFlip for the production of their products, various bottled beverages, and <em>BottleFlip</em> rents their factory space from<em> KSede, </em>who owns the building where they both operate.</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<h1>2. Features</h1>
		<h2>2.1. Process List View</h2>
		<ul>
		<li><strong>Process visualization</strong> - list of the processes established between the two selected companies represented on a table with their IDs, description and respective timestamp.</li>
		<li><strong>Add new process</strong> - button that links to New Process View, which allows the user to create a new process.</li>
		<li><strong>Process details</strong> - each ID links to their respective details.</li>
		</ul>
		<h2>2.2. Process Creation / Editing View</h2>
		<ul>
		<li><strong>Edit</strong> - button that allows the user to edit a process.</li>
		<li><strong>Delete</strong> - option to delete the process and return to Processes View.</li>
		<li><strong>Confirm</strong> - option to confirm the new process and return to Processes View.</li>
		</ul>
		<h2>2.3. Process Log List View</h2>
		<ul>
		<li><strong>Process status</strong> - table representing the status (success/pending/error) of process instances that are currently running or have recently run.</li>
		</ul>
		<h2>2.4. Master Data Synchronization Management View</h2>
		<ul>
		<li><strong>Company items</strong> - tables representing the IDs and names of the items of each company.</li>
		<li><strong>Equivalent items</strong> - table allowing the user to make a correspondence between the items IDs from both companies.</li>
		</ul>
		<h2>2.5. Integration Setup View</h2>
		<ul>
		<li><strong>Company Information</strong> - allows the user to stand up a new instance of the platform by providing the name, tenant code, client ID and client secret of the companies, as well as their desired credentials for authentication.</li>
		</ul>
		<p>&nbsp;</p>
		</div>
	)
}