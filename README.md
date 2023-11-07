# fundo-seguro-dev

Parte de Autenticação -> auth_api 
    Banco de Dados
        docker 
            banco: postgresql 
            database: auth_api
            host: localhost
            port: 
            user: 
            password: 
        table
            user
                - nome: str
                - data_nascimento: date
                - data_registro: date
                - cnpj/cpf: str
                - endereco: str
                - email: str
                - password: str

    Framework Desenvolvimento
        node.js
    
    Bibliotecas Necessárias
        Dependencias:
            cors
            jsonwebtoken
    
        DevDependencias:
            nodemon

Parte de Debitos -> debts_api
    Banco de Dados
        docker
            banco: tutum/mongodb
            database: debts_api
            host: localhost
            port
            user: 
            password: 
        
        table
            debitos
                - nome: str
                - valor: double
                - data_entrada: date [DATA ATUAL DA ENTRADA]
                - data_vencimento: date
                - parcelas: bool
                - quantidade_parcelas: int
                - status: str[A VENCER, VENCIDO, PAGO]
                - tipo_pagamento: [DINHEIRO, CARTAO, BOLETO, CHEQUE]
                - planejado: bool
                - categoria: str

    Framework Desenvolvimento
        node.js
    
    Bibliotecas
        Dependencias:
            
    Regras de Negocio
        A parte de débitos do projeto, será responsável por toda a manipulação das contas, 
        sendo elas:
        - Inclusão de Débitos (Create) 
        - Consulta de Débitos (Read)
        - Alteração de Débitos (Update)
            • Pagamento 
            • Agendamento
        - Exclusão de Débitos (Delete) 
        - Relatorios 

Parte de Receitas -> credits_api
    Banco de Dados
        docker
            banco: tutum/mongodb
            database: credits_api
            host: localhost
            port
            user: 
            password: 
        
        table
            creditos
                descricao: str
                valor: double
                tipo_credito: str[SEMANAL, MENSAL, INCOMUM]
                data_entrada: date
                metodo_pagamento: str[DINHEIRO, CHEQUE, BOLETO]

    Framework Desenvolvimento
        node.js
        
    Bibliotecas
        Dependencias:
            cors
        
        DevDependencias:
            nodemon
            
    Regras de Negocio
        A parte de créditos do projeto, será responsável pela manipulação das entradas,
        sendo elas:
        - Inclusão de Créditos (Create)
        - Consulta de Créditos (Read)
        - Alteração de Cébitos (Update)
        - Exclusão de Crédito (Delete)
        - Relatorio

Parte de Contas -> accounts_api
    Banco de Dados
        docker 
            banco: postgresql
            database: accounts_api
            host: localhost
            port: 
            user: 
            password: 
        table
            accounts
                nome_banco: str
                codigo_banco: int
                cpf_cadastrado: str
                endereco_cadastrado: str
                agencia: str
                conta: str               

    Framework Desenvolvimento
        java spring boot

    Bibliotecas
        Dependencias:
            
        DevDependencias:
            
    Regras de Negocio
        As regras de negocios e usabilidades para as contas, será realizada da seguinte forma:
        - O cliente poderá solicitar dados da sua conta bancaria atual, para recuperar as seguintes informações:
            - Saldo da Conta
            - Limite de Crédito Disponível
        - Para isso, o mesmo poderá preencher seu dados e o sistema fará uma requisição através de uma API para 
        buscar as informações e aguardar o retorno.


Parte de Menssageria -> messages_api
    Docker
        image: rabbitmq
        host:
        port:
        user: 
        password: 
