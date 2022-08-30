## Título
<h1 align="center"> Board - Tarefas do dia cada vez mais fáceis de serem realizadas. </h1>


## Índice 

* [Título](#Título)
* [Índice](#índice)
* [Descrição do Projeto](#descrição-do-projeto)
* [Status do Projeto](#status-do-Projeto)
* [Funcionalidades e Demonstração da Aplicação](#funcionalidades-e-demonstração-da-aplicação)
* [Estrutura GitHub](#estrutura-github)
* [Acesso ao Projeto](#acesso-ao-projeto)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Conclusão](#conclusão)

## Descricao do Projeto
Esse é um projeto onde eu criei um to do list, onde você pode Criar, Listar, Alterar e excluir sua tarefas do dia. Porém apenas pessoas que apoiaram/doaram para o projeto vão ter mais opções bônus como Alterar e acessar a página da tarefa.

![8ee1d7c722475aef6a02b63bf2cd322f](https://user-images.githubusercontent.com/101679780/187558894-c53988ec-c785-40f8-8c64-39af06008df3.png)



## Status do Projeto
<h4 align="center"> 
    ✔️Projeto Concluído v1.0 ✔️
</h4>

## :hammer: Funcionalidades do projeto e Demonstração da Aplicação

- **`Funcionalidade 1`: Autênticação de contas com o Github.**
- **`Funcionalidade 2`: Adicionar, alterar, excluir e Listar suas tarefas.**
- **`Funcionalidade 3`: Doação via Paypal**
- **`Funcionalidade 3.1`: Funcionalidades extras para quem fez uma doação e se tornou Vip.**

Resumidamente essas são as funcionalidades, mas para você realmente ter uma experiência mais elegante, por favor, visite meu projeto aqui, ele está online👀

https://board-app-todo.herokuapp.com/

Não esqueça de deixar sua doação por lá para ter acesso a mais funcionalidades😎
	
	
## 🌝 Estrutura Github
**A estrutura do projeto no GitHub funciona básicamente assim:
	<ul>
		<li>1 - Nesse projeto deixei apenas a branch Main.</li>
		<li>2 - Quando eu dou push para o github através da branch MAIN, acontece um GATILHO no HEROKU, onde ele faz deploy da aplicação automaticamente a partir da branch main..</li>
	</ul>
		Obs: Ou seja, consigo fazer deploy da aplicação de qualquer lugar :moon:**
	

## 📁 Acesso ao projeto

**Você pode acessar o código fonte do projeto clicando aqui <a>https://github.com/GabriellDev0/projeto-board</a> ou baixa-lo <a>https://github.com/GabriellDev0/projeto-board/archive/refs/heads/main.zip</a>**

## 🛠️ Abrir e rodar o projeto

**Após baixar o projeto, você pode abrir com o Visual Studio Code. Para isso, na tela de launcher clique em:**
    <ul>
        <li>Abrir projeto existente ( ou algum similar )</li>
        <li>Procure o local onde o projeto está e o selecione ( Caso o projeto seja baixado via zip, é necessário extraí-lo antes de procurá-lo )</li>
        <li>Por fim clique OK</li>
        <li>Abra o terminal em "Terminal" -> "New Terminal" e execute o comando **npm install**</li>
        <li>Configure as variáveis de Ambiente criando um arquivo .env na pasta principal do projeto.**</li>
	<h4>Configurações das Variáveis de ambiente do seu projeto no Firebase:</h4>
        <li>GITHUB_CLIENT_ID=""</li>
        <li>GITHUB_CLIENT_SECRET=""</li>
        <li>NEXTAUTH_URL="http://localhost:{suaPorta}/"</li>
	<li>Inicie o servidor local com: **npm run dev**</li>
    </ul>
    
## 👨‍💻 Tecnologias Utilizadas
**Tecnologias nas quais usei:**
   	<ul>
		<li>Next JS ( HTML, SCSS, JS )</li>
    <li>Typescript</li>
		<li>Firebase: FireStore</li>
	</ul>

## 📚 Bibliotecas Utilizadas
**Bibliotecas nas quais usei:**
	<ul>
		<li> npm install @paypal/react-paypal-js </li>
		<a>https://www.npmjs.com/package/@paypal/react-paypal-js/</a>
	</ul>
	<ul>
		<li> npm date-fns </li>
		<a>https://www.npmjs.com/package/date-fns</a>
	</ul>
	<ul>
		<li> npm install firebase </li>
		<a>https://firebase.google.com/?hl=pt</a>
	</ul>
	<ul>
		<li>npm next-auth</li>
		<a>https://next-auth.js.org/</a>
	</ul>

## ㊗️ Conclusão
   **Esse projeto foi bastante simples, a ideia mesmo era conseguir usar o NextAuth em conjunto com alguma aplicação de pagamentos, para conseguir criar funcionalidades exclusivar para quem se tornou apoiador/vip da aplicação, e aproveitei para colocar meu Typescript em prática nesse projeto, aprendi bastante coisa, quebrei bastante cabeça nas documentações, apesar do projeto ser simples. Vejo vocês nos próximos projetos 😁**
