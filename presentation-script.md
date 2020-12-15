# Presentation
## Launch project

  * Show .env file on Backend
  * Run `docker-compose down` and `docker-compose up --build`

## Login
Test credentials: { username: "sinf", password: "intercompany" }

## Associations
Go to Data and make the following associations:

  * (company 1 ID, company 2 ID)
  * GARRAFA-33, GARRAFA-PLASTICO-33
  * GARRAFA-50, GARRAFA-50-VIDRO
  * RENDA, RENDA

## Big BPMN

You can see the Logs page on the frontend or the backend command line output throughout the following
steps to see progress.

  * Go to KSede, Compras > Encomendas > Criar, create buy order with x GARRAFA-33 and y GARRAFA-50
  * See on BottleFlip, Vendas > Encomendas the newly created order
  * Go to BottleFlip, Inventário > Expedição > Gerar Doc. de Transporte, and create Delivery Note
  * See on KSede, Inventário > Receção de Mercadoria > Receções de Mercadoria, new Goods Receipt
  * Go to BottleFlip, Vendas > Processar em Lote > Gerar Fatura, and generate invoice
  * See on KSede, Compras > Faturas and see generated invoice
  * Go to KSede, Contas Correntes > Pagamentos > Criar, and create payment note
  * Go to BottleFlip, Contas Correntes > Recibos, and see generated payment receipt

## Process Creation

 * Go to Process section
 * Add process
 * Enter process details; add steps
